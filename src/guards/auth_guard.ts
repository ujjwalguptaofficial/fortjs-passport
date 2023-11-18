import { Guard, HTTP_STATUS_CODE, textResult } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { AuthenticateOptions } from 'passport';
import { executeMiddleWare } from '../utils';

export function authGuard(strategyName: string | string[], options?: AuthenticateOptions) {
    if (strategyName === "isAuthenticated") {
        return class IsAuthenticatedGuard extends Guard {
            async check() {
                const user = this.request['user'];
                if (user == null) {
                    return textResult("Unauthorized", HTTP_STATUS_CODE.Unauthorized);
                }
                this.data.user = user;
            }
        }
    }
    class PassportAuthGuard extends Guard {
        async check() {
            this.request['body'] = this.body;
            await executeMiddleWare.call(
                this,
                PassportAuth.passport.authenticate(strategyName, options)
            );
        }
    }
    return PassportAuthGuard as any as typeof Guard;
}



