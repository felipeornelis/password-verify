import { gql } from "apollo-server";

export const typeDefs = gql`
    type Validation {
        verify: Boolean
        noMatch: [String]!
    }

    input PasswordRules {
        rule: String
        value: Int
    }

    type Query {
        verify(password: String!, rules: [PasswordRules]): Validation!
    }

    input VerifyPasswordInput {
        password: String!
        rules: [PasswordRules]
    }
`