import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    create(createForumDto: CreateForumDto): Promise<import("./entities/forum.entity").default>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./entities/forum.entity").default, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/forum.entity").default, never>>;
    put(id: string, UpdateForumDto: UpdateForumDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/forum.entity").default, never>>;
    update(id: string, updateForumDto: UpdateForumDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/forum.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/forum.entity").default, never>>;
    getComments(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../comment/entities/comment.entity").default, object>, never>>;
    getStation(id: string): Promise<import("@mikro-orm/core").Loaded<import("../station/entities/station.entity").default, never>>;
    getForumCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
}
