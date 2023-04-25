import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateForumDto {
    @ApiProperty({
        description: "The title of a forum.",
        example: "What's up with the bad smell?",
        required: true,
    })
    @IsString()
    title: string

    @ApiProperty({
        description: "The description of the forum.",
        example: `I am a frequent visitor of this station, and recently I've been smelling something awful
            every time I enter through the front door!`,
        required: false,
    })
    @IsString()
    description: string

    @ApiProperty({
        description: "The comments of a forum.",
        example: [],
        required: true
    })
    @IsArray()
    @IsOptional()
    comments: Array<number>

    @ApiProperty({
        description: "The station a forum was placed under.",
        example: "iwjRJI2jCijsijxb2Ubz1",
        required: true
    })
    @IsString()
    station: string

    @ApiProperty({
        description: "The user who created the forum.",
        example: "iwjRJI2jCijsijxb2Ubz1",
        required: true
    })
    @IsString()
    created_by: string
}
