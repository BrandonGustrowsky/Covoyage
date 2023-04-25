import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    create(createRatingDto: CreateRatingDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/rating.entity").default, never>>;
    findAll(): Promise<import("./entities/rating.entity").default[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/rating.entity").default, never>>;
    put(id: string, updateRatingDto: UpdateRatingDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/rating.entity").default, never>>;
    patch(id: string, updateRatingDto: UpdateRatingDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/rating.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/rating.entity").default, never>>;
    getCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
    getStation(id: string): Promise<import("@mikro-orm/core").Loaded<import("../station/entities/station.entity").default, never>>;
    getComment(id: string): Promise<import("@mikro-orm/core").Loaded<import("../comment/entities/comment.entity").default, never>>;
}
