import { Controller, viewResult, assign, textResult, guards, http } from "fortjs";
import { auth } from "fortjs-passport";

export class DefaultController extends Controller {

    @http.get("/login")
    async getLoginForm() {
        return viewResult("../src/views/default/login.html");
    }

    @http.post("/login")
    // apply local guard which will handle the login and pass user in the method
    @guards(auth.guard('local'))
    async doLogin() {
        const { user } = this.request as any;
        return textResult(`Welcome ${user.name}`);
    }
}