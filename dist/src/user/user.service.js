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
exports.UserService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const forum_entity_1 = require("../forum/entities/forum.entity");
const rating_entity_1 = require("../rating/entities/rating.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const station_entity_1 = require("../station/entities/station.entity");
const pump_entity_1 = require("../pump/entities/pump.entity");
const swagger_1 = require("@nestjs/swagger");
let UserService = class UserService {
    constructor(em) {
        this.em = em;
    }
    async create(createUserDto) {
        const user = new user_entity_1.default(createUserDto);
        await this.em.persistAndFlush(user);
        return user;
    }
    async findAll() {
        return await this.em.find(user_entity_1.default, {});
    }
    async findOne(id) {
        const user = await this.em.findOne(user_entity_1.default, { id: id });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async put(id, updateUserDto) {
        const user = await this.em.findOne(user_entity_1.default, { id });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const { username, email, phone, password, ratings, stations, comments, pumps, forums } = updateUserDto;
        if (!username || !email || !phone || !password || !ratings || !stations || !pumps || !comments || !forums) {
            throw new common_1.BadRequestException();
        }
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.password = password;
        for (let station of stations) {
            user.stations.add(this.em.getReference(station_entity_1.default, station));
        }
        for (let rating of ratings) {
            user.ratings.add(this.em.getReference(rating_entity_1.default, rating));
        }
        for (let comment of comments) {
            user.comments.add(this.em.getReference(comment_entity_1.default, comment));
        }
        for (let pump of pumps) {
            user.pumps.add(this.em.getReference(pump_entity_1.default, pump));
        }
        for (let forum of forums) {
            user.forums.add(this.em.getReference(forum_entity_1.default, forum));
        }
        await this.em.persistAndFlush(user);
        return user;
    }
    async patch(id, updateUserDto) {
        const user = await this.em.findOne(user_entity_1.default, { id });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const { username, email, phone, password, ratings, stations, comments, pumps, forums } = updateUserDto;
        if (!username && !email && !phone && !password && !ratings && !stations && !pumps && !comments && !forums) {
            throw new common_1.BadRequestException();
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (phone) {
            user.phone = phone;
        }
        if (password) {
            user.password = password;
        }
        if (stations) {
            for (let station of stations) {
                user.stations.add(this.em.getReference(station_entity_1.default, station));
            }
        }
        if (pumps) {
            for (let pump of pumps) {
                user.pumps.add(this.em.getReference(pump_entity_1.default, pump));
            }
        }
        if (ratings) {
            for (let rating of ratings) {
                user.ratings.add(this.em.getReference(rating_entity_1.default, rating));
            }
        }
        if (comments) {
            for (let comment of comments) {
                user.comments.add(this.em.getReference(comment_entity_1.default, comment));
            }
        }
        if (forums) {
            for (let forum of forums) {
                user.forums.add(this.em.getReference(forum_entity_1.default, forum));
            }
        }
        await this.em.persistAndFlush(user);
        return user;
    }
    async remove(id) {
        const user = await this.em.findOne(user_entity_1.default, { id });
        if (!user) {
            console.log("In if");
            throw new common_1.NotFoundException();
        }
        this.em.removeAndFlush(user);
        return user;
    }
    async getRatings(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['ratings'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.ratings;
    }
    async getStations(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['stations'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.stations;
    }
    async getPumps(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['pumps'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.pumps;
    }
    async getComments(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['comments'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.comments;
    }
    async getForums(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['forums'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.forums;
    }
    async getPaymentTypes(id) {
        const user = await this.em.findOne(user_entity_1.default, { id }, { populate: ['payment_types'] });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user.payment_types;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Retrieves all users" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Retrives a single user by their id " }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Performs complete replacement of a user's properties " }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a user's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets all the ratings made by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getRatings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets all the stations made by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getStations", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets all the pumps made by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getPumps", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets all the comments created by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all forums created by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getForums", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all payment types created by a user." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getPaymentTypes", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("user"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map