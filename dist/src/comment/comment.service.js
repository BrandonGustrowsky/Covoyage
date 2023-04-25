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
exports.CommentService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const rating_entity_1 = require("../rating/entities/rating.entity");
const user_entity_1 = require("../user/entities/user.entity");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const forum_entity_1 = require("../forum/entities/forum.entity");
const comment_entity_1 = require("./entities/comment.entity");
const swagger_1 = require("@nestjs/swagger");
let CommentService = class CommentService {
    constructor(em) {
        this.em = em;
    }
    async create(createCommentDto) {
        const { ratings, created_by, forum, parent, children } = createCommentDto;
        const comment = new comment_entity_1.default(createCommentDto);
        if (ratings) {
            for (let rating of ratings) {
                comment.ratings.add(this.em.getReference(rating_entity_1.default, rating));
            }
        }
        if (children) {
            for (let child of children) {
                comment.children.add(this.em.getReference(comment_entity_1.default, child));
            }
        }
        comment.forum = this.em.getReference(forum_entity_1.default, forum);
        comment.parent = this.em.getReference(comment_entity_1.default, parent);
        comment.created_by = this.em.getReference(user_entity_1.default, created_by);
        await this.em.persistAndFlush(comment);
        return comment;
    }
    async findAll() {
        return await this.em.find(comment_entity_1.default, {});
    }
    async findOne(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id });
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        return comment;
    }
    async put(id, updateCommentDto) {
        const comment = await this.findOne(id);
        const { contents, ratings, forum, children, parent } = updateCommentDto;
        if (!contents || !ratings || !forum || !children || !parent) {
            throw new common_1.BadRequestException();
        }
        comment.contents = contents;
        for (let rating of ratings) {
            comment.ratings.add(this.em.getReference(rating_entity_1.default, rating));
        }
        for (let child of children) {
            comment.children.add(this.em.getReference(comment_entity_1.default, child));
        }
        comment.forum = this.em.getReference(forum_entity_1.default, forum);
        comment.parent = this.em.getReference(comment_entity_1.default, parent);
        await this.em.flush();
        return comment;
    }
    async patch(id, updateCommentDto) {
        const comment = await this.findOne(id);
        const { contents, ratings, created_by, forum, children, parent } = updateCommentDto;
        if (!contents && !ratings && !created_by && !forum && !children && !parent) {
            throw new common_1.BadRequestException();
        }
        if (contents) {
            comment.contents = contents;
        }
        if (ratings) {
            for (let rating of ratings) {
                comment.ratings.add(this.em.getReference(rating_entity_1.default, rating));
            }
        }
        if (children) {
            for (let child of children) {
                comment.children.add(this.em.getReference(comment_entity_1.default, child));
            }
        }
        if (forum) {
            comment.forum = this.em.getReference(forum_entity_1.default, forum);
        }
        if (parent) {
            comment.parent = this.em.getReference(comment_entity_1.default, parent);
        }
        await this.em.flush();
        return comment;
    }
    async remove(id) {
        const comment = await this.findOne(id);
        await this.em.removeAndFlush(comment);
        return comment;
    }
    async getRatings(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id }, { populate: ['ratings'] });
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        return comment.ratings;
    }
    async getCommentCreator(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id }, { populate: ['created_by'] });
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        return comment.created_by;
    }
    async getForum(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id }, { populate: ['forum'] });
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        return comment.forum;
    }
    async getChildren(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id }, { populate: ['children'] });
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        return comment.children;
    }
    async getParent(id) {
        const comment = await this.em.findOne(comment_entity_1.default, { id }, { populate: ['parent'] });
        if (!comment || !comment.parent) {
            throw new common_1.NotFoundException();
        }
        return comment.parent;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all comments." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single comment by its id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a comment's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a comment's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the ratings on a comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "getRatings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of a comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "getCommentCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the forum a comment was made on." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "getForum", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the child comments of a comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "getChildren", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the parent comment of a comment." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentService.prototype, "getParent", null);
CommentService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("comment"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map