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
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('payment')
@ApiTags("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    /**
     * Creates a new payment
     * @param createPaymentDto The create object for a payment
     * @returns A new payment
     */
    @Post()
    @ApiOperation({summary: "This endpoint creates a new payment type."})
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto)
    }

    /**
     * Fetches all payment types
     * @returns All payment types
     */
    @Get()
    @ApiOperation({ summary: "This endpoint retrieves all payment types."})
    @ApiResponse({ status: 200, description: "Success" })
    findAll() {
        return this.paymentService.findAll()
    }

    /**
     * Fetches a single payment type
     * @param id The id of a payment type
     * @returns A payment type
     */
    @Get(':id')
    @ApiOperation({ summary: "This endpoint retrieves a single payemnt type by its id." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(+id)
    }

    /**
     * Performs complete replacement on a payment
     * @param id The id of a payment type
     * @param updatePaymentDto The update object of a payment type
     * @returns The updated payment type
     */
    @Put(':id')
    @ApiOperation({ summary: "This endpoint performs complete replacement on a payment type's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 400, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    put(
        @Param('id') id: string,
        @Body() UpdatePaymentDto: UpdatePaymentDto
    ) {
        return this.paymentService.put(+id, UpdatePaymentDto)
    }


    /**
     * Performs partial replacement on a payment
     * @param id The id of a payment type
     * @param updatePaymentDto The update object of a payment type
     * @returns An updated payment
     */
    @Patch(':id')
    @ApiOperation({ summary: "This endpoint performs partial replacement on a payment type's properties." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    patch(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return this.paymentService.patch(+id, updatePaymentDto)
    }

    /**
     * Deletes a payment
     * @param id The id of a payment
     * @returns The deleted payment
     */
    @Delete(':id')
    @ApiOperation({ summary: "This endpoint deletes a payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    remove(@Param('id') id: string) {
        return this.paymentService.remove(+id)
    }

    // ---------- BUSINESS LOGIC (NON-CRUD) ----------

    /**
     * Fetches pumps using this payment method
     * @param id The id of a payment method
     * @returns All pumps using this payment method
     */
    @Get('/pumps/:id')
    @ApiOperation({ summary: "This endpoint gets the pumps that support the payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getPumps(@Param('id') id: string) {
        return this.paymentService.getPumps(+id)
    }

    /**
     * Fetches the creator who made this payment method
     * @param id The id of a payment method
     * @returns The creator of the payment method
     */
    @Get('creator/:id')
    @ApiOperation({ summary: "This endpoint gets the creator of the payment type." })
    @ApiResponse({ status: 200, description: "Success" })
    @ApiResponse({ status: 404, description: "Not Found" })
    getCreator(@Param('id') id: string) {
        return this.paymentService.getCreator(+id)
    }
}
