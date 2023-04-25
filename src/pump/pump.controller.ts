import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common'
import { PumpService } from './pump.service'
import { CreatePumpDto } from './dto/create-pump.dto'
import { UpdatePumpDto } from './dto/update-pump.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('pump')
@ApiTags("pump")
export class PumpController {
    constructor(private readonly pumpService: PumpService) { }

    /**
     * Creates a new pump
     * @param createPumpDto A create object for a pump
     * @returns A new pump
     */
    @Post()
    @ApiOperation({summary: "This endpoint creates a new pump."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createPumpDto: CreatePumpDto) {
        return this.pumpService.create(createPumpDto)
    }

    /**
     * Fetches all pumps
     * @returns All pumps
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all pumps."})
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.pumpService.findAll()
    }

    /**
     * Fetches a single pump
     * @param id The id of a pump
     * @returns A single pump
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single pump by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.pumpService.findOne(id)
    }

    /**
     * Performs complete replacement on a pump
     * @param id The id of a pump
     * @param updatePumpDto The update object of a pump
     * @returns An updated pump
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a pump's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(@Param('id') id: string, @Body() updatePumpDto: UpdatePumpDto) {
        return this.pumpService.put(id, updatePumpDto)
    }

    /**
     * Performs partial replacement on a pump
     * @param id The id of a pump
     * @param updatePumpDto The update object of a pump
     * @returns An updated pump
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a pump's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(@Param('id') id: string, @Body() updatePumpDto: UpdatePumpDto) {
        return this.pumpService.patch(id, updatePumpDto)
    }

    /**
     * Deletes a pump
     * @param id The id of a pump
     * @returns The deleted pump
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.pumpService.remove(id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches the station a pump is at
     * @param id The id of a pump
     * @returns The station a pump is currently at
     */
    @Get('station/:id')
    @ApiOperation({ summary: "This endpoint gets the station of a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getStation(@Param('id') id: string) {
        return this.pumpService.getStation(id)
    }

    /**
     * Fetches the creator of a pump
     * @param id The id of a pump
     * @returns The creator of a pump
     */
    @Get('creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getCreator(@Param('id') id: string) {
        return this.pumpService.getCreator(id)
    }

    /**
     * Fetches the payment types accepted by a pump
     * @param id The id of a pump
     * @returns The payment types accepted by a pump
     */
    @Get('/payment/:id')
    @ApiOperation({ summary: "This endpoint gets the payment types on a pump." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getPaymentTypes(@Param('id') id: string) {
        return this.pumpService.getPaymentTypes(id)
    }

}
