import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/user.entity").default, never>>;
    findAll(): Promise<import("./entities/user.entity").default[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/user.entity").default, never>>;
    put(id: string, updateUserDto: UpdateUserDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/user.entity").default, never>>;
    patch(id: string, updateUserDto: UpdateUserDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/user.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/user.entity").default, never>>;
    getRatings(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../rating/entities/rating.entity").default, object>, never>>;
    getStations(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../station/entities/station.entity").default, object>, never>>;
    getPumps(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../pump/entities/pump.entity").default, object>, never>>;
    getComments(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../comment/entities/comment.entity").default, object>, never>>;
    getForums(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../forum/entities/forum.entity").default, object>, never>>;
    getPaymentTypes(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../payment/entities/payment.entity").default, object>, never>>;
}
