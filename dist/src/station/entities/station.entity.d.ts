import { Collection } from '@mikro-orm/core';
import Rating from 'src/rating/entities/rating.entity';
import Forum from 'src/forum/entities/forum.entity';
import Pump from 'src/pump/entities/pump.entity';
import { CreateStationDto } from '../dto/create-station.dto';
import User from 'src/user/entities/user.entity';
declare class Station {
    constructor(createStationDto: CreateStationDto);
    id: string;
    name: string;
    location: string;
    restroom_count: number;
    created_by: User;
    ratings: Collection<Rating, object>;
    forums: Collection<Forum, object>;
    pumps: Collection<Pump, object>;
}
export default Station;
