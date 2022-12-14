import { parseRules, Rule } from "../../../utils/parse-rules";
import { Password } from "../domain/password.entity";

export class VerifyPasswordService {
    async execute(password: string, rules: Rule[]) {
        const parsedPasswordRules = parseRules(rules);

        const verifyPassword = new Password(password, parsedPasswordRules)

        return verifyPassword.validate()
    }
}