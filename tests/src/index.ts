import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { PassportAuth } from "fortjs-passport";
import { Strategy } from 'passport-local';
import { db } from "./services/user_service";

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];

    Fort.routes = routes;
    PassportAuth.init();
    PassportAuth.passport.use('local', new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, done) {
            console.log("userid", email, password);
            const user = db.users.find(user => user.emailId === email);
            if (!user) { return done(null, false); }
            if (user.password !== password) { return done(null, false); }
            console.log("successfull");
            return done(null, user);
        }
    ));
    await Fort.create();
    process.env.APP_URL = `http://localhost:${Fort.port}`;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

