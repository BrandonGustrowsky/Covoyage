import { Collection } from "@mikro-orm/core"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, } from "class-validator"
import Payment from "src/payment/entities/payment.entity"
import Station from "src/station/entities/station.entity"
import User from "src/user/entities/user.entity"

export class CreatePumpDto {
    @IsNumber()
    @ApiProperty({
        description: "The pump's number.",
        example: 1,
        required: true
    })
    number: number
    
    @IsNumber()
    @ApiProperty({
        description: "The gas price at the pump.",
        example: 3.24,
        required: true
    })
    gas_price: number

    @IsNumber()
    @ApiProperty({
        description: "The diesel price at the pump.",
        example: 4.24,
        required: true
    })
    diesel_price: number

    @IsBoolean()
    @ApiProperty({
        description: "Says if the user can pay at that pump.",
        example: true,
        required: true
    })
    can_pay: boolean

    @IsString()
    @ApiProperty({
        description: "The station the pump is at.",
        example: "as12j-Aj1lkj-Bh8A2912-jLzkjB",
        required: true
    })
    station: Station

    @IsString()
    @ApiProperty({
        description: "The user who created the pump.",
        example: "as12j-Aj1lkj-Bh8A2912-jLzkjB",
        required: true
    })
    created_by: User
    
    @IsArray()
    @ApiProperty({
        description: "The payment types accepted at the pump",
        example: ["as12j-Aj1lkj-Bh8A2912-jLzkjB", "as12j-Aj1lkj-Bh8A2912-jLzkjB"],
        // required: true,
        // type: () => Array<Payment>
    })
    @IsOptional()
    payment_types: Array<number>
}
