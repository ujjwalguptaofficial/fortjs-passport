import { Guard, HTTP_STATUS_CODE, textResult } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { executeMiddleWare } from '../utils';
import { IAuthenticationOption } from '../interfaces';

export function authGuard(strategyName: string | string[], options?: IAuthenticationOption) {
    if (strategyName === "isAuthenticated") {
        return class IsAuthenticatedGuard extends Guard {
            async check() {
                const user = this.request['user'];
                if (user == null) {
                    if (user == null) {
                        return options.getUnauthorizedResult() || textResult("Unauthorized", HTTP_STATUS_CODE.Unauthorized);
                    }
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



