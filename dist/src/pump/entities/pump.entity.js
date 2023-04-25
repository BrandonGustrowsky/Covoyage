"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const payment_entity_1 = require("../../payment/entities/payment.entity");
const station_entity_1 = require("../../station/entities/station.entity");
const uuid_1 = require("uuid");
const create_pump_dto_1 = require("../dto/create-pump.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
let Pump = class Pump {
    constructor(createPumpDto) {
        this.id = (0, uuid_1.v4)();
        this.payment_types = new core_1.Collection(this);
        this.number = createPumpDto.number;
        this.gas_price = createPumpDto.gas_price;
        this.diesel_price = createPumpDto.diesel_price;
        this.can_pay = createPumpDto.can_pay;
        this.station = createPumpDto.station;
        this.created_by = createPumpDto.created_by;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, number: { required: true, type: () => Number }, gas_price: { required: true, type: () => Number }, diesel_price: { required: true, type: () => Number }, can_pay: { required: true, type: () => Boolean }, station: { required: true, type: () => require("../../station/entities/station.entity").default }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default }, payment_types: { required: true, type: () => Object, default: new core_1.Collection(this) } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({
        length: 64,
    }),
    __metadata("design:type", String)
], Pump.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The pump number.",
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Pump.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The price of gas at the station."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Pump.prototype, "gas_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The price of diese at the station."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Pump.prototype, "diesel_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "boolean",
        description: "Determines if the user can pay at that pump or not."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], Pump.prototype, "can_pay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Station",
        description: "The station that owns the pump."
    }),
    (0, core_1.ManyToOne)({
        entity: () => station_entity_1.default,
        inversedBy: (station) => station.pumps,
    }),
    __metadata("design:type", station_entity_1.default)
], Pump.prototype, "station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created the pump."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.pumps,
    }),
    __metadata("design:type", user_entity_1.default)
], Pump.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Collection<Payment>",
        description: "The payment types a pump accepts."
    }),
    (0, core_1.ManyToMany)({
        entity: () => payment_entity_1.default,
        inversedBy: (payment) => payment.pumps,
    }),
    __metadata("design:type", Object)
], Pump.prototype, "payment_types", void 0);
Pump = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_pump_dto_1.CreatePumpDto])
], Pump);
exports.default = Pump;
//# sourceMappingURL=pump.entity.js.map