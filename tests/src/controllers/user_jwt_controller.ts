import { Controller, textResult, defaultWorker, jsonResult, HTTP_STATUS_CODE, singleton, shields, validate, http, asBody } from 'fortjs';
import { UserService } from '@/services/user_service';
import { User } from '@/models/user';
import { auth } from 'fortjs-passport';

@shields(
    auth.shield("jwt", { session: false, failureMessage: "Not authenticated" }),
    auth.shield("isAuthenticated")
)
// @shields(AuthenticationShield)
export class UserJWTController extends Controller {

    service: UserService;
    constructor(@singleton(UserService) service: UserService) {
        super();
        this.service = service;

    }

    @http.get("/")
    async getUsers() {
        // const authorization = this.request.headers.authorization;
        // console.log("headers", authorization);
        // const data = jwt.decode(authorization);
        // console.log("data", this.request);
        return jsonResult(this.service.getUsers());
    }

    @http.post("/")
    @validate.body(User)
    async addUser(@asBody user) {
        const newUser = this.service.addUser(user);
        return jsonResult(newUser, HTTP_STATUS_CODE.Created);
    }

    @validate.body(User)
    @http.put("/")
    async updateUser(@asBody user) {
        const userUpdated = this.service.updateUser(user);
        if (userUpdated === true) {
            return textResult("user updated");
        }
        else {
            return textResult("invalid user");
        }

    }

    @http.get("/{id}")
    async getUser() {
        const userId = Number(this.param.id);
        const user = new UserService().getUser(userId);
        if (user == null) {
            return textResult("invalid user id", HTTP_STATUS_CODE.NotFound);
        }
        return jsonResult(user);

    }

    @http.delete("/{id}")
    async removeUser() {
        const userId = Number(this.param.id);
        const user = this.service.getUser(userId);
        if (user != null) {
            this.service.removeUser(userId);
            return textResult("user deleted");
        }
        else {
            return textResult("invalid user id", 404);
        }
    }
}