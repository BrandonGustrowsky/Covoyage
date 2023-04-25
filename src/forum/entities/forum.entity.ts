import {
    Collection,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import Comment from 'src/comment/entities/comment.entity'
import Station from 'src/station/entities/station.entity'
import User from 'src/user/entities/user.entity'
import { v4 as uuid } from 'uuid'
import { CreateForumDto } from '../dto/create-forum.dto'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
class Forum {
    constructor(createForumDto: CreateForumDto) {
        this.title = createForumDto.title
        this.description = createForumDto.description
    }

    @ApiProperty({
        type: "string",
        description: "The id of a forum."
    })
    @PrimaryKey()
    id: string = uuid()

    @ApiProperty({
        type: "string",
        description: "The title of a forum."
    })
    @Property({
        length: 256,
    })
    @IsNotEmpty()
    title!: string

    @ApiProperty({
        type: "string",
        description: "The description of a forum."
    })
    @Property({
        length: 512,
    })
    description!: string

    @ApiProperty({
        type: "Collection<Comment>",
        description: "The comments made on a forum."
    })
    @OneToMany({
        entity: () => Comment,
        mappedBy: (comment) => comment.forum,
    })
    comments = new Collection<Comment>(this)

    @ApiProperty({
        type: "Station",
        description: "The station a forum was made on."
    })
    @ManyToOne({
        entity: () => Station,
        inversedBy: (station) => station.forums,
    })
    station!: Station

    @ApiProperty({
        type: "User",
        description: "The user who created the forum."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.forums,
    })
    created_by!: User
}

export default Forum
