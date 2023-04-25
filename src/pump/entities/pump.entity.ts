import {
    Collection,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core'
import { IsNotEmpty } from 'class-validator'
import Payment from 'src/payment/entities/payment.entity'
import Station from 'src/station/entities/station.entity'
import { v4 as uuid } from 'uuid'
import { CreatePumpDto } from '../dto/create-pump.dto'
import { ApiProperty } from '@nestjs/swagger'
import User from 'src/user/entities/user.entity'

@Entity()
class Pump {
    constructor(createPumpDto: CreatePumpDto) {
        this.number = createPumpDto.number
        this.gas_price = createPumpDto.gas_price
        this.diesel_price = createPumpDto.diesel_price
        this.can_pay = createPumpDto.can_pay
        this.station = createPumpDto.station
        this.created_by = createPumpDto.created_by
    }
    @PrimaryKey({
        length: 64,
    })
    id: string = uuid()

    @ApiProperty({
        type: "number",
        description: "The pump number.",
    })
    @Property()
    @IsNotEmpty()
    number!: number

    @ApiProperty({
        type: "number",
        description: "The price of gas at the station."
    })
    @Property()
    @IsNotEmpty()
    gas_price!: number

    @ApiProperty({
        type: "number",
        description: "The price of diese at the station."
    })
    @Property()
    @IsNotEmpty()
    diesel_price!: number

    @ApiProperty({
        type: "boolean",
        description: "Determines if the user can pay at that pump or not."
    })
    @Property()
    @IsNotEmpty()
    can_pay!: boolean
    
    @ApiProperty({
        type: "Station",
        description: "The station that owns the pump."
    })
    @ManyToOne({
        entity: () => Station,
        inversedBy: (station) => station.pumps,
    })
    station!: Station

    @ApiProperty({
        type: "User",
        description: "The user who created the pump."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.pumps,
    })
    created_by!: User

    @ApiProperty({
        type: "Collection<Payment>",
        description: "The payment types a pump accepts."
    })
    @ManyToMany({
        entity: () => Payment,
        inversedBy: (payment) => payment.pumps,
    })
    payment_types = new Collection<Payment>(this)
}

export default Pump
