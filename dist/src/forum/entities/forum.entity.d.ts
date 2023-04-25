import { Collection } from '@mikro-orm/core';
import Comment from 'src/comment/entities/comment.entity';
import Station from 'src/station/entities/station.entity';
import User from 'src/user/entities/user.entity';
import { CreateForumDto } from '../dto/create-forum.dto';
declare class Forum {
    constructor(createForumDto: CreateForumDto);
    id: string;
    title: string;
    description: string;
    comments: Collection<Comment, object>;
    station: Station;
    created_by: User;
}
export default Forum;
