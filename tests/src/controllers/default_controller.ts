import { UserService } from "@/services/user_service";
import { Controller, viewResult, assign, worker, route, HTTP_METHOD, singleton, textResult, HTTP_STATUS_CODE, guards } from "fortjs";
import { auth } from "fortjs-passport";

export class DefaultController extends Controller {

    @worker()
    @route("/")
    async index(@assign('FortJs') title: string) {
        const data = {
            title: title
        };
        const result = await viewResult('../src/views/default/index.html', data);
        return result;
    }

    @worker(HTTP_METHOD.Get)
    @route("/login")
    async getLoginForm() {
        return viewResult("../src/views/default/login.html");
    }

    @worker(HTTP_METHOD.Post)
    @route("/login")
    @guards(auth.guard())
    async doLogin(@singleton(UserService) service: UserService) {
        return textResult("Logined");
        // const email = this.body.email;
        // const password = this.body.password;
        // const userFromService = service.getUserByEmailAndPassword(email, password);
        // if (userFromService != null) {
        //     this.session.set('email', email);
        //     return textResult(`Welcome ${userFromService.name}`);
        // }
        // else {
        //     return textResult("invalid Login Data", HTTP_STATUS_CODE.BadRequest);
        // }
    }
}