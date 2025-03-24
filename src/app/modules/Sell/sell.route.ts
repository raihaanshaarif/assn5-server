import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SellControllers } from './sell.controller';

const router = express.Router();

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SellControllers.getAllSells
);

// router.get(
//   '/my-offered-courses',
//   // auth(USER_ROLE.student),
//   OfferedCourseControllers.getMyOfferedCourses
// );

router.get(
  '/:id',
  // auth(
  //   USER_ROLE.superAdmin,
  //   USER_ROLE.admin,
  // ),
  SellControllers.getSingleSell
);

router.post(
  '/create-Sell',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  //   validateRequest(SellsValidations.createSell),
  SellControllers.createSell
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  //   validateRequest(SellsValidations.patchSell),
  SellControllers.updateSell
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SellControllers.deleteSellFromDB
);

export const SellRoutes = router;
