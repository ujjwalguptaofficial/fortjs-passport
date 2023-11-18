import { Fort } from 'fortjs';
import passport from 'passport';
import { ExpressWall } from './walls';

export class PassportAuth {

    static passport = passport;

    static init() {

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        // register express wall to allow setting of express property
        Fort.walls.push(ExpressWall);
    }


}