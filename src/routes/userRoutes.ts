import { Router } from "express";
import { auth, adminAccess } from "../middleware/auth";

import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    login
} from "../controllers/userController"

const router = Router();

router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.get("/users", adminAccess, getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);

router.post("/login", login)

export default router;