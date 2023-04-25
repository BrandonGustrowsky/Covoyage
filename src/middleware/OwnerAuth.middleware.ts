import { RequestContext } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/mysql";
import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import User from "src/user/entities/user.entity";

@Injectable()
export class OwnerAuth implements NestMiddleware {
    constructor(readonly em: EntityManager) { }
    async use(request: Request, response: Response, next: NextFunction) {

        const { api_key } = request.headers;
        // console.log(request.headers);
        // console.log(await this.em.find(User, {}));
        const user = await this.em.findOne(User, { api_key });
        // console.log(user);
        if (request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") {
            if (user?.api_key !== api_key) {
                throw new NotFoundException();
            }
        }
        
        console.log("OwnerAuth running");
        next();
    }
}