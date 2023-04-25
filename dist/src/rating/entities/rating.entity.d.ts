import Comment from 'src/comment/entities/comment.entity';
import Station from 'src/station/entities/station.entity';
import User from 'src/user/entities/user.entity';
import { CreateRatingDto } from '../dto/create-rating.dto';
declare class Rating {
    constructor(createRatingDto: CreateRatingDto);
    id: number;
    rating: number;
    created_by: User;
    station: Station;
    comment: Comment;
}
export default Rating;
