import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { ItemRoutes } from "../modules/Item/item.routes";

const router = Router();
const moduleRoutes: {
  path: string;
  route: Router;
}[] = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/item",
    route: ItemRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;