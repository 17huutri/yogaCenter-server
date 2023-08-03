import { Router } from "express";
import * as SlotController from '../controllers/slot.js'
const router = Router();
router.route('/createSlot').post(SlotController.createSlot); // cai nay moi' ne`
router.route('/getSlot/:id').get(SlotController.getAllSlotOfUser); // cai nay moi' ne`
export default router