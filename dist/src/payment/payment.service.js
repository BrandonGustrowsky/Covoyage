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
exports.PaymentService = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const pump_entity_1 = require("../pump/entities/pump.entity");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const payment_entity_1 = require("./entities/payment.entity");
const user_entity_1 = require("../user/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
let PaymentService = class PaymentService {
    constructor(em) {
        this.em = em;
    }
    async create(createPaymentDto) {
        const payment = new payment_entity_1.default(createPaymentDto);
        payment.created_by = this.em.getReference(user_entity_1.default, createPaymentDto.created_by);
        if (createPaymentDto.pumps) {
            for (let pump of createPaymentDto.pumps) {
                payment.pumps.add(this.em.getReference(pump_entity_1.default, pump));
            }
        }
        await this.em.persistAndFlush(payment);
        return payment;
    }
    async findAll() {
        return await this.em.find(payment_entity_1.default, {});
    }
    async findOne(id) {
        const payment = await this.em.findOne(payment_entity_1.default, { id });
        if (!payment) {
            throw new common_1.NotFoundException();
        }
        return payment;
    }
    async put(id, updatePaymentDto) {
        const payment = await this.findOne(id);
        const { type, pumps } = updatePaymentDto;
        if (!type || !pumps) {
            throw new common_1.BadRequestException();
        }
        payment.type = type;
        for (let pump of pumps) {
            payment.pumps.add(this.em.getReference(pump_entity_1.default, pump));
        }
        await this.em.persistAndFlush(payment);
        return payment;
    }
    async patch(id, updatePaymentDto) {
        const payment = await this.findOne(id);
        const { type, pumps } = updatePaymentDto;
        if (!type && !pumps) {
            throw new common_1.BadRequestException();
        }
        if (type) {
            payment.type = type;
        }
        if (pumps) {
            console.log("Updating pumps");
            for (let pump of pumps) {
                payment.pumps.add(this.em.getReference(pump_entity_1.default, pump));
            }
        }
        await this.em.persistAndFlush(payment);
        return payment;
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await this.em.removeAndFlush(payment);
        return payment;
    }
    async getPumps(id) {
        const payment = await this.em.findOne(payment_entity_1.default, { id }, { populate: ['pumps'] });
        if (!payment) {
            throw new common_1.NotFoundException();
        }
        return payment.pumps;
    }
    async getCreator(id) {
        const payment = await this.em.findOne(payment_entity_1.default, { id }, { populate: ['created_by'] });
        if (!payment) {
            throw new common_1.NotFoundException();
        }
        return payment.created_by;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint creates a new payment type." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves all payment types." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint retrieves a single payemnt type by its id." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs complete replacement on a payment type's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "put", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint performs partial replacement on a payment type's properties." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "patch", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint deletes a payment type." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the pumps that support the payment type." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "getPumps", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "This endpoint gets the creator of the payment type." }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Success" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentService.prototype, "getCreator", null);
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)("payment"),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map