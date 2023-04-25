import {
    Collection,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import Forum from 'src/forum/entities/forum.entity'
import Rating from 'src/rating/entities/rating.entity'
import User from 'src/user/entities/user.entity'
import { CreateCommentDto } from '../dto/create-comment.dto'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
class Comment {
    constructor(createCommentDto: CreateCommentDto) {
        this.contents = createCommentDto.contents
    }

    @ApiProperty({
        type: "number",
        description: "The id of a comment."
    })
    @PrimaryKey({
        autoincrement: true,
    })
    id!: number

    @ApiProperty({
        type: "string",
        description: "The actual text of the comment."
    })
    @Property({
        length: 2048,
    })
    @IsNotEmpty()
    contents!: string

    @ApiProperty({
        type: "Collection<Rating>",
        description: "The ratings a comment has on itself."
    })
    @OneToMany({
        entity: () => Rating,
        mappedBy: (rating) => rating.comment,
    })
    ratings = new Collection<Rating>(this)

    @ApiProperty({
        type: "User",
        description: "The user who created the comment."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.comments,
    })
    @IsNotEmpty()
    created_by!: User

    @ApiProperty({
        type: "Forum",
        description: "The forum a comment was posted on."
    })
    @ManyToOne({
        entity: () => Forum,
        inversedBy: (forum) => forum.comments,
    })
    forum!: Forum

    @ApiProperty({
        type: "Collection<Comment>",
        description: "The children comments of the current comment."
    })
    @OneToMany({
        entity: () => Comment,
        mappedBy: comment => comment.parent
    })
    children = new Collection<Comment>(this);

    @ApiProperty({
        type: "Comment",
        description: "The parent comment of the current comment.",
        required: false,
    })
    @ManyToOne({
        entity: () => Comment,
        inversedBy: comment => comment.children,
        nullable: true,
        // columnType:
        
    })
    parent?: Comment
}

export default Comment
