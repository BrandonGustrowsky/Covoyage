import { RequestContext } from "@mikro-orm/core";
import { EntityManager, MikroORM } from "@mikro-orm/mysql";
import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import User from "src/user/entities/user.entity";

@Injectable()
export class MiddlewareContext implements NestMiddleware {
    constructor(readonly em: EntityManager) { }
    async use(request: Request, response: Response, next: NextFunction) {
        RequestContext.create(this.em, next);
    }
}
