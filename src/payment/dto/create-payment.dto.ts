import { Collection } from "@mikro-orm/core"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString } from "class-validator"

export class CreatePaymentDto {
    @ApiProperty({
        description: "The type of the payment method.",
        example: "Mastercard",
        required: true
    })
    @IsString()
    type: string

    @ApiProperty({
        description: "The user who created the payment type.",
        example: "123i-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108",
        required: true
    })
    @IsString()
    created_by: string
    
    @ApiProperty({
        // type: () => Array<string>,
        description: "The pumps a payment type can be used on.",
        example: "[123i-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108, 9Bxz2a-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108]",
        required: true
    })
    @IsArray()
    @IsOptional()
    pumps: Array<string>
}
