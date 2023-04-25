import { RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/mysql";
import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import User from "src/user/entities/user.entity";

@Injectable()
export class ApiAuth implements NestMiddleware {
    constructor(readonly em: EntityManager) { }
    async use(request: Request, response: Response, next: NextFunction) {
        const { api_key } = request.headers;
        const user = await this.em.findOne(User, { api_key });
        if (!user) {
            console.log(false && false);
            if (
                (request.method.toUpperCase() === "POST" && !request.originalUrl.includes("user"))
                ||
                (request.method.toUpperCase() !== "GET" && request.method.toUpperCase() !== "POST")
            )
            {
                throw new NotFoundException();
            }
        }
        next();
    }
}