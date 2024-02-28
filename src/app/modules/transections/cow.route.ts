import express from 'express';
import { TransactionController } from './cow.controller';

const router = express.Router();

router.post('/send-money', TransactionController.sendMoney);
router.post('/cash-out', TransactionController.cashOut);
router.post('/cash-in', TransactionController.cashIn);
router.post('/request-cash', TransactionController.requestCash);
router.post(
  '/approved-cash-request',
  TransactionController.approvedRequestCash
);
router.get('/', TransactionController.getAllTnx);
// router.get('/:id', CowController.getIndividualCow);
// router.delete('/:id', CowController.deleteCow);
// router.patch(
//   '/:id',
//   validateRequest(CowValidation.updateCowZodSchema),
//   CowController.updateIndividualCow
// );

export const TransactionRoutes = router;
