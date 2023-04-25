import { assign, Collection, LoadCountOptions, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Payment from 'src/payment/entities/payment.entity'
import Station from 'src/station/entities/station.entity'
import { CreatePumpDto } from './dto/create-pump.dto'
import { UpdatePumpDto } from './dto/update-pump.dto'
import Pump from './entities/pump.entity'
import User from 'src/user/entities/user.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("pump")
export class PumpService {
    constructor(readonly em: EntityManager) { }

    /**
     * Creates a new pump
     * @param createPumpDto A create object for a pump
     * @returns A new pump
     */
    @ApiOperation({ summary: "This endpoint creates a new pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createPumpDto: CreatePumpDto): Promise<Loaded<Pump>> {
        const pump = new Pump(createPumpDto)
        if (createPumpDto.payment_types) {
            for (let payment_type of createPumpDto.payment_types) {
                pump.payment_types.add(this.em.getReference(Payment, payment_type))
            }
        }

        await this.em.persistAndFlush(pump)
        return pump
    }

    /**
     * Fetches all pumps
     * @returns All pumps
     */
    @ApiOperation({ summary: "This endpoint retrieves all pumps." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll(): Promise<Loaded<Array<Pump>>> {
        return await this.em.find(Pump, {})
    }

    /**
     * Fetches a single pump
     * @param id The id of a pump
     * @returns A single pump
     */
    @ApiOperation({ summary: "This endpoint retrieves a single pump by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: string): Promise<Loaded<Pump>> {
        const pump = await this.em.findOne(Pump, { id })
        if (!pump) {
            throw new NotFoundException()
        }
        return pump
    }

    /**
     * Performs complete replacement on a pump
     * @param id The id of a pump
     * @param updatePumpDto The update object of a pump
     * @returns An updated pump
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a pump's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: string, updatePumpDto: UpdatePumpDto): Promise<Loaded<Pump>> {
        const pump = await this.findOne(id)
        if (!pump) {
            throw new NotFoundException();
        }
        const { number, gas_price, diesel_price, can_pay, station, created_by, payment_types } = updatePumpDto
        if (!number || !gas_price || !diesel_price || !can_pay || !created_by || !station || !payment_types) {
            throw new BadRequestException();
        }
        pump.number = number
        pump.gas_price = gas_price
        pump.diesel_price = diesel_price
        pump.can_pay = can_pay
        pump.station = station
        pump.created_by = created_by
        // pump.payment_types = payment_types
        await this.em.persistAndFlush(pump);
        return pump
    }

    /**
     * Performs partial replacement on a pump
     * @param id The id of a pump
     * @param updatePumpDto The update object of a pump
     * @returns An updated pump
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a pump's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: string, updatePumpDto: UpdatePumpDto): Promise<Loaded<Pump>> {
        const pump = await this.findOne(id)
        const { number, gas_price, diesel_price, can_pay, station, created_by, payment_types } = updatePumpDto
        if (!number && !gas_price && !diesel_price && !can_pay && !station && !created_by && !payment_types) {
            throw new BadRequestException()
        }
        if (number) {
            pump.number = number
        }
        if (gas_price) {
            pump.gas_price = gas_price
        }
        if (diesel_price) {
            pump.diesel_price = diesel_price
        }
        if (created_by) {
            pump.created_by = created_by
        }
        if (can_pay) {
            pump.can_pay = can_pay
        }
        if (station) {
            pump.station = station
        }
        if (payment_types) {
            // this.em.assign(pump, updatePumpDto);
            // pump.payment_types = payment_types
        }
        await this.em.persistAndFlush(pump);
        return pump
    }



    /**
     * Deletes a pump
     * @param id The id of a pump
     * @returns The deleted pump
     */
    @ApiOperation({ summary: "This endpoint deletes a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: string): Promise<Loaded<Pump>> {
        const pump = await this.findOne(id)
        await this.em.removeAndFlush(pump)
        return pump
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the station a pump is at
     * @param id The id of a pump
     * @returns The station a pump is currently at
     */
    @ApiOperation({ summary: "This endpoint gets the station of a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getStation(id: string): Promise<Loaded<Station>> {
        const pump = await this.em.findOne(Pump, { id }, { populate: ['station'] })
        if (!pump) {
            throw new NotFoundException()
        }
        return pump.station
    }

    /**
     * Fetches the creator of a pump
     * @param id The id of a pump
     * @returns The station a pump is currently at
     */
    @ApiOperation({ summary: "This endpoint gets the creator of a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getCreator(id: string): Promise<Loaded<User>> {
        const pump = await this.em.findOne(Pump, { id }, { populate: ['created_by'] })
        if (!pump) {
            throw new NotFoundException()
        }
        return pump.created_by;
    }

    /**
     * Fetches the payment types accepted by a pump
     * @param id The id of a pump
     * @returns The payment types accepted by a pump
     */
    @ApiOperation({ summary: "This endpoint gets the payment types on a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getPaymentTypes(id: string): Promise<Loaded<Collection<Payment>>> {
        const pump = await this.em.findOne(Pump, { id }, { populate: ['payment_types'] })
        if (!pump) {
            throw new NotFoundException()
        }
        return pump.payment_types
    }
}
