import { Collection } from '@mikro-orm/core';
import Comment from 'src/comment/entities/comment.entity';
import Forum from 'src/forum/entities/forum.entity';
import Rating from 'src/rating/entities/rating.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import Station from 'src/station/entities/station.entity';
import Pump from 'src/pump/entities/pump.entity';
import Payment from 'src/payment/entities/payment.entity';
declare class User {
    constructor(createUserDto: CreateUserDto);
    readonly id: string;
    readonly api_key: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    stations: Collection<Station, object>;
    pumps: Collection<Pump, object>;
    ratings: Collection<Rating, object>;
    comments: Collection<Comment, object>;
    forums: Collection<Forum, object>;
    payment_types: Collection<Payment, object>;
}
export default User;
