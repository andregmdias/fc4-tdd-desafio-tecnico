import {UserService} from "../../application/services/user_service";
import {randomUUID} from "node:crypto";
import {User} from "../../domain/entities/user";
import { Request, Response } from "express";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const userName = req.body.name;

            const user = await this.userService.createUser(new User(randomUUID(), userName));

            return res.status(201).json({
                message: "User created successfully"
            });
        } catch (error: any) {
            return res.status(400)
                .json({ message: error.message || "An unexpected error occurred" });
        }
    }
}