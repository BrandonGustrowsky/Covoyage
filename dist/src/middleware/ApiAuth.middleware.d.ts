import { EntityManager } from "@mikro-orm/mysql";
import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class ApiAuth implements NestMiddleware {
    readonly em: EntityManager;
    constructor(em: EntityManager);
    use(request: Request, response: Response, next: NextFunction): Promise<void>;
}
