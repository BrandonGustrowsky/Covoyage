import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Rating from 'src/rating/entities/rating.entity';
import User from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import Forum from 'src/forum/entities/forum.entity';
import Comment from './entities/comment.entity';
export declare class CommentService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAll(): Promise<Loaded<Comment, never>[]>;
    findOne(id: number): Promise<Loaded<Comment, never>>;
    put(id: number, updateCommentDto: UpdateCommentDto): Promise<Loaded<Comment, never>>;
    patch(id: number, updateCommentDto: UpdateCommentDto): Promise<Loaded<Comment, never>>;
    remove(id: number): Promise<Loaded<Comment, never>>;
    getRatings(id: number): Promise<Loaded<Collection<Rating>>>;
    getCommentCreator(id: number): Promise<Loaded<User>>;
    getForum(id: number): Promise<Loaded<Forum>>;
    getChildren(id: number): Promise<Loaded<Collection<Comment>>>;
    getParent(id: number): Promise<Loaded<Comment>>;
}
