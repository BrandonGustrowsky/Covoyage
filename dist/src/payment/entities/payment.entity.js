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
const pump_entity_1 = require("../../pump/entities/pump.entity");
const create_payment_dto_1 = require("../dto/create-payment.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
let Payment = class Payment {
    constructor(createPaymentDto) {
        this.pumps = new core_1.Collection(this);
        this.type = createPaymentDto.type;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, type: { required: true, type: () => String }, pumps: { required: true, type: () => Object, default: new core_1.Collection(this) }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The id of a payment type."
    }),
    (0, core_1.PrimaryKey)({
        autoincrement: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The type of a payment type."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Collection<Pump>",
        description: "The pumps a payment type can be used on."
    }),
    (0, core_1.ManyToMany)({
        entity: () => pump_entity_1.default,
        mappedBy: (pump) => pump.payment_types,
    }),
    __metadata("design:type", Object)
], Payment.prototype, "pumps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created a payment type."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.payment_types
    }),
    __metadata("design:type", user_entity_1.default)
], Payment.prototype, "created_by", void 0);
Payment = __decorate([
    (0, core_1.Entity)(),
    (0, core_1.Unique)({
        properties: ['type'],
    }),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto])
], Payment);
exports.default = Payment;
//# sourceMappingURL=payment.entity.js.map