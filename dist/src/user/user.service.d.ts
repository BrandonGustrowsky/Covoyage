import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Forum from 'src/forum/entities/forum.entity';
import Payment from 'src/payment/entities/payment.entity';
import Rating from 'src/rating/entities/rating.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import Comment from 'src/comment/entities/comment.entity';
import Station from 'src/station/entities/station.entity';
import Pump from 'src/pump/entities/pump.entity';
export declare class UserService {
    private readonly em;
    constructor(em: EntityManager);
    create(createUserDto: CreateUserDto): Promise<Loaded<User>>;
    findAll(): Promise<Loaded<Array<User>>>;
    findOne(id: string): Promise<Loaded<User>>;
    put(id: string, updateUserDto: UpdateUserDto): Promise<Loaded<User>>;
    patch(id: string, updateUserDto: UpdateUserDto): Promise<Loaded<User>>;
    remove(id: string): Promise<Loaded<User>>;
    getRatings(id: string): Promise<Loaded<Collection<Rating>>>;
    getStations(id: string): Promise<Loaded<Collection<Station>>>;
    getPumps(id: string): Promise<Loaded<Collection<Pump>>>;
    getComments(id: string): Promise<Loaded<Collection<Comment>>>;
    getForums(id: string): Promise<Loaded<Collection<Forum>>>;
    getPaymentTypes(id: string): Promise<Loaded<Collection<Payment>>>;
}
