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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const forum_entity_1 = require("../../forum/entities/forum.entity");
const rating_entity_1 = require("../../rating/entities/rating.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const create_comment_dto_1 = require("../dto/create-comment.dto");
const swagger_1 = require("@nestjs/swagger");
let Comment = Comment_1 = class Comment {
    constructor(createCommentDto) {
        this.ratings = new core_1.Collection(this);
        this.children = new core_1.Collection(this);
        this.contents = createCommentDto.contents;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, contents: { required: true, type: () => String }, ratings: { required: true, type: () => Object, default: new core_1.Collection(this) }, created_by: { required: true, type: () => require("../../user/entities/user.entity").default }, forum: { required: true, type: () => require("../../forum/entities/forum.entity").default }, children: { required: true, type: () => Object, default: new core_1.Collection(this) }, parent: { required: false, type: () => require("./comment.entity").default } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "number",
        description: "The id of a comment."
    }),
    (0, core_1.PrimaryKey)({
        autoincrement: true,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "The actual text of the comment."
    }),
    (0, core_1.Property)({
        length: 2048,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Comment.prototype, "contents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Collection<Rating>",
        description: "The ratings a comment has on itself."
    }),
    (0, core_1.OneToMany)({
        entity: () => rating_entity_1.default,
        mappedBy: (rating) => rating.comment,
    }),
    __metadata("design:type", Object)
], Comment.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "User",
        description: "The user who created the comment."
    }),
    (0, core_1.ManyToOne)({
        entity: () => user_entity_1.default,
        inversedBy: (user) => user.comments,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", user_entity_1.default)
], Comment.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Forum",
        description: "The forum a comment was posted on."
    }),
    (0, core_1.ManyToOne)({
        entity: () => forum_entity_1.default,
        inversedBy: (forum) => forum.comments,
    }),
    __metadata("design:type", forum_entity_1.default)
], Comment.prototype, "forum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Collection<Comment>",
        description: "The children comments of the current comment."
    }),
    (0, core_1.OneToMany)({
        entity: () => Comment_1,
        mappedBy: comment => comment.parent
    }),
    __metadata("design:type", Object)
], Comment.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "Comment",
        description: "The parent comment of the current comment.",
        required: false,
    }),
    (0, core_1.ManyToOne)({
        entity: () => Comment_1,
        inversedBy: comment => comment.children,
        nullable: true,
    }),
    __metadata("design:type", Comment)
], Comment.prototype, "parent", void 0);
Comment = Comment_1 = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto])
], Comment);
exports.default = Comment;
//# sourceMappingURL=comment.entity.js.map