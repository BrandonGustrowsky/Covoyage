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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const update_rating_dto_1 = require("./dto/update-rating.dto");
const swagger_1 = require("@nestjs/swagger");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    create(createRatingDto) {
        return this.ratingService.create(createRatingDto);
    }
    findAll() {
        return this.ratingService.findAll();
    }
    findOne(id) {
        return this.ratingService.findOne(+id);
    }
    put(id, updateRatingDto) {
        return this.ratingService.put(+id, updateRatingDto);
    }
    patch(id, updateRatingDto) {
        return this.ratingService.patch(+id, updateRatingDto);
    }
    remove(id) {
        return this.ratingService.remove(+id);
    }
    getCreator(id) {
        return this.ratingService.getCreator(+id);
    }
    getStation(id) {
        return this.ratingService.getStation(+id);
    }
    getComment(id) {
        return this.ratingService.getComment(+id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Creates a new rating", summary: "This endpoint creates a new rating." }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    (0, swagger_1.ApiResponse)({
        description: "A new rating",
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all ratings", summary: "This endpoint retrieves all ratings." }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/rating.entity").default] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches a single rating by its id", summary: "This endpoint retrieves a single rating by its id." }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs complete replacement on a rating object", summary: "This endpoint performs complete replacement on a rating's properties." }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs partial replacement on a rating object", summary: "This endpoint performs partial replacement on a rating's properties." }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rating_dto_1.UpdateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Deletes a rating", summary: "This endpoint deletes a rating." }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the user who created the rating", summary: "This endpoint gets the creator of a rating." }),
    (0, common_1.Get)('/creator/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the station the rating was created for", summary: "This endpoint gets the station a rating was made on." }),
    (0, common_1.Get)('/station/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the comment the rating was created for", summary: "This endpoint gets the comment a rating was made on." }),
    (0, common_1.Get)('/comment/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getComment", null);
RatingController = __decorate([
    (0, common_1.Controller)('rating'),
    (0, swagger_1.ApiTags)("rating"),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map