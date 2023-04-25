import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Forum from 'src/forum/entities/forum.entity';
import Pump from 'src/pump/entities/pump.entity';
import Rating from 'src/rating/entities/rating.entity';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import Station from './entities/station.entity';
import User from 'src/user/entities/user.entity';
export declare class StationService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createStationDto: CreateStationDto): Promise<Loaded<Station>>;
    findAll(): Promise<Loaded<Array<Station>>>;
    findOne(id: string): Promise<Loaded<Station>>;
    put(id: string, updateStationDto: UpdateStationDto): Promise<Loaded<Station>>;
    patch(id: string, updateStationDto: UpdateStationDto): Promise<Loaded<Station>>;
    remove(id: string): Promise<Loaded<Station>>;
    getForums(id: string): Promise<Loaded<Collection<Forum>>>;
    getCreator(id: string): Promise<Loaded<User>>;
    getRatings(id: string): Promise<Loaded<Collection<Rating>>>;
    getPumps(id: string): Promise<Loaded<Collection<Pump>>>;
}
