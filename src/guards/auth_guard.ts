import { Guard } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { AuthenticateOptions } from 'passport';
import { executeMiddleWare } from '../utils';

export function authGuard(strategyName: string | string[], options: AuthenticateOptions) {
    class PassportAuthGuard extends Guard {
        async check() {
            await executeMiddleWare.call(
                this,
                PassportAuth.passport.authenticate(strategyName, options)
            );
        }
    }
    return PassportAuthGuard;
}



