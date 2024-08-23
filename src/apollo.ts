import { ApolloClient, InMemoryCache, ApolloProvider, gql, makeVar, createHttpLink, split } from "@apollo/client";
import { TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { CreateOrderItemInput } from "./__generated__/graphql";
import { DisplayedItem } from "./components/cart";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';


const token = localStorage.getItem(TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const orderItemsVar = makeVar<CreateOrderItemInput[]>([]);
export const displayedItemsVar = makeVar<DisplayedItem[]>([]);
export const orderPriceVar = makeVar<number>(0);
export const restaurantIdVar = makeVar<number>(0);

const wsLink = new GraphQLWsLink(
    createClient({
        url: process.env.NODE_ENV === "production" ? "wss://grab-food-clone-669051cc17fe.herokuapp.com/graphql": "ws://localhost:4000/graphql",
        connectionParams: {
            "X-JWT": authTokenVar() || ""
        },
    })
);

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === "production"? "https://grab-food-clone-669051cc17fe.herokuapp.com/graphql" : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    authLink.concat(httpLink)
);

export default new ApolloClient({
    link: splitLink,
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
                    orderItems: {
                        read(_, { variables }) {
                            return orderItemsVar();
                        },
                    },
                    displayedItems: {
                        read(_, { variables }) {
                            return displayedItemsVar();
                        },
                    },
                    orderPrice: {
                        read(_, { variables }) {
                            return orderPriceVar();
                        },
                    },
                    restaurantId: {
                        read(_, { variables }) {
                            return restaurantIdVar();
                        },
                    },
                },
            },
        },
    }),
});
