import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, resolvers } from '../module/password/graphql'

export async function main() {
    const app = express();

    const port = 8080;

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

    app.use(
        (error: Error, request: Request, response: Response, next: NextFunction) => {
            if(error instanceof Error) {
                return response.status(400).json(error.message)
            }

            return response.status(500).json(error)
        }
    );

    app.listen(port, () => console.log(`server is running on port ${port}`));
}