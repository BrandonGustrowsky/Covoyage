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
const station_entity_1 = require("../../station/entities/station.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const uuid_1 = require("uuid");
const create_forum_dto_1 = require("../dto/create-forum.dto");
const swagger_1 = require("@nestjs/swagger");
let Forum = class Forum {
    constructor(createForumDto) {
        this.id = (0, uuid_1.v4)();
        this.comments = new core_1.Collection(this);
        this.title = createForumDto.title;
        this.description = createForumDto.description;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, comments: { required: true, type: () => Object, default: new core_1.Collection(this) }, station: { required: true, type: () => require("../../station/entities/station.entity").default }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The id of a forum."
    }),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Forum.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The title of a forum."
    }),
    (0, core_1.Property)({
        length: 256,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Forum.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The description of a forum."
    }),
    (0, core_1.Property)({
        length: 512,
    }),
    __metadata("design:type", String)
], Forum.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Collection<Comment>",
        description: "The comments made on a forum."
    }),
    (0, core_1.OneToMany)({
        entity: () => comment_entity_1.default,
        mappedBy: (comment) => comment.forum,
    }),
    __metadata("design:type", Object)
], Forum.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Station",
        description: "The station a forum was made on."
    }),
    (0, core_1.ManyToOne)({
        entity: () => station_entity_1.default,
        inversedBy: (station) => station.forums,
    }),
    __metadata("design:type", station_entity_1.default)
], Forum.prototype, "station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created the forum."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.forums,
    }),
    __metadata("design:type", user_entity_1.default)
], Forum.prototype, "created_by", void 0);
Forum = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_forum_dto_1.CreateForumDto])
], Forum);
exports.default = Forum;
//# sourceMappingURL=forum.entity.js.map