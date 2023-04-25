import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCommentDto {
    @ApiProperty({
        description: "The text of a comment.",
        example: "There are many flags in many lands, there are flags of every hue.",
        required: true,
    })
    @IsString()
    contents: string

    @ApiProperty({
        description: "The forum a comment was posted on.",
        example: {},
        required: true,
        // type: () => Forum
    })
    @IsString()
    forum: string

    @ApiProperty({
        description: "The ratings a comment has.",
        example: [],
        required: true,
        // type: () => Collection<Rating>
    })
    @IsArray()
    @IsOptional()
    ratings: Array<number>
    
    @ApiProperty({
        description: "The user who created the comment.",
        example: {},
        required: true,
        // type: () => User,
    })
    @IsString()
    created_by: string

    @ApiProperty({
        description: "The children comments of the current comment.",
        example: [],
        required: true,
        // type: () => Collection<Comment>
    })
    @IsArray()
    @IsOptional()
    children: Array<number>

    @ApiProperty({
        description: "The parent comment of the current comment.",
        example: {},
        required: false,
        // type: () => Comment
    })
    @IsNumber()
    @IsOptional()
    parent!: number
}
