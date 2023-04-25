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
exports.ForumController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const forum_service_1 = require("./forum.service");
const create_forum_dto_1 = require("./dto/create-forum.dto");
const update_forum_dto_1 = require("./dto/update-forum.dto");
const swagger_1 = require("@nestjs/swagger");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    create(createForumDto) {
        return this.forumService.create(createForumDto);
    }
    findAll() {
        return this.forumService.findAll();
    }
    findOne(id) {
        return this.forumService.findOne(id);
    }
    put(id, UpdateForumDto) {
        return this.forumService.put(id, UpdateForumDto);
    }
    update(id, updateForumDto) {
        return this.forumService.patch(id, updateForumDto);
    }
    remove(id) {
        return this.forumService.remove(id);
    }
    getComments(id) {
        return this.forumService.getComments(id);
    }
    getStation(id) {
        return this.forumService.getStation(id);
    }
    getForumCreator(id) {
        return this.forumService.getForumCreator(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Creates a new forum", summary: "This endpoint creates a new forum." }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 201, type: require("./entities/forum.entity").default }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forum_dto_1.CreateForumDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all forums", summary: "This endpoint retrieves all forums." }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches one forum by its id", summary: "This endpoint retrieves a single forum by its id." }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs complete replacement of a forum", summary: "This endpoint performs complete replacement on a forum's properties." }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs partial replacement on a forum", summary: "This endpoint performs partial replacement on a forum's properties." }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Deletes a fourm", summary: "This endpoint deletes a forum." }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the collection of a forum's comments", summary: "This endpoint gets the comments on a forum." }),
    (0, common_1.Get)('/comments/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the station a forum was created in", summary: "This endpoint gets the station a forum was made under." }),
    (0, common_1.Get)('/station/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the user who created the forum", summary: "This endpoint gets the creator of a forum." }),
    (0, common_1.Get)('/creator/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getForumCreator", null);
ForumController = __decorate([
    (0, common_1.Controller)('forum'),
    (0, swagger_1.ApiTags)("forum"),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
exports.ForumController = ForumController;
//# sourceMappingURL=forum.controller.js.map