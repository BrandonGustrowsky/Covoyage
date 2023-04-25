import { Collection, Loaded } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/mysql'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import Pump from 'src/pump/entities/pump.entity'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import Payment from './entities/payment.entity'
import User from 'src/user/entities/user.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@ApiTags("payment")
export class PaymentService {
    constructor(readonly em: EntityManager) { }

    /**
     * Creates a new payment
     * @param createPaymentDto The create object for a payment
     * @returns A new payment
     */
    @ApiOperation({ summary: "This endpoint creates a new payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(createPaymentDto: CreatePaymentDto): Promise<Loaded<Payment>> {
        const payment = new Payment(createPaymentDto)
        payment.created_by = this.em.getReference(User, createPaymentDto.created_by)
        if (createPaymentDto.pumps) {
            for (let pump of createPaymentDto.pumps) {
                payment.pumps.add(this.em.getReference(Pump, pump))
            }
        }

        await this.em.persistAndFlush(payment)
        return payment
    }

    /**
     * Fetches all payment types
     * @returns All payment types
     */
    @ApiOperation({ summary: "This endpoint retrieves all payment types." })
    @ApiResponse({ status: 200, description: "Success" })
    async findAll(): Promise<Loaded<Array<Payment>>> {
        return await this.em.find(Payment, {})
    }

    /**
     * Fetches a single payment type
     * @param id The id of a payment type
     * @returns A payment type
     */
    @ApiOperation({ summary: "This endpoint retrieves a single payemnt type by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    async findOne(id: number): Promise<Loaded<Payment>> {
        const payment = await this.em.findOne(Payment, { id })
        if (!payment) {
            throw new NotFoundException()
        }
        return payment
    }

    /**
     * Performs complete replacement on a payment
     * @param id The id of a payment type
     * @param updatePaymentDto The update object of a payment type
     * @returns The updated payment type
     */
    @ApiOperation({ summary: "This endpoint performs complete replacement on a payment type's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async put(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Loaded<Payment>> {
        const payment = await this.findOne(id)
        const { type, pumps } = updatePaymentDto
        if (!type || !pumps) {
            throw new BadRequestException()
        }
        payment.type = type
        for (let pump of pumps) {
            payment.pumps.add(this.em.getReference(Pump, pump))
        }
        await this.em.persistAndFlush(payment)
        return payment
    }

    /**
     * Performs partial replacement on a payment
     * @param id The id of a payment type
     * @param updatePaymentDto The update object of a payment type
     * @returns An updated payment
     */
    @ApiOperation({ summary: "This endpoint performs partial replacement on a payment type's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async patch(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Loaded<Payment>> {
        const payment = await this.findOne(id)
        const { type, pumps } = updatePaymentDto
        if (!type && !pumps) {
            throw new BadRequestException()
        }
        if (type) {
            payment.type = type
        }
        if (pumps) {
            console.log("Updating pumps");
            for (let pump of pumps) {
                payment.pumps.add(this.em.getReference(Pump, pump))
            }
        }
        await this.em.persistAndFlush(payment);
        return payment
    }

    /**
     * Deletes a payment
     * @param id The id of a payment
     * @returns The deleted payment
     */
    @ApiOperation({ summary: "This endpoint deletes a payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async remove(id: number): Promise<Loaded<Payment>> {
        const payment = await this.findOne(id)
        await this.em.removeAndFlush(payment)
        return payment
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches pumps using this payment method
     * @param id The id of a payment method
     * @returns All pumps using this payment method
     */
    @ApiOperation({ summary: "This endpoint gets the pumps that support the payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getPumps(id: number): Promise<Loaded<Collection<Pump>>> {
        const payment = await this.em.findOne(Payment, { id }, { populate: ['pumps'] })
        if (!payment) {
            throw new NotFoundException()
        }
        return payment.pumps
    }

    /**
     * Fetches pumps using this payment method
     * @param id The id of a payment method
     * @returns All pumps using this payment method
     */
    @ApiOperation({ summary: "This endpoint gets the creator of the payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    async getCreator(id: number): Promise<Loaded<User>> {
        const payment = await this.em.findOne(Payment, { id }, { populate: ['created_by'] })
        if (!payment) {
            throw new NotFoundException()
        }
        return payment.created_by
    }
}
