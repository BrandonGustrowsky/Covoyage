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
exports.PumpController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pump_service_1 = require("./pump.service");
const create_pump_dto_1 = require("./dto/create-pump.dto");
const update_pump_dto_1 = require("./dto/update-pump.dto");
const swagger_1 = require("@nestjs/swagger");
let PumpController = class PumpController {
    constructor(pumpService) {
        this.pumpService = pumpService;
    }
    create(createPumpDto) {
        return this.pumpService.create(createPumpDto);
    }
    findAll() {
        return this.pumpService.findAll();
    }
    findOne(id) {
        return this.pumpService.findOne(id);
    }
    put(id, updatePumpDto) {
        return this.pumpService.put(id, updatePumpDto);
    }
    patch(id, updatePumpDto) {
        return this.pumpService.patch(id, updatePumpDto);
    }
    remove(id) {
        return this.pumpService.remove(id);
    }
    getStation(id) {
        return this.pumpService.getStation(id);
    }
    getCreator(id) {
        return this.pumpService.getCreator(id);
    }
    getPaymentTypes(id) {
        return this.pumpService.getPaymentTypes(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Creates a new pump", summary: "This endpoint creates a new pump." }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pump_dto_1.CreatePumpDto]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches all pumps", summary: "This endpoint retrieves all pumps." }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/pump.entity").default] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches a single pump", summary: "This endpoint retrieves a single pump by its id." }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs complete replacement on a pump", summary: "This endpoint performs complete replacement on a pump's properties." }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pump_dto_1.UpdatePumpDto]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Performs partial replacement on a pump", summary: "This endpoint performs partial replacement on a pump's properties." }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pump_dto_1.UpdatePumpDto]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Deletes a pump", summary: "This endpoint deletes a pump." }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the station a pump is at", summary: "This endpoint gets the station of a pump." }),
    (0, common_1.Get)('station/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the creator of a pump", summary: "This endpoint gets the creator of a pump." }),
    (0, common_1.Get)('creator/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: "Fetches the payment types accepted by a pump", summary: "This endpoint gets the payment types on a pump." }),
    (0, common_1.Get)('/payment/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PumpController.prototype, "getPaymentTypes", null);
PumpController = __decorate([
    (0, common_1.Controller)('pump'),
    (0, swagger_1.ApiTags)("pump"),
    __metadata("design:paramtypes", [pump_service_1.PumpService])
], PumpController);
exports.PumpController = PumpController;
//# sourceMappingURL=pump.controller.js.map