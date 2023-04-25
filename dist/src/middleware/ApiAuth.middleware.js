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
exports.ApiAuth = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
let ApiAuth = class ApiAuth {
    constructor(em) {
        this.em = em;
    }
    async use(request, response, next) {
        const { api_key } = request.headers;
        const user = await this.em.findOne(user_entity_1.default, { api_key });
        if (!user) {
            console.log(false && false);
            if ((request.method.toUpperCase() === "POST" && !request.originalUrl.includes("user"))
                ||
                    (request.method.toUpperCase() !== "GET" && request.method.toUpperCase() !== "POST")) {
                throw new common_1.NotFoundException();
            }
        }
        next();
    }
};
ApiAuth = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], ApiAuth);
exports.ApiAuth = ApiAuth;
//# sourceMappingURL=ApiAuth.middleware.js.map