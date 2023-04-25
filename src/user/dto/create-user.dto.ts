import { Collection } from "@mikro-orm/core"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: "The user's username.",
        example: "SparkSpeed",
        required: true,
    })
    @IsString()
    username: string

    @ApiProperty({
        description: "The user's email.",
        example: "bgustrowsky@southern.edu",
        required: true,
    })
    @IsString()
    email: string

    @ApiProperty({
        description: "The user's phone number.",
        example: "419-346-9901",
        required: true,
    })
    @IsString()
    phone: string

    @ApiProperty({
        description: "The user's password.",
        example: "YifJ3vbq!",
        required: true,
    })
    @IsString()
    password: string

    @ApiProperty({
        description: "The stations created by a user",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    stations: Array<string>

    @ApiProperty({
        description: "The pumps created by a user",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    pumps: Array<string>

    @ApiProperty({
        description: "The ratings a user has created.",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    ratings: Array<number>

    @ApiProperty({
        description: "The comments a user has created.",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    comments: Array<number>

    @ApiProperty({
        description: "The forums a user has created.",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    forums: Array<string>

    @ApiProperty({
        description: "The payment types a user has created",
        example: "[]",
        required: true,
    })
    @IsArray()
    @IsOptional()
    payment_types: Array<number>
}
