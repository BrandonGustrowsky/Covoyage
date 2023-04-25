import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Pump from 'src/pump/entities/pump.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Payment from './entities/payment.entity';
import User from 'src/user/entities/user.entity';
export declare class PaymentService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createPaymentDto: CreatePaymentDto): Promise<Loaded<Payment>>;
    findAll(): Promise<Loaded<Array<Payment>>>;
    findOne(id: number): Promise<Loaded<Payment>>;
    put(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Loaded<Payment>>;
    patch(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Loaded<Payment>>;
    remove(id: number): Promise<Loaded<Payment>>;
    getPumps(id: number): Promise<Loaded<Collection<Pump>>>;
    getCreator(id: number): Promise<Loaded<User>>;
}
