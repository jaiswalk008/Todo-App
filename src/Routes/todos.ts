import { Router } from "express";
import * as todosController from '../Controllers/todo';
import authenticate from "../middleware/auth";
const router = Router();
router.get('/getTodos',authenticate,todosController.getTodos);
router.post('/addTodo',authenticate,todosController.addTodo);
router.delete('/delete',todosController.deleteTodo);
router.post('/update',todosController.updateTodo);
export default router;