import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);
router.get('/', CowController.getAllCows);
router.get('/:id', CowController.getIndividualCow);
router.delete('/:id', CowController.deleteCow);
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateIndividualCow
);

export const CowRoutes = router;
