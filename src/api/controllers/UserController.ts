import { RegisterUserCommand } from "@/modules/users/application/commands/RegisterUserCommand";
import { UpdateUserCommand } from "@/modules/users/application/commands/UpdateUserCommand";
import { FindUserQuery } from "@/modules/users/application/queries/FindUserQuery";
import { GetAllUsersQuery } from "@/modules/users/application/queries/GetAllUsersQuery";
import { MessageBus } from "@/shared/domain/MessageBus";
import { Request, Response } from "express";
import { v4 } from "uuid";

export class UserController {
    constructor(private messageBus: MessageBus) {}

    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, name } = req.body

            if (!email || !name) {
                res.status(400).json({error: "Email and name are required"})
                return
            }

            const userId = v4()
            const command = new RegisterUserCommand(v4(), userId, email, name)

            await this.messageBus.executeCommand(command)

            res.status(201).json({
                message: "User created succesfully"
            })
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const { name } = req.body

            if (!name) {
                res.status(400).json({error: "Name is required"})
                return
            }

            const command = new UpdateUserCommand(v4(), userId, name)

            await this.messageBus.executeCommand(command)

            res.status(200).json({
                message: "User updated succesfully"
            })
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }

    async findUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params

            const query = new FindUserQuery(v4(), userId)

            const user = await this.messageBus.executeQuery(query)

            if (!user) {
                res.status(404).json({error: `User with id ${userId} not found`})
                return
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const query = new GetAllUsersQuery(v4())

            const users = await this.messageBus.executeQuery(query)

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Unknown error"
            })
        }
    }
}