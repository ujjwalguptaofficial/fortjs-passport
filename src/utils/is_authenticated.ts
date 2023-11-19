import { Controller, HTTP_STATUS_CODE, IHttpResult, textResult } from "fortjs";

export function isAuthenticated(this: Controller, getUnauthorizedResult: () => IHttpResult) {
    const user = this.request['user'];
    if (user == null) {
        return getUnauthorizedResult ? getUnauthorizedResult() : textResult("Not authenticated", HTTP_STATUS_CODE.Unauthorized);
    }
    this.data.user = user;
}