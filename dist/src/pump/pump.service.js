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
exports.PumpService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("../payment/entities/payment.entity");
const create_pump_dto_1 = require("./dto/create-pump.dto");
const update_pump_dto_1 = require("./dto/update-pump.dto");
const pump_entity_1 = require("./entities/pump.entity");
const swagger_1 = require("@nestjs/swagger");
let PumpService = class PumpService {
    constructor(em) {
        this.em = em;
    }
    async create(createPumpDto) {
        const pump = new pump_entity_1.default(createPumpDto);
        if (createPumpDto.payment_types) {
            for (let payment_type of createPumpDto.payment_types) {
                pump.payment_types.add(this.em.getReference(payment_entity_1.default, payment_type));
            }
        }
        await this.em.persistAndFlush(pump);
        return pump;
    }
    async findAll() {
        return await this.em.find(pump_entity_1.default, {});
    }
    async findOne(id) {
        const pump = await this.em.findOne(pump_entity_1.default, { id });
        if (!pump) {
            throw new common_1.NotFoundException();
        }
        return pump;
    }
    async put(id, updatePumpDto) {
        const pump = await this.findOne(id);
        if (!pump) {
            throw new common_1.NotFoundException();
        }
        const { number, gas_price, diesel_price, can_pay, station, created_by, payment_types } = updatePumpDto;
        if (!number || !gas_price || !diesel_price || !can_pay || !created_by || !station || !payment_types) {
            throw new common_1.BadRequestException();
        }
        pump.number = number;
        pump.gas_price = gas_price;
        pump.diesel_price = diesel_price;
        pump.can_pay = can_pay;
        pump.station = station;
        pump.created_by = created_by;
        await this.em.persistAndFlush(pump);
        return pump;
    }
    async patch(id, updatePumpDto) {
        const pump = await this.findOne(id);
        const { number, gas_price, diesel_price, can_pay, station, created_by, payment_types } = updatePumpDto;
        if (!number && !gas_price && !diesel_price && !can_pay && !station && !created_by && !payment_types) {
            throw new common_1.BadRequestException();
        }
        if (number) {
            pump.number = number;
        }
        if (gas_price) {
            pump.gas_price = gas_price;
        }
        if (diesel_price) {
            pump.diesel_price = diesel_price;
        }
        if (created_by) {
            pump.created_by = created_by;
        }
        if (can_pay) {
            pump.can_pay = can_pay;
        }
        if (station) {
            pump.station = station;
        }
        if (payment_types) {
        }
        await this.em.persistAndFlush(pump);
        return pump;
    }
    async remove(id) {
        const pump = await this.findOne(id);
        await this.em.removeAndFlush(pump);
        return pump;
    }
    async getStation(id) {
        const pump = await this.em.findOne(pump_entity_1.default, { id }, { populate: ['station'] });
        if (!pump) {
            throw new common_1.NotFoundException();
        }
        return pump.station;
    }
    async getCreator(id) {
        const pump = await this.em.findOne(pump_entity_1.default, { id }, { populate: ['created_by'] });
        if (!pump) {
            throw new common_1.NotFoundException();
        }
        return pump.created_by;
    }
    async getPaymentTypes(id) {
        const pump = await this.em.findOne(pump_entity_1.default, { id }, { populate: ['payment_types'] });
        if (!pump) {
            throw new common_1.NotFoundException();
        }
        return pump.payment_types;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new pump." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pump_dto_1.CreatePumpDto]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all pumps." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single pump by its id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a pump's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pump_dto_1.UpdatePumpDto]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a pump's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pump_dto_1.UpdatePumpDto]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a pump." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the station of a pump." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "getStation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of a pump." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "getCreator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the payment types on a pump." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpService.prototype, "getPaymentTypes", null);
PumpService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("pump"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], PumpService);
exports.PumpService = PumpService;
//# sourceMappingURL=pump.service.js.map