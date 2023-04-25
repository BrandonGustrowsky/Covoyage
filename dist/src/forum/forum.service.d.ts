import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Comment from 'src/comment/entities/comment.entity';
import Station from 'src/station/entities/station.entity';
import User from 'src/user/entities/user.entity';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import Forum from './entities/forum.entity';
export declare class ForumService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createForumDto: CreateForumDto): Promise<Forum>;
    findAll(): Promise<Loaded<Forum, never>[]>;
    findOne(id: string): Promise<Loaded<Forum, never>>;
    put(id: string, updateForumDto: UpdateForumDto): Promise<Loaded<Forum, never>>;
    patch(id: string, updateForumDto: UpdateForumDto): Promise<Loaded<Forum, never>>;
    remove(id: string): Promise<Loaded<Forum, never>>;
    getComments(id: string): Promise<Loaded<Collection<Comment>>>;
    getStation(id: string): Promise<Loaded<Station>>;
    getForumCreator(id: string): Promise<Loaded<User>>;
}
