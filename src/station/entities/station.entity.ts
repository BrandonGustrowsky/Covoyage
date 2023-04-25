import {
    Collection,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core'
import { v4 as uuid } from 'uuid'
import { IsNotEmpty } from 'class-validator'
import Rating from 'src/rating/entities/rating.entity'
import Forum from 'src/forum/entities/forum.entity'
import Pump from 'src/pump/entities/pump.entity'
import { CreateStationDto } from '../dto/create-station.dto'
import User from 'src/user/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
@Unique({
    properties: ['location'],
})
class Station {
    constructor(createStationDto: CreateStationDto) {
        this.name = createStationDto.name
        this.location = createStationDto.location
        this.restroom_count = createStationDto.restroom_count
    }
    
    @ApiProperty({
        type: "string",
        description: "The id of a station."
    })
    @PrimaryKey({
        length: 64,
    })
    id: string = uuid()

    @ApiProperty({
        type: "string",
        description: "The name of a station."
    })
    @Property({
        length: 256,
    })
    @IsNotEmpty()
    name!: string

    @ApiProperty({
        type: "string",
        description:"The location of a station."
    })
    @Property({
        length: 256,
    })
    @IsNotEmpty()
    location!: string

    @ApiProperty({
        type: "number",
        description: "The number of restrooms in a station."
    })
    @Property()
    @IsNotEmpty()
    restroom_count!: number

    @ApiProperty({
        type: "User",
        description: "The user who created the station."
    })
    @ManyToOne({
        entity: () => User,
        inversedBy: (user) => user.stations,
    })
    created_by!: User

    @ApiProperty({
        type: "Rating",
        description: "The ratings given on a station."
    })
    @OneToMany({
        entity: () => Rating,
        mappedBy: (rating) => rating.station,
    })
    ratings = new Collection<Rating>(this)

    @ApiProperty({
        type: "Forum",
        description: "The forums under a station."
    })
    @OneToMany({
        entity: () => Forum,
        mappedBy: (forum) => forum.station,
    })
    forums = new Collection<Forum>(this)

    @ApiProperty({
        type: "Pump",
        description: "The pumps at a station."
    })
    @OneToMany({
        entity: () => Pump,
        mappedBy: (pump) => pump.station,
    })
    pumps = new Collection<Pump>(this)
}

export default Station
