import {
    Collection,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import Pump from 'src/pump/entities/pump.entity'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { ApiProperty } from '@nestjs/swagger'
import User from 'src/user/entities/user.entity'

@Entity()
@Unique({
    properties: ['type'],
})
class Payment {
    constructor(createPaymentDto: CreatePaymentDto) {
        this.type = createPaymentDto.type
    }
    @ApiProperty({
        type: "number",
        description: "The id of a payment type."
    })
    @PrimaryKey({
        autoincrement: true,
    })
    id!: number

    @ApiProperty({
        type: "string",
        description: "The type of a payment type."
    })
    @Property()
    @IsNotEmpty()
    type!: string

    @ApiProperty({
        type: "Collection<Pump>",
        description: "The pumps a payment type can be used on."
    })
    @ManyToMany({
        entity: () => Pump,
        mappedBy: (pump) => pump.payment_types,
    })
    pumps = new Collection<Pump>(this);

    @ApiProperty({
        type: "User",
        description: "The user who created a payment type."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.payment_types
    })
    created_by!: User
}

export default Payment
