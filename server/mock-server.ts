import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema, MockList } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from "node:path";
import * as fs from "node:fs/promises"
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = path.join(__dirname, "../api");
const typeDefs = await fs.readFile(path.join(apiDir, "api.graphqls"), "utf-8");
const mocks = {
    Author: () => ({
        name: 'John Doe',
    }),
    Book: () => ({
        title: 'My Book',
    })
}
const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({
            typeDefs,
        }),
        mocks,
        preserveResolvers: true,
    }),
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Mock Server listening at: ${url}`)
