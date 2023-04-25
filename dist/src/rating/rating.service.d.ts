import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Station from 'src/station/entities/station.entity';
import User from 'src/user/entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import Rating from './entities/rating.entity';
import Comment from 'src/comment/entities/comment.entity';
export declare class RatingService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createRatingDto: CreateRatingDto): Promise<Loaded<Rating>>;
    findAll(): Promise<Loaded<Array<Rating>>>;
    findOne(id: number): Promise<Loaded<Rating>>;
    put(id: number, updateRatingDto: UpdateRatingDto): Promise<Loaded<Rating>>;
    patch(id: number, updateRatingDto: UpdateRatingDto): Promise<Loaded<Rating>>;
    remove(id: number): Promise<Loaded<Rating>>;
    getCreator(id: number): Promise<Loaded<User>>;
    getStation(id: number): Promise<Loaded<Station>>;
    getComment(id: number): Promise<Loaded<Comment>>;
}
