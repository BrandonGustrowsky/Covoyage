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
exports.CreateForumDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateForumDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: true, type: () => String }, comments: { required: true, type: () => [Number] }, station: { required: true, type: () => String }, created_by: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The title of a forum.",
        example: "What's up with the bad smell?",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateForumDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The description of the forum.",
        example: `I am a frequent visitor of this station, and recently I've been smelling something awful
            every time I enter through the front door!`,
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateForumDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The comments of a forum.",
        example: [],
        required: true
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateForumDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The station a forum was placed under.",
        example: "iwjRJI2jCijsijxb2Ubz1",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateForumDto.prototype, "station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who created the forum.",
        example: "iwjRJI2jCijsijxb2Ubz1",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateForumDto.prototype, "created_by", void 0);
exports.CreateForumDto = CreateForumDto;
//# sourceMappingURL=create-forum.dto.js.map