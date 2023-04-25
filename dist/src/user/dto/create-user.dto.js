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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, password: { required: true, type: () => String }, stations: { required: true, type: () => [String] }, pumps: { required: true, type: () => [String] }, ratings: { required: true, type: () => [Number] }, comments: { required: true, type: () => [Number] }, forums: { required: true, type: () => [String] }, payment_types: { required: true, type: () => [Number] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user's username.",
        example: "SparkSpeed",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user's email.",
        example: "bgustrowsky@southern.edu",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user's phone number.",
        example: "419-346-9901",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user's password.",
        example: "YifJ3vbq!",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The stations created by a user",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "stations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The pumps created by a user",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "pumps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ratings a user has created.",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The comments a user has created.",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The forums a user has created.",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "forums", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The payment types a user has created",
        example: "[]",
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "payment_types", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map