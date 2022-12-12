import { errors } from "./password.errors";

export interface PasswordRules {
    minSize: number;
    minUppercase: number;
    minLowercase: number;
    minDigit: number;
    minSpecialChars: number;
    noRepeated: number;
}

export class Password {
    private verify: boolean;
    private password: string;
    private noMatch: string[];
    private rules: Partial<PasswordRules>;

    constructor(password: string, rules: Partial<PasswordRules>) {
        this.password = password;
        this.rules = rules;

        this.verify = true;
        this.noMatch = [];
    }

    validate() {
        this.verifyMinSize(this.rules.minSize);
        this.verifyMinUppercase(this.rules.minUppercase);
        this.verifyMinLowercase(this.rules.minLowercase);
        this.verifyMinDigit(this.rules.minDigit);
        this.verifyMinSpecialChars(this.rules.minSpecialChars);
        this.verifyNoRepeated(this.rules.noRepeated);

        return {
            verify: this.verify,
            noMatch: this.noMatch,
        }
    }

    private verifyMinSize(required?: number): void {
        if(required !== undefined && this.password.length < required) {
            this.verify = false;
            this.noMatch.push(errors.minSize)
        }
    }

    private verifyMinUppercase(required?: number): void {
        const regex = /[A-Z]/g;
        const uppercaseChars = this.password.match(regex) || [];

        if(required !== undefined && uppercaseChars.length < required) {
            this.verify = false;
            this.noMatch.push(errors.minUppercase);
        }
    }

    private verifyMinLowercase(required?: number): void {
        const regex = /[a-z]/g;
        const lowercaseChars = this.password.match(regex) || [];

        if(required !== undefined && lowercaseChars.length < required) {
            this.verify = false;
            this.noMatch.push(errors.minLowercase);
        }
    }

    private verifyMinDigit(required?: number): void {
        const regex = /[0-9]/g;
        const digitChars = this.password.match(regex) || [];

        if(required !== undefined && digitChars.length < required) {
            this.verify = false;
            this.noMatch.push(errors.minDigit)
        }
    }

    private verifyMinSpecialChars(required?: number): void {
        const regex = /[!@#$%^&*()-+\/{}[]]/g;
        const specialChars = this.password.match(regex) || [];

        if(required !== undefined && specialChars.length < required) {
            this.verify = false;
            this.noMatch.push(errors.minSpecialChars);
        }
    }

    private verifyNoRepeated(required?: number): void {
        const sequence = required || 0;
        const regex = new RegExp(`(.)\\1{${sequence - 1}}`, "g")
        const repeatedChars = this.password.match(regex) || [];

        if(required !== undefined && repeatedChars.length) {
            this.verify = false;
            this.noMatch.push(errors.noRepeated)
        }
    }
}