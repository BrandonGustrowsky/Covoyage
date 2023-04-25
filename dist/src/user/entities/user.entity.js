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
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const forum_entity_1 = require("../../forum/entities/forum.entity");
const rating_entity_1 = require("../../rating/entities/rating.entity");
const uuid_1 = require("uuid");
const create_user_dto_1 = require("../dto/create-user.dto");
const crypto = require("crypto");
const station_entity_1 = require("../../station/entities/station.entity");
const pump_entity_1 = require("../../pump/entities/pump.entity");
const payment_entity_1 = require("../../payment/entities/payment.entity");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
    constructor(createUserDto) {
        this.id = (0, uuid_1.v4)();
        this.api_key = crypto.randomBytes(16).toString("hex");
        this.stations = new core_1.Collection(this);
        this.pumps = new core_1.Collection(this);
        this.ratings = new core_1.Collection(this);
        this.comments = new core_1.Collection(this);
        this.forums = new core_1.Collection(this);
        this.payment_types = new core_1.Collection(this);
        this.username = createUserDto.username;
        this.email = createUserDto.email;
        this.phone = createUserDto.phone;
        this.password = createUserDto.password;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, api_key: { required: true, type: () => String, default: crypto.randomBytes(16).toString("hex") }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, password: { required: true, type: () => String }, stations: { required: true, type: () => Object, default: new core_1.Collection(this) }, pumps: { required: true, type: () => Object, default: new core_1.Collection(this) }, ratings: { required: true, type: () => Object, default: new core_1.Collection(this) }, comments: { required: true, type: () => Object, default: new core_1.Collection(this) }, forums: { required: true, type: () => Object, default: new core_1.Collection(this) }, payment_types: { required: true, type: () => Object, default: new core_1.Collection(this) } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's id, which is readonly." }),
    (0, core_1.PrimaryKey)({
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's API key, which is readonly." }),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "api_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's username." }),
    (0, core_1.Property)({
        length: 32,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's email." }),
    (0, core_1.Property)({
        length: 256,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's phone #." }),
    (0, core_1.Property)({
        length: 16,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The user's password." }),
    (0, core_1.Property)({
        length: 256,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The stations a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => station_entity_1.default,
        mappedBy: (station) => station.created_by,
    }),
    __metadata("design:type", Object)
], User.prototype, "stations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The pumps a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => pump_entity_1.default,
        mappedBy: (pump) => pump.created_by
    }),
    __metadata("design:type", Object)
], User.prototype, "pumps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The ratings a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => rating_entity_1.default,
        mappedBy: (rating) => rating.created_by,
    }),
    __metadata("design:type", Object)
], User.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The comments a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => comment_entity_1.default,
        mappedBy: (comment) => comment.created_by,
    }),
    __metadata("design:type", Object)
], User.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The forums a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => forum_entity_1.default,
        mappedBy: (forum) => forum.created_by,
    }),
    __metadata("design:type", Object)
], User.prototype, "forums", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The payment types a user has created." }),
    (0, core_1.OneToMany)({
        entity: () => payment_entity_1.default,
        mappedBy: (payment) => payment.created_by
    }),
    __metadata("design:type", Object)
], User.prototype, "payment_types", void 0);
User = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto])
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map