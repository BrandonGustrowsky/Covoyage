import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
export declare class StationController {
    private readonly stationService;
    constructor(stationService: StationService);
    create(createStationDto: CreateStationDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/station.entity").default, never>>;
    findAll(): Promise<import("./entities/station.entity").default[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/station.entity").default, never>>;
    put(id: string, updateStationDto: UpdateStationDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/station.entity").default, never>>;
    patch(id: string, UpdateStationDto: UpdateStationDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/station.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/station.entity").default, never>>;
    getForums(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../forum/entities/forum.entity").default, object>, never>>;
    getCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
    getRatings(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../rating/entities/rating.entity").default, object>, never>>;
    getPumps(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../pump/entities/pump.entity").default, object>, never>>;
}
