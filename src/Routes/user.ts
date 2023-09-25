import { Router } from "express";
import * as  userController from '../Controllers/user';
import user from "../Models/user";

const router = Router();

router.post('/signup',userController.signup);
router.post('/login',userController.login);
export default router;