import { Collection } from '@mikro-orm/core';
import Pump from 'src/pump/entities/pump.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import User from 'src/user/entities/user.entity';
declare class Payment {
    constructor(createPaymentDto: CreatePaymentDto);
    id: number;
    type: string;
    pumps: Collection<Pump, object>;
    created_by: User;
}
export default Payment;
