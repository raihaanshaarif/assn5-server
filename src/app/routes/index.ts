import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { itemRoutes } from '../modules/Item/item.router';
import { SellRoutes } from '../modules/Sell/sell.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/item',
    route: itemRoutes,
  },
  {
    path: '/sell',
    route: SellRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
