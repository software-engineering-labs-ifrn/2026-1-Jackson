import { Router } from "express";
import transactionController from "../controllers/transactionController";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth); 

router.post("/", transactionController.create);
router.get("/", transactionController.getAll);
router.delete("/:id", transactionController.delete);

export default router;