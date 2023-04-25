import { Collection } from '@mikro-orm/core';
import Forum from 'src/forum/entities/forum.entity';
import Rating from 'src/rating/entities/rating.entity';
import User from 'src/user/entities/user.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
declare class Comment {
    constructor(createCommentDto: CreateCommentDto);
    id: number;
    contents: string;
    ratings: Collection<Rating, object>;
    created_by: User;
    forum: Forum;
    children: Collection<Comment, object>;
    parent?: Comment;
}
export default Comment;
