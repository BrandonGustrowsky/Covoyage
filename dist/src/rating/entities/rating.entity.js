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
const comment_entity_1 = require("../../comment/entities/comment.entity");
const station_entity_1 = require("../../station/entities/station.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const create_rating_dto_1 = require("../dto/create-rating.dto");
const swagger_1 = require("@nestjs/swagger");
let Rating = class Rating {
    constructor(createRatingDto) {
        this.rating = createRatingDto.rating;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, rating: { required: true, type: () => Number }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default }, station: { required: true, type: () => require("../../station/entities/station.entity").default }, comment: { required: true, type: () => require("../../comment/entities/comment.entity").default } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The id of a rating."
    }),
    (0, core_1.PrimaryKey)({
        autoincrement: true,
    }),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The rating of a number."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Rating.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created the rating."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.ratings,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", user_entity_1.default)
], Rating.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Station",
        description: "The station a rating was given to."
    }),
    (0, core_1.ManyToOne)({
        entity: () => station_entity_1.default,
        inversedBy: (station) => station.ratings,
    }),
    __metadata("design:type", station_entity_1.default)
], Rating.prototype, "station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Comment",
        description: "The comment a rating was given to."
    }),
    (0, core_1.ManyToOne)({
        entity: () => comment_entity_1.default,
        inversedBy: (comment) => comment.ratings,
    }),
    __metadata("design:type", comment_entity_1.default)
], Rating.prototype, "comment", void 0);
Rating = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto])
], Rating);
exports.default = Rating;
//# sourceMappingURL=rating.entity.js.map