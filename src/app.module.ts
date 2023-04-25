import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { UsersModule } from './old_users/users.module'÷
import { UserModule } from './user/user.module'
import { StationModule } from './station/station.module'
import { PumpModule } from './pump/pump.module'
import { PaymentModule } from './payment/payment.module'
import { ForumModule } from './forum/forum.module'
import { CommentModule } from './comment/comment.module'
import { RatingModule } from './rating/rating.module'
import { MiddlewareContext } from './middleware/Context.middleware'
import { ApiAuth } from './middleware/ApiAuth.middleware'
import { CommentController } from './comment/comment.controller'
import { ForumController } from './forum/forum.controller'
import { PaymentController } from './payment/payment.controller'
import { PumpController } from './pump/pump.controller'
import { RatingController } from './rating/rating.controller'
import { StationController } from './station/station.controller'
import { UserController } from './user/user.controller'
import { OwnerAuth } from './middleware/OwnerAuth.middleware'

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        UserModule,
        StationModule,
        PumpModule,
        PaymentModule,
        ForumModule,
        CommentModule,
        RatingModule,
    ], //Any logic included from another module hahaha thats so funny
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        // Middleware video https://www.youtube.com/watch?v=kz59XWSjyvI
        // to prevent the middleware from running on a route use the .exclude() method
        // Apply the forum middleware for all routes in the ForumController
        consumer
        .apply(MiddlewareContext, ApiAuth, OwnerAuth)
        .exclude(
            { path: '*', method: RequestMethod.POST}
            // { path: "comment/create", method: RequestMethod.POST },
            // { path: "forum/create", method: RequestMethod.POST },
            // { path: "payment/create", method: RequestMethod.POST },
            // { path: "pump/create", method: RequestMethod.POST },
            // { path: "rating/create", method: RequestMethod.POST },
            // { path: "station/create", method: RequestMethod.POST },
            // { path: "user/create", method: RequestMethod.POST }
        )
        .forRoutes('*');
        // consumer.apply(MiddlewareContext, ApiAuth, OwnerAuth).exclude(
        //     { path: "comment/create", method: RequestMethod.POST },
        //     { path: "forum/create", method: RequestMethod.POST },
        //     { path: "/payment/create", method: RequestMethod.POST },
        //     { path: "/pump/create", method: RequestMethod.POST },
        //     { path: "/rating/create", method: RequestMethod.POST },
        //     { path: "/station/create", method: RequestMethod.POST },
        //     { path: "user/create", method: RequestMethod.POST }
        // )

        // To apply a middleware for specific routes only, use this syntax inside the .forRoutes() method:
        // {
        //    path: "forum/",
        //   method: RequestMethod.GET,
        // }
    }
}
