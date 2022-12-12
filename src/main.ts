import { Password } from "./module/password/password.entity";
import { parseRules } from "./utils/parse-rules";

const input = [
    { rule: 'minDigit', value: 4 },
    { rule: 'minLowercase', value: 2 },
    { rule: 'minUppercase', value: 1 },
    { rule: 'noRepeated', value: 7 },
]

const payload =  parseRules(input)

const password = new Password('32223Axa', payload)

console.log(password.validate())