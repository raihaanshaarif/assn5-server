import express from 'express';
import { ItemControllers } from './item.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ItemsValidations } from './item.validate';

const router = express.Router();

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ItemControllers.getAllItems
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
  ItemControllers.getSingleItem
);

router.post(
  '/create-item',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ItemsValidations.createItem),
  ItemControllers.createItem
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ItemsValidations.patchItem),
  ItemControllers.updateItem
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ItemControllers.deleteItemFromDB
);

export const itemRoutes = router;
