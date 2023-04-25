import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/payment.entity").default, never>>;
    findAll(): Promise<import("./entities/payment.entity").default[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/payment.entity").default, never>>;
    put(id: string, UpdatePaymentDto: UpdatePaymentDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/payment.entity").default, never>>;
    patch(id: string, updatePaymentDto: UpdatePaymentDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/payment.entity").default, never>>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/payment.entity").default, never>>;
    getPumps(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Collection<import("../pump/entities/pump.entity").default, object>, never>>;
    getCreator(id: string): Promise<import("@mikro-orm/core").Loaded<import("../user/entities/user.entity").default, never>>;
}
