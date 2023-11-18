import { Guard, HTTP_STATUS_CODE, Shield, textResult } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { AuthenticateOptions } from 'passport';
import { executeMiddleWare } from '../utils';

export function authShield(strategyName: string | string[] | "isAuthenticated", options?: AuthenticateOptions) {
    if (strategyName === "isAuthenticated") {
        return class IsAuthenticatedShield extends Shield {
            async protect() {
                const user = this.request['user'];
                if (user == null) {
                    return textResult("Unauthorized", HTTP_STATUS_CODE.Unauthorized);
                }
                this.data.user = user;
            }
        }
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



