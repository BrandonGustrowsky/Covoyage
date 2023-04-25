import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateRatingDto {

    @ApiProperty({
        description: "The value of the rating (0 - 5 inclusive).",
        example: 4.5,
        required: true,
    })
    @IsNumber()
    rating: number

    @ApiProperty({
        description: "The user who created the rating.",
        example: "Aab3J3Hfk6j921vx09z1",
        required: true,
    })
    @IsString()
    created_by: string

    @ApiProperty({
        description: "The station a rating was placed on.",
        example: "Aab3J5aHj4jadlKV93jA",
        required: false,
    })
    @IsString()
    @IsOptional()
    station: string

    @ApiProperty({
        description: "The comment a rating was placed on.",
        example: "J4kjDihvauohe58u2iAHJ22",
        required: false,
    })
    @IsNumber()
    @IsOptional()
    comment: number
}
