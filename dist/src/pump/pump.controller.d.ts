import { PumpService } from './pump.service';
import { CreatePumpDto } from './dto/create-pump.dto';
import { UpdatePumpDto } from './dto/update-pump.dto';
export declare class PumpController {
    private readonly pumpService;
    constructor(pumpService: PumpService);
    create(createPumpDto: CreatePumpDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/pump.entity").default, never>>;
    findAll(): Promise<import("./entities/pump.entity").default[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/pump.entity").default, never>>;
    put(id: string, updatePumpDto: UpdatePumpDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/pump.entity").default, never>>;
    patch(id: string, updatePumpDto: UpdatePumpDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/pump.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/pump.entity").default, never>>;
    getStation(id: string): Promise<import("@mikro-orm/core").Loaded<import("../station/entities/station.entity").default, never>>;
    getCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
    getPaymentTypes(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../payment/entities/payment.entity").default, object>, never>>;
}
