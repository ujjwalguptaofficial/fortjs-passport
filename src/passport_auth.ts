import passport from 'passport';

export class PassportAuth {

    static passport = passport;

    static init() {

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }


}