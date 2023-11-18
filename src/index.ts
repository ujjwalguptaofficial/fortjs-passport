import { authGuard } from "./guards/auth_guard";
import { authShield } from "./shields";

export * from "./passport_auth";

export const auth = {
    guard: authGuard,
    shield: authShield
}