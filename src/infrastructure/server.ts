import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs, resolvers } from '../module/password/graphql'

export async function main() {
    const app = express();

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

    app.listen(4001, () => console.log('server is running'));
}