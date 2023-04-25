import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import Comment from 'src/comment/entities/comment.entity'
import Forum from 'src/forum/entities/forum.entity'
import Rating from 'src/rating/entities/rating.entity'
import { v4 as uuid } from 'uuid'
import { CreateUserDto } from '../dto/create-user.dto'
import * as crypto from "crypto";
import Station from 'src/station/entities/station.entity'
import Pump from 'src/pump/entities/pump.entity'
import Payment from 'src/payment/entities/payment.entity'
import { ApiProperty } from '@nestjs/swagger'


@Entity()
class User {
    constructor(createUserDto: CreateUserDto) {
        this.username = createUserDto.username
        this.email = createUserDto.email
        this.phone = createUserDto.phone
        this.password = createUserDto.password
        // this.ratings = createUserDto.ratings
        // this.comments = createUserDto.comments
        // this.forums = createUserDto.forums
        // this.stations = createUserDto.stations
        // this.payment_types = createUserDto.payment_types
        // this.pumps = createUserDto.pumps

    }
    @ApiProperty({description: "The user's id, which is readonly."})
    @PrimaryKey({
        length: 64,
    })
    readonly id: string = uuid();
    
    @ApiProperty({description: "The user's API key, which is readonly."})
    @Property()
    readonly api_key: string = crypto.randomBytes(16).toString("hex"); 

    @ApiProperty({description: "The user's username."})
    @Property({
        length: 32,
    })
    @IsNotEmpty()
    username!: string

    @ApiProperty({description: "The user's email."})
    @Property({
        length: 256,
    })
    @IsNotEmpty()
    email!: string

    @ApiProperty({description: "The user's phone #."})
    @Property({
        length: 16,
    })
    @IsNotEmpty()
    phone!: string

    @ApiProperty({description: "The user's password."})
    @Property({
        length: 256,
    })
    @IsNotEmpty()
    password!: string

    @ApiProperty({description: "The stations a user has created."})
    @OneToMany({
        entity: () => Station,
        mappedBy: (station) => station.created_by,
    })
    stations = new Collection<Station>(this);

    @ApiProperty({description: "The pumps a user has created."})
    @OneToMany({
        entity: () => Pump,
        mappedBy: (pump) => pump.created_by
    })
    pumps = new Collection<Pump>(this)

    @ApiProperty({description: "The ratings a user has created."})
    @OneToMany({
        entity: () => Rating,
        mappedBy: (rating) => rating.created_by,
    })
    ratings = new Collection<Rating>(this)

    @ApiProperty({description: "The comments a user has created."})
    @OneToMany({
        entity: () => Comment,
        mappedBy: (comment) => comment.created_by,
    })
    comments = new Collection<Comment>(this)

    @ApiProperty({description: "The forums a user has created."})
    @OneToMany({
        entity: () => Forum,
        mappedBy: (forum) => forum.created_by,
    })
    forums = new Collection<Forum>(this)

    @ApiProperty({description: "The payment types a user has created."})
    @OneToMany({
        entity: () => Payment,
        mappedBy: (payment) => payment.created_by
    })
    payment_types = new Collection<Payment>(this)
}

export default User
