import { MessageBus } from "@/shared/domain/MessageBus";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

export function createUserRoutes(messageBus: MessageBus): Router {
    const router = Router()
    const userController = new UserController(messageBus)

    router.post('/', userController.registerUser.bind(userController))
    router.put('/:userId', userController.updateUser.bind(userController))
    router.get('/:userId', userController.findUser.bind(userController))
    router.get('/', userController.getAllUsers.bind(userController))

    return router
}