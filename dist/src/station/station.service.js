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
exports.StationService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const forum_entity_1 = require("../forum/entities/forum.entity");
const pump_entity_1 = require("../pump/entities/pump.entity");
const rating_entity_1 = require("../rating/entities/rating.entity");
const create_station_dto_1 = require("./dto/create-station.dto");
const update_station_dto_1 = require("./dto/update-station.dto");
const station_entity_1 = require("./entities/station.entity");
const user_entity_1 = require("../user/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
let StationService = class StationService {
    constructor(em) {
        this.em = em;
    }
    async create(createStationDto) {
        const station = new station_entity_1.default(createStationDto);
        if (createStationDto.ratings) {
            for (let rating of createStationDto.ratings) {
                station.ratings.add(this.em.getReference(rating_entity_1.default, rating));
            }
        }
        station.created_by = this.em.getReference(user_entity_1.default, createStationDto.created_by);
        if (createStationDto.forums) {
            for (let forum of createStationDto.forums) {
                station.forums.add(this.em.getReference(forum_entity_1.default, forum));
            }
        }
        if (createStationDto.pumps) {
            for (let pump of createStationDto.pumps) {
                station.pumps.add(this.em.getReference(pump_entity_1.default, pump));
            }
        }
        await this.em.persistAndFlush(station);
        return station;
    }
    async findAll() {
        return await this.em.find(station_entity_1.default, {});
    }
    async findOne(id) {
        const station = await this.em.findOne(station_entity_1.default, { id });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        return station;
    }
    async put(id, updateStationDto) {
        const station = await this.em.findOne(station_entity_1.default, { id });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        const { name, location, restroom_count, ratings, forums, pumps, } = updateStationDto;
        if (!name || !location || !restroom_count || !ratings || !forums || !pumps) {
            throw new common_1.BadRequestException();
        }
        station.name = name;
        station.location = location;
        station.restroom_count = restroom_count;
        for (let rating of ratings) {
            station.ratings.add(this.em.getReference(rating_entity_1.default, rating));
        }
        for (let forum of forums) {
            station.forums.add(this.em.getReference(forum_entity_1.default, forum));
        }
        for (let pump of pumps) {
            station.pumps.add(this.em.getReference(pump_entity_1.default, pump));
        }
        await this.em.persistAndFlush(station);
        return station;
    }
    async patch(id, updateStationDto) {
        const station = await this.em.findOne(station_entity_1.default, { id });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        const { name, location, restroom_count, ratings, forums, pumps } = updateStationDto;
        if (!name && !location && !restroom_count && !ratings && !forums && !pumps) {
            throw new common_1.BadRequestException();
        }
        if (name) {
            station.name = name;
        }
        if (location) {
            station.location = location;
        }
        if (restroom_count) {
            station.restroom_count = restroom_count;
        }
        if (ratings) {
            for (let rating of ratings) {
                station.ratings.add(this.em.getReference(rating_entity_1.default, rating));
            }
        }
        if (forums) {
            for (let forum of forums) {
                station.forums.add(this.em.getReference(forum_entity_1.default, forum));
            }
        }
        if (pumps) {
            for (let pump of pumps) {
                station.pumps.add(this.em.getReference(pump_entity_1.default, pump));
            }
        }
        await this.em.persistAndFlush(station);
        return station;
    }
    async remove(id) {
        const station = await this.em.findOne(station_entity_1.default, { id });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        await this.em.removeAndFlush(station);
        return station;
    }
    async getForums(id) {
        const station = await this.em.findOne(station_entity_1.default, { id }, { populate: ['forums'] });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        return station.forums;
    }
    async getCreator(id) {
        const station = await this.em.findOne(station_entity_1.default, { id }, { populate: ['created_by'] });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        return station.created_by;
    }
    async getRatings(id) {
        const station = await this.em.findOne(station_entity_1.default, { id }, { populate: ['ratings'] });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        return station.ratings;
    }
    async getPumps(id) {
        const station = await this.em.findOne(station_entity_1.default, { id }, { populate: ['pumps'] });
        if (!station) {
            throw new common_1.NotFoundException();
        }
        return station.pumps;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_station_dto_1.CreateStationDto]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all stations." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StationService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single user by their id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a station's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_station_dto_1.UpdateStationDto]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a station's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_station_dto_1.UpdateStationDto]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets all the forums made in a station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "getForums", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of a station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoing gets all the ratings made on a station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "getRatings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoing gets all the pumps a station has." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationService.prototype, "getPumps", null);
StationService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("station"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map