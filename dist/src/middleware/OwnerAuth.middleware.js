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
exports.OwnerAuth = void 0;
const mysql_1 = require("@mikro-orm/mysql");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
let OwnerAuth = class OwnerAuth {
    constructor(em) {
        this.em = em;
    }
    async use(request, response, next) {
        const { api_key } = request.headers;
        const user = await this.em.findOne(user_entity_1.default, { api_key });
        if (request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") {
            if ((user === null || user === void 0 ? void 0 : user.api_key) !== api_key) {
                throw new common_1.NotFoundException();
            }
        }
        console.log("OwnerAuth running");
        next();
    }
};
OwnerAuth = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysql_1.EntityManager])
], OwnerAuth);
exports.OwnerAuth = OwnerAuth;
//# sourceMappingURL=OwnerAuth.middleware.js.map