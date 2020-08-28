
import { Router, Response, Request, NextFunction } from 'express';
import { userController } from '../../controllers';
import {authenticationFilter} from "../../middlewares/authentication";

const router: Router = Router();

const auth = (req: Request, res: Response, next: any) => authenticationFilter.handle(req, res, next); 

router.post("/sign-up", async (req: Request, res: Response, next: NextFunction) => userController.signUp(req, res, next));
router.post("/sign-in", async (req: Request, res: Response, next:any) => userController.signIn(req, res, next));
router.get("/", auth , async (req: Request, res: Response, next:any) => userController.findLoggedUser(req, res, next));

export default router;
