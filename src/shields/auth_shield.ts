// CustomAuthShield.js

import { Shield, redirectResult } from 'fortjs';
import { PassportAuth } from '../passport_auth';
import { AuthenticateOptions } from 'passport';
import { executeMiddleWare } from '../utils';

export function authShield(strategyName: string | string[], options: AuthenticateOptions) {
    class PassportAuthShield extends Shield {
        async protect() {
            await executeMiddleWare.call(
                this,
                PassportAuth.passport.authenticate(strategyName, options)
            );
        }
    }
    return PassportAuthShield;
}



