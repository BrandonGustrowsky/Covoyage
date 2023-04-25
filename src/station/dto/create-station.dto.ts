import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateStationDto {
    @ApiProperty({
        description: "The station's name.",
        example: "Marathon",
        required: true
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "The location of the station.",
        example: "308 Nerga Aurora Ln. Albequerque New Mexico, 87104",
        required: true,
    })
    @IsString()
    location: string

    @ApiProperty({
        description: "The number of restrooms in the station.",
        example: 2,
        required: true,
    })
    @IsNumber()
    restroom_count: number

    @ApiProperty({
        description: "The ratings the station has.",
        example: [],
        required: true,
    })
    @IsArray()
    @IsOptional()
    ratings: Array<number>

    @ApiProperty({
        description: "The user who created the station",
        example: {},
        required: true,
    })
    @IsString()
    created_by: string

    @ApiProperty({
        description: "The forums on the station.",
        example: [],
        required: true
    })
    @IsArray()
    @IsOptional()
    forums: Array<string>

    @ApiProperty({
        description: "The pumps a station has.",
        example: [],
        required: true
    })
    @IsArray()
    @IsOptional()
    pumps: Array<string>
}
