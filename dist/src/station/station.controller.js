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
exports.StationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const station_service_1 = require("./station.service");
const create_station_dto_1 = require("./dto/create-station.dto");
const update_station_dto_1 = require("./dto/update-station.dto");
const swagger_1 = require("@nestjs/swagger");
let StationController = class StationController {
    constructor(stationService) {
        this.stationService = stationService;
    }
    create(createStationDto) {
        return this.stationService.create(createStationDto);
    }
    findAll() {
        return this.stationService.findAll();
    }
    findOne(id) {
        return this.stationService.findOne(id);
    }
    put(id, updateStationDto) {
        return this.stationService.put(id, updateStationDto);
    }
    patch(id, UpdateStationDto) {
        return this.stationService.patch(id, UpdateStationDto);
    }
    remove(id) {
        return this.stationService.remove(id);
    }
    getForums(id) {
        return this.stationService.getForums(id);
    }
    getCreator(id) {
        return this.stationService.getCreator(id);
    }
    getRatings(id) {
        return this.stationService.getRatings(id);
    }
    getPumps(id) {
        return this.stationService.getPumps(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new station." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_station_dto_1.CreateStationDto]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all stations", summary: "This endpoint retrieves all stations." }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/station.entity").default] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches a station by their id", summary: "This endpoint retrieves a single user by their id." }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Updates a station with total replacement", summary: "This endpoint performs complete replacement on a station's properties." }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_station_dto_1.UpdateStationDto]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs partial replacement on a station's fields", summary: "This endpoint performs partial replacement on a station's properties." }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_station_dto_1.UpdateStationDto]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Deletes a station", summary: "This endpoint deletes a station." }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets all forums about a single station", summary: "This endpoint gets all the forums made in a station." }),
    (0, common_1.Get)('/forums/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "getForums", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Gets the creator of a single station", summary: "This endpoint gets the creator of a station." }),
    (0, common_1.Get)('/creator/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Returns all ratings of a provided station", summary: "This endpoing gets all the ratings made on a station." }),
    (0, common_1.Get)('/ratings/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "getRatings", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all pumps on a single station", summary: "This endpoing gets all the pumps a station has." }),
    (0, common_1.Get)('/pumps/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StationController.prototype, "getPumps", null);
StationController = __decorate([
    (0, common_1.Controller)('station'),
    (0, swagger_1.ApiTags)("station"),
    __metadata("design:paramtypes", [station_service_1.StationService])
], StationController);
exports.StationController = StationController;
//# sourceMappingURL=station.controller.js.map