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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const swagger_1 = require("@nestjs/swagger");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(createCommentDto) {
        return this.commentService.create(createCommentDto);
    }
    findAll() {
        return this.commentService.findAll();
    }
    findOne(id) {
        return this.commentService.findOne(+id);
    }
    put(id, UpdateCommentDto) {
        return this.commentService.put(+id, UpdateCommentDto);
    }
    patch(id, updateCommentDto) {
        return this.commentService.patch(+id, updateCommentDto);
    }
    remove(id) {
        return this.commentService.remove(+id);
    }
    getRatings(id) {
        return this.commentService.getRatings(+id);
    }
    getCommentCreator(id) {
        return this.commentService.getCommentCreator(+id);
    }
    getForum(id) {
        return this.commentService.getForum(+id);
    }
    getChildren(id) {
        return this.commentService.getChildren(+id);
    }
    getParent(id) {
        return this.commentService.getParent(+id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Creates a new comment", summary: "This endpoint creates a new comment." }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 201, type: require("./entities/comment.entity").default }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all comments", summary: "This endpoint retrieves all comments." }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches a comment by its id", summary: "This endpoint retrieves a single comment by its id." }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs total replacement on the fields of a comment", summary: "This endpoint performs complete replacement on a comment's properties." }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs partial replacement on the fields of a comment", summary: "This endpoint performs partial replacement on a comment's properties." }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Deletes a comment", summary: "This endpoint deletes a comment." }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the ratings on a single comment", summary: "This endpoint gets the ratings on a comment." }),
    (0, common_1.Get)('/ratings/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getRatings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the user who created the comment", summary: "This endpoint gets the creator of a comment." }),
    (0, common_1.Get)('/creator/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCommentCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the forum a commment was posted on", summary: "This endpoint gets the forum a comment was made on." }),
    (0, common_1.Get)('/forum/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getForum", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the children comments of a single comment", summary: "This endpoint gets the child comments of a comment." }),
    (0, common_1.Get)('/children/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getChildren", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the parent comment of the given comment", summary: "This endpoint gets the parent comment of a comment." }),
    (0, common_1.Get)('/parent/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getParent", null);
CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    (0, swagger_1.ApiTags)("comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map