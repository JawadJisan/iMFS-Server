import express from 'express';
import { NotificationController } from './notification.controller';
const router = express.Router();

// router.post('/send-money', NotificationController.sendMoney);

// router.get('/', CowController.getAllCows);

router.get('/', NotificationController.getNotification);

// router.delete('/:id', CowController.deleteCow);
// router.patch(
//   '/:id',
//   validateRequest(CowValidation.updateCowZodSchema),
//   CowController.updateIndividualCow
// );

export const NotificationRoutes = router;
