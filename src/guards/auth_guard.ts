import { Guard } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { executeMiddleWare, isAuthenticated } from '../utils';
import { IAuthenticationOption } from '../interfaces';

export function authGuard(strategyName: string | string[], options: IAuthenticationOption = {}) {
    if (strategyName === "isAuthenticated") {
        return class IsAuthenticatedGuard extends Guard {
            async check() {
                return isAuthenticated.call(this, options.getUnauthorizedResult);
            }
        } as any as typeof Guard
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



