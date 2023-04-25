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
exports.CreateCommentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCommentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contents: { required: true, type: () => String }, forum: { required: true, type: () => String }, ratings: { required: true, type: () => [Number] }, created_by: { required: true, type: () => String }, children: { required: true, type: () => [Number] }, parent: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The text of a comment.",
        example: "There are many flags in many lands, there are flags of every hue.",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "contents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The forum a comment was posted on.",
        example: {},
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "forum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The ratings a comment has.",
        example: [],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCommentDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The user who created the comment.",
        example: {},
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The children comments of the current comment.",
        example: [],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCommentDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The parent comment of the current comment.",
        example: {},
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCommentDto.prototype, "parent", void 0);
exports.CreateCommentDto = CreateCommentDto;
//# sourceMappingURL=create-comment.dto.js.map