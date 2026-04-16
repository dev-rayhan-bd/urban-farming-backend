import { Router } from 'express';







const router = Router();

const moduleRoutes = [
  {
    path: '/profile',
    route: require('test').default,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
