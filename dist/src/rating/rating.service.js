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
exports.RatingService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const station_entity_1 = require("../station/entities/station.entity");
const user_entity_1 = require("../user/entities/user.entity");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const update_rating_dto_1 = require("./dto/update-rating.dto");
const rating_entity_1 = require("./entities/rating.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const swagger_1 = require("@nestjs/swagger");
let RatingService = class RatingService {
    constructor(em) {
        this.em = em;
    }
    async create(createRatingDto) {
        const oRating = new rating_entity_1.default(createRatingDto);
        oRating.created_by = this.em.getReference(user_entity_1.default, createRatingDto.created_by);
        oRating.station = this.em.getReference(station_entity_1.default, createRatingDto.station);
        oRating.comment = this.em.getReference(comment_entity_1.default, createRatingDto.comment);
        await this.em.persistAndFlush(oRating);
        return oRating;
    }
    async findAll() {
        return await this.em.find(rating_entity_1.default, {});
    }
    async findOne(id) {
        const rating = await this.em.findOne(rating_entity_1.default, { id });
        if (!rating) {
            throw new common_1.NotFoundException();
        }
        return rating;
    }
    async put(id, updateRatingDto) {
        const oRating = await this.findOne(id);
        const { rating, station, comment } = updateRatingDto;
        if (!rating || !station || !comment) {
            throw new common_1.BadRequestException();
        }
        oRating.rating = rating;
        oRating.station = this.em.getReference(station_entity_1.default, station);
        oRating.comment = this.em.getReference(comment_entity_1.default, comment);
        await this.em.flush();
        return oRating;
    }
    async patch(id, updateRatingDto) {
        const oRating = await this.findOne(id);
        const { rating, station, comment } = updateRatingDto;
        if (!rating && !station && !comment) {
            throw new common_1.BadRequestException();
        }
        if (rating) {
            oRating.rating = rating;
        }
        if (station) {
            oRating.station = this.em.getReference(station_entity_1.default, station);
        }
        if (comment) {
            oRating.comment = this.em.getReference(comment_entity_1.default, comment);
        }
        await this.em.flush();
        return oRating;
    }
    async remove(id) {
        const oRating = await this.findOne(id);
        await this.em.removeAndFlush(oRating);
        return oRating;
    }
    async getCreator(id) {
        const rating = await this.em.findOne(rating_entity_1.default, { id }, { populate: ['created_by'] });
        if (!rating) {
            throw new common_1.NotFoundException();
        }
        return rating.created_by;
    }
    async getStation(id) {
        const rating = await this.em.findOne(rating_entity_1.default, { id }, { populate: ['station'] });
        if (!rating) {
            throw new common_1.NotFoundException();
        }
        return rating.station;
    }
    async getComment(id) {
        const rating = await this.em.findOne(rating_entity_1.default, { id }, { populate: ['comment'] });
        if (!rating) {
            throw new common_1.NotFoundException();
        }
        return rating.comment;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new rating." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({ description: "A new rating" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all ratings." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single rating by its id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a rating's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a rating's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a rating." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of a rating." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the station a rating was made on." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the comment a rating was made on." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingService.prototype, "getComment", null);
RatingService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("rating"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], RatingService);
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map