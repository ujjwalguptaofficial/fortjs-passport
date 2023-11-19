import { IHttpResult } from "fortjs";
import { AuthenticateOptions } from "passport";

export interface IAuthenticationOption extends AuthenticateOptions {
    getUnauthorizedResult?: () => IHttpResult;
}