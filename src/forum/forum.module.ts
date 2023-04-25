import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ForumService } from './forum.service'
import { ForumController } from './forum.controller'

@Module({
    controllers: [ForumController],
    providers: [ForumService],
})
export class ForumModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
