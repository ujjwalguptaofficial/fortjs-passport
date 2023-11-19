import { Shield } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { executeMiddleWare, isAuthenticated } from '../utils';
import { IAuthenticationOption } from '../interfaces';


export function authShield(strategyName: string | string[] | "isAuthenticated", options: IAuthenticationOption = {}) {
    if (strategyName === "isAuthenticated") {
        return class IsAuthenticatedShield extends Shield {
            async protect() {
                return isAuthenticated.call(this, options.getUnauthorizedResult);
            }
        } as any as typeof Shield;
    }

    class PassportAuthShield extends Shield {
        async protect() {
            await executeMiddleWare.call(
                this,
                PassportAuth.passport.authenticate(strategyName, options)
            );
        }
    }
    return PassportAuthShield as any as typeof Shield;
}

