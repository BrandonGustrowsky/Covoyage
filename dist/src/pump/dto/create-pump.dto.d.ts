import Station from "src/station/entities/station.entity";
import User from "src/user/entities/user.entity";
export declare class CreatePumpDto {
    number: number;
    gas_price: number;
    diesel_price: number;
    can_pay: boolean;
    station: Station;
    created_by: User;
    payment_types: Array<number>;
}
