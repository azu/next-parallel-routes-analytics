import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "./api/api.graphqls",
    documents: "./api/query.graphql",
    generates: {
        "./api/gql/": {
            preset: 'client'
        }
    }
};

export default config;
