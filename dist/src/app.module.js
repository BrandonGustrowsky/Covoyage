"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const station_module_1 = require("./station/station.module");
const pump_module_1 = require("./pump/pump.module");
const payment_module_1 = require("./payment/payment.module");
const forum_module_1 = require("./forum/forum.module");
const comment_module_1 = require("./comment/comment.module");
const rating_module_1 = require("./rating/rating.module");
const Context_middleware_1 = require("./middleware/Context.middleware");
const ApiAuth_middleware_1 = require("./middleware/ApiAuth.middleware");
const OwnerAuth_middleware_1 = require("./middleware/OwnerAuth.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(Context_middleware_1.MiddlewareContext, ApiAuth_middleware_1.ApiAuth, OwnerAuth_middleware_1.OwnerAuth)
            .exclude({ path: '*', method: common_1.RequestMethod.POST })
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forRoot(),
            user_module_1.UserModule,
            station_module_1.StationModule,
            pump_module_1.PumpModule,
            payment_module_1.PaymentModule,
            forum_module_1.ForumModule,
            comment_module_1.CommentModule,
            rating_module_1.RatingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map