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
exports.ForumService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("../comment/entities/comment.entity");
const station_entity_1 = require("../station/entities/station.entity");
const user_entity_1 = require("../user/entities/user.entity");
const create_forum_dto_1 = require("./dto/create-forum.dto");
const update_forum_dto_1 = require("./dto/update-forum.dto");
const forum_entity_1 = require("./entities/forum.entity");
const swagger_1 = require("@nestjs/swagger");
let ForumService = class ForumService {
    constructor(em) {
        this.em = em;
    }
    async create(createForumDto) {
        const { comments, station, created_by } = createForumDto;
        const forum = new forum_entity_1.default(createForumDto);
        if (comments) {
            for (let comment of comments) {
                forum.comments.add(this.em.getReference(comment_entity_1.default, comment));
            }
        }
        forum.station = this.em.getReference(station_entity_1.default, station);
        forum.created_by = this.em.getReference(user_entity_1.default, created_by);
        await this.em.persistAndFlush(forum);
        return forum;
    }
    async findAll() {
        return await this.em.find(forum_entity_1.default, {});
    }
    async findOne(id) {
        const forum = await this.em.findOne(forum_entity_1.default, { id });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        return forum;
    }
    async put(id, updateForumDto) {
        const forum = await this.em.findOne(forum_entity_1.default, { id });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        const { title, description, comments, station } = updateForumDto;
        if (!title || !description || !comments || !station) {
            throw new common_1.BadRequestException();
        }
        forum.title = title;
        forum.description = description;
        for (let comment of comments) {
            forum.comments.add(this.em.getReference(comment_entity_1.default, comment));
        }
        forum.station = this.em.getReference(station_entity_1.default, station);
        await this.em.flush();
        return forum;
    }
    async patch(id, updateForumDto) {
        const forum = await this.em.findOne(forum_entity_1.default, { id });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        const { title, description, comments, station } = updateForumDto;
        if (!title && !description && !comments && !station) {
            throw new common_1.BadRequestException();
        }
        if (title) {
            forum.title = title;
        }
        if (description) {
            forum.description = description;
        }
        if (comments) {
            for (let comment of comments) {
                forum.comments.add(this.em.getReference(comment_entity_1.default, comment));
            }
        }
        if (station) {
            forum.station = this.em.getReference(station_entity_1.default, station);
        }
        await this.em.flush();
        return forum;
    }
    async remove(id) {
        const forum = await this.findOne(id);
        await this.em.removeAndFlush(forum);
        return forum;
    }
    async getComments(id) {
        const forum = await this.em.findOne(forum_entity_1.default, { id }, { populate: ['comments'] });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        return forum.comments;
    }
    async getStation(id) {
        const forum = await this.em.findOne(forum_entity_1.default, { id }, { populate: ['station'] });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        return forum.station;
    }
    async getForumCreator(id) {
        const forum = await this.em.findOne(forum_entity_1.default, { id }, { populate: ['created_by'] });
        if (!forum) {
            throw new common_1.NotFoundException();
        }
        return forum.created_by;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new forum." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forum_dto_1.CreateForumDto]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all forums." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single forum by its id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a forum's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a forum's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a forum." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the comments on a forum." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "getComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the station a forum was made under." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of a forum." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumService.prototype, "getForumCreator", null);
ForumService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("forum"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], ForumService);
exports.ForumService = ForumService;
//# sourceMappingURL=forum.service.js.map