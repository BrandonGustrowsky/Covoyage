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
exports.CreatePaymentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePaymentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => String }, created_by: { required: true, type: () => String }, pumps: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The type of the payment method.",
        example: "Mastercard",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who created the payment type.",
        example: "123i-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The pumps a payment type can be used on.",
        example: "[123i-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108, 9Bxz2a-Ah3b-1ihVbLWAI8-28UAHHh1-g1bgph108]",
        required: true
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePaymentDto.prototype, "pumps", void 0);
exports.CreatePaymentDto = CreatePaymentDto;
//# sourceMappingURL=create-payment.dto.js.map