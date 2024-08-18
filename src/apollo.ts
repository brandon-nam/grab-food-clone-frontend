import { ApolloClient, InMemoryCache, ApolloProvider, gql, makeVar, createHttpLink } from "@apollo/client";
import { TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";


const token = localStorage.getItem(TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

console.log("default isloggedin: ", isLoggedInVar());
console.log("default authToken: ", authTokenVar());

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read(_, { variables }) {
                            return isLoggedInVar();
                        },
                    },
                    authToken: {
                        read(_, { variables }) {
                            return authTokenVar();
                        },
                    },
                },
            },
        },
    }),
});