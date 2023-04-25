import { Collection } from '@mikro-orm/core';
import Payment from 'src/payment/entities/payment.entity';
import Station from 'src/station/entities/station.entity';
import { CreatePumpDto } from '../dto/create-pump.dto';
import User from 'src/user/entities/user.entity';
declare class Pump {
    constructor(createPumpDto: CreatePumpDto);
    id: string;
    number: number;
    gas_price: number;
    diesel_price: number;
    can_pay: boolean;
    station: Station;
    created_by: User;
    payment_types: Collection<Payment, object>;
}
export default Pump;
