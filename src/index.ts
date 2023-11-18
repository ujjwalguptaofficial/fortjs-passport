import { authGuard } from "./guards";
import { authShield } from "./shields";

export * from "./passport_auth";

export const auth = {
    guard: authGuard,
    shield: authShield
};