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
exports.CreatePumpDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const station_entity_1 = require("../../station/entities/station.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class CreatePumpDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { number: { required: true, type: () => Number }, gas_price: { required: true, type: () => Number }, diesel_price: { required: true, type: () => Number }, can_pay: { required: true, type: () => Boolean }, station: { required: true, type: () => require("../../station/entities/station.entity").default }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default }, payment_types: { required: true, type: () => [Number] } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "The pump's number.",
        example: 1,
        required: true
    }),
    __metadata("design:type", Number)
], CreatePumpDto.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "The gas price at the pump.",
        example: 3.24,
        required: true
    }),
    __metadata("design:type", Number)
], CreatePumpDto.prototype, "gas_price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "The diesel price at the pump.",
        example: 4.24,
        required: true
    }),
    __metadata("design:type", Number)
], CreatePumpDto.prototype, "diesel_price", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: "Says if the user can pay at that pump.",
        example: true,
        required: true
    }),
    __metadata("design:type", Boolean)
], CreatePumpDto.prototype, "can_pay", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "The station the pump is at.",
        example: "as12j-Aj1lkj-Bh8A2912-jLzkjB",
        required: true
    }),
    __metadata("design:type", station_entity_1.default)
], CreatePumpDto.prototype, "station", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "The user who created the pump.",
        example: "as12j-Aj1lkj-Bh8A2912-jLzkjB",
        required: true
    }),
    __metadata("design:type", user_entity_1.default)
], CreatePumpDto.prototype, "created_by", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        description: "The payment types accepted at the pump",
        example: ["as12j-Aj1lkj-Bh8A2912-jLzkjB", "as12j-Aj1lkj-Bh8A2912-jLzkjB"],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePumpDto.prototype, "payment_types", void 0);
exports.CreatePumpDto = CreatePumpDto;
//# sourceMappingURL=create-pump.dto.js.map