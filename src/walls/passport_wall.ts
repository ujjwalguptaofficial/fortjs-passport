import { HttpResult, Wall, redirectResult } from "fortjs";
import passport from "passport";

// const defaultUserProperty = "user";
// const defaultSessionProperty = passport['_key'] || "passport";

/**
 * Set property related to express framework
 *
 * @export
 * @class ExpressWall
 * @extends {Wall}
 */
export class ExpressWall extends Wall {

    async createExpressSession() {
        const session = this.session;
        const sessionData = await session.getAll();
        const promises = [];
        const expressSession = {
            async save(callback) {
                console.log("save called", sessionData);
                // for (const key in sessionData) {
                //     promises.push(
                //         session.set(key, sessionData[key])
                //     );
                // }
                try {
                    await Promise.all(promises);
                    callback(null);
                } catch (error) {
                    callback(error);
                }
            },
            async regenerate(callback) {
                await session.clear();
                callback(null);
            },
            async destroy(callback) {
                await expressSession.regenerate(callback);
            }
        }

        return new Proxy(expressSession, {
            get(target, p, receiver) {
                console.log("get session p", p, receiver)
                switch (p) {
                    case "regenerate":
                    case "save":
                        return Reflect.get(target, p, receiver);
                }
                return sessionData[p as string];
            },
            set(target, p, newValue, receiver) {
                sessionData[p as string] = newValue;
                console.log("set session p", p);
                promises.push(
                    session.set(p as string, newValue)
                );
                // session.set(p as string, newValue);
                return true;
            }
        });
    }

    async onIncoming(): Promise<void | HttpResult> {
        const wall = this;
        const expressSession = await this.createExpressSession();
        Object.assign(this.request, {
            session: expressSession,
            get body() {
                return wall['componentProp_'].body;
            },
            redirect(url) {
                return redirectResult(url);
            }
        });
    }
}