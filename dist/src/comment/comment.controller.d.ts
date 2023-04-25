import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto): Promise<import("./entities/comment.entity").default>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>>;
    put(id: string, UpdateCommentDto: UpdateCommentDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>>;
    patch(id: string, updateCommentDto: UpdateCommentDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>>;
    getRatings(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../rating/entities/rating.entity").default, object>, never>>;
    getCommentCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
    getForum(id: string): Promise<import("@mikro-orm/core").Loaded<import("../forum/entities/forum.entity").default, never>>;
    getChildren(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("./entities/comment.entity").default, object>, never>>;
    getParent(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/comment.entity").default, never>>;
}
