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
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const rating_entity_1 = require("../../rating/entities/rating.entity");
const forum_entity_1 = require("../../forum/entities/forum.entity");
const pump_entity_1 = require("../../pump/entities/pump.entity");
const create_station_dto_1 = require("../dto/create-station.dto");
const user_entity_1 = require("../../user/entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
let Station = class Station {
    constructor(createStationDto) {
        this.id = (0, uuid_1.v4)();
        this.ratings = new core_1.Collection(this);
        this.forums = new core_1.Collection(this);
        this.pumps = new core_1.Collection(this);
        this.name = createStationDto.name;
        this.location = createStationDto.location;
        this.restroom_count = createStationDto.restroom_count;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, name: { required: true, type: () => String }, location: { required: true, type: () => String }, restroom_count: { required: true, type: () => Number }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default }, ratings: { required: true, type: () => Object, default: new core_1.Collection(this) }, forums: { required: true, type: () => Object, default: new core_1.Collection(this) }, pumps: { required: true, type: () => Object, default: new core_1.Collection(this) } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The id of a station."
    }),
    (0, core_1.PrimaryKey)({
        length: 64,
    }),
    __metadata("design:type", String)
], Station.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The name of a station."
    }),
    (0, core_1.Property)({
        length: 256,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Station.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The location of a station."
    }),
    (0, core_1.Property)({
        length: 256,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Station.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The number of restrooms in a station."
    }),
    (0, core_1.Property)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Station.prototype, "restroom_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created the station."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.stations,
    }),
    __metadata("design:type", user_entity_1.default)
], Station.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Rating",
        description: "The ratings given on a station."
    }),
    (0, core_1.OneToMany)({
        entity: () => rating_entity_1.default,
        mappedBy: (rating) => rating.station,
    }),
    __metadata("design:type", Object)
], Station.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Forum",
        description: "The forums under a station."
    }),
    (0, core_1.OneToMany)({
        entity: () => forum_entity_1.default,
        mappedBy: (forum) => forum.station,
    }),
    __metadata("design:type", Object)
], Station.prototype, "forums", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Pump",
        description: "The pumps at a station."
    }),
    (0, core_1.OneToMany)({
        entity: () => pump_entity_1.default,
        mappedBy: (pump) => pump.station,
    }),
    __metadata("design:type", Object)
], Station.prototype, "pumps", void 0);
Station = __decorate([
    (0, core_1.Entity)(),
    (0, core_1.Unique)({
        properties: ['location'],
    }),
    __metadata("design:paramtypes", [create_station_dto_1.CreateStationDto])
], Station);
exports.default = Station;
//# sourceMappingURL=station.entity.js.map