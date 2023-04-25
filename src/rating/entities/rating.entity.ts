import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import { create } from 'domain'
import Comment from 'src/comment/entities/comment.entity'
import Station from 'src/station/entities/station.entity'
import User from 'src/user/entities/user.entity'
import { CreateRatingDto } from '../dto/create-rating.dto'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
class Rating {
    constructor(createRatingDto: CreateRatingDto) {
        this.rating = createRatingDto.rating
    }

    @ApiProperty({
        type: "number",
        description: "The id of a rating."
    })
    @PrimaryKey({
        autoincrement: true,
    })
    id!: number

    @ApiProperty({
        type: "number",
        description: "The rating of a number."
    })
    @Property()
    @IsNotEmpty()
    rating!: number

    @ApiProperty({
        type: "User",
        description: "The user who created the rating."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.ratings,
    })
    @IsNotEmpty()
    created_by!: User

    @ApiProperty({
        type: "Station",
        description: "The station a rating was given to."
    })
    @ManyToOne({
        entity: () => Station,
        inversedBy: (station) => station.ratings,
    })
    station!: Station

    @ApiProperty({
        type: "Comment",
        description: "The comment a rating was given to."
    })
    @ManyToOne({
        entity: () => Comment,
        inversedBy: (comment) => comment.ratings,
    })
    comment!: Comment
}

export default Rating
