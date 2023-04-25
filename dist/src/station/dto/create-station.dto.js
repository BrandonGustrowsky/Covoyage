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
exports.CreateStationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, location: { required: true, type: () => String }, restroom_count: { required: true, type: () => Number }, ratings: { required: true, type: () => [Number] }, created_by: { required: true, type: () => String }, forums: { required: true, type: () => [String] }, pumps: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The station's name.",
        example: "Marathon",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The location of the station.",
        example: "308 Nerga Aurora Ln. Albequerque New Mexico, 87104",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStationDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The number of restrooms in the station.",
        example: 2,
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStationDto.prototype, "restroom_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ratings the station has.",
        example: [],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateStationDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who created the station",
        example: {},
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStationDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The forums on the station.",
        example: [],
        required: true
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateStationDto.prototype, "forums", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The pumps a station has.",
        example: [],
        required: true
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateStationDto.prototype, "pumps", void 0);
exports.CreateStationDto = CreateStationDto;
//# sourceMappingURL=create-station.dto.js.map