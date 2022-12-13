import { Rule } from "../../../utils/parse-rules";
import { VerifyPasswordService } from "../service/verify-password.service"

const verifyPasswordService = new VerifyPasswordService();

interface QueryVerifyArgs {
    password: string;
    rules: Rule[];
}

export const resolvers = {
    Query: {
        verify: (obj: any, args: QueryVerifyArgs, context: any, info: any) => {
            return verifyPasswordService.execute(args.password, args.rules)
        }
    }
}