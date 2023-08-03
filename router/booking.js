import { Router } from "express";
import Auth from "../middleware/auth.js";
import * as bookingController from '../controllers/booking.js'
const router = Router();

router.route('/createBooking').post(bookingController.createBooking);
router.route('/getAllBookings').get(bookingController.getAllBookings);
router.route('/deleteBooking/:id').delete(bookingController.deleteBooking);
router.route('/updateBooking/:id').post(bookingController.updateBooking);
router.route('/rejectBooking/:id').post(bookingController.rejectBooking);

router.route('/getBookings').get(bookingController.getStatusBooking);
router.route('/getBookingOfUser/:id').get(bookingController.getBookingOfUser);
router.route('/setPaymentStatus/:id').post(bookingController.setPaymentStatus);

router.route('/waiting').get(bookingController.getAcceptedBookings);
router.route('/rejected').get(bookingController.getRejectedBookings);
router.route('/accepted').get(bookingController.getWaitingBookings);

export default router;