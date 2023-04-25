import { Collection, Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import Payment from 'src/payment/entities/payment.entity';
import Station from 'src/station/entities/station.entity';
import { CreatePumpDto } from './dto/create-pump.dto';
import { UpdatePumpDto } from './dto/update-pump.dto';
import Pump from './entities/pump.entity';
import User from 'src/user/entities/user.entity';
export declare class PumpService {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    create(createPumpDto: CreatePumpDto): Promise<Loaded<Pump>>;
    findAll(): Promise<Loaded<Array<Pump>>>;
    findOne(id: string): Promise<Loaded<Pump>>;
    put(id: string, updatePumpDto: UpdatePumpDto): Promise<Loaded<Pump>>;
    patch(id: string, updatePumpDto: UpdatePumpDto): Promise<Loaded<Pump>>;
    remove(id: string): Promise<Loaded<Pump>>;
    getStation(id: string): Promise<Loaded<Station>>;
    getCreator(id: string): Promise<Loaded<User>>;
    getPaymentTypes(id: string): Promise<Loaded<Collection<Payment>>>;
}
