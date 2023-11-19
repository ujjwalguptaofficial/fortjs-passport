import { DefaultController } from "@/controllers/default_controller";
import { ParentRoute } from "fortjs";
import { UserController } from "@/controllers/user_controller";
import { UserJWTController } from "./controllers/user_jwt_controller";

export const routes: ParentRoute[] = [
    {
        path: "/*",
        controller: DefaultController
    },
    {
        path: "/user",
        controller: UserController
    },
    {
        path: "/user-jwt",
        controller: UserJWTController
    }
];