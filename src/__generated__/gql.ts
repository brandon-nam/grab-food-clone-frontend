/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment RestaurantParts on Restaurant {\n        id\n        name\n        coverImage\n        category {\n            name\n        }\n        address\n    }\n": types.RestaurantPartsFragmentDoc,
    "\n    fragment CategoryParts on Category {\n        id\n        name\n        coverImage\n        slug\n    }\n": types.CategoryPartsFragmentDoc,
    "\n    query me {\n        me {\n            id\n            email\n            role\n            verified\n        }\n    }\n": types.MeDocument,
    "\n    \n    \n    query Category($input: CategoryInput!) {\n        category(input: $input) {\n            ok\n            error\n            totalPages\n            totalCount\n            restaurants {\n                ...RestaurantParts\n            }\n            category {\n                ...CategoryParts\n            }\n        }\n    }\n": types.CategoryDocument,
    "\n    mutation CreateOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            ok\n            error\n            orderId\n        }\n    }\n": types.CreateOrderDocument,
    "\n    query restaurant($input: RestaurantInput!) {\n        restaurant(input: $input) {\n            ok\n            error\n            restaurant {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n                menu {\n                    id\n                    name\n                    price\n                    photo\n                    description\n                    options {\n                        name\n                        extra\n                        choices {\n                            name\n                            extra\n                        }\n                    }\n                }\n            }\n        }\n    }\n": types.RestaurantDocument,
    "\n    query RestaurantsPage($input: AllRestaurantsInput!) {\n        allRestaurants(input: $input) {\n            ok\n            totalPages\n            totalCount\n            restaurants {\n                id\n                name\n                category {\n                    name\n                }\n                address\n                coverImage\n            }\n        }\n        \n        allCategories {\n            ok\n            categories {\n                id\n                name\n                slug\n                coverImage\n            }\n            error\n        }\n    }\n": types.RestaurantsPageDocument,
    "\n    mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n        createAccount(input: $createAccountInput) {\n            ok\n            error\n        }\n    }\n": types.CreateAccountDocument,
    "\n    mutation Login($loginInput: LoginInput!) {\n        login(input: $loginInput) {\n            ok\n            token\n            error\n        }\n    }\n": types.LoginDocument,
    "\n    mutation createRestaurant($input: CreateRestaurantInput!) {\n        createRestaurant(input: $input) {\n            error\n            ok\n        }\n    }\n": types.CreateRestaurantDocument,
    "\n    query MyRestaurants {\n        myRestaurants {\n            ok\n            error\n            restaurants {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n            }\n        }\n    }\n": types.MyRestaurantsDocument,
    "\n    subscription PendingOrders {\n        pendingOrders {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n": types.PendingOrdersDocument,
    "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n                    fragment VerifiedUser on User {\n                        verified\n                    }\n                ": types.VerifiedUserFragmentDoc,
    "\n    query GetOrder($input: GetOrderInput!) {\n        getOrder(input: $input) {\n            ok\n            error\n            order {\n                id\n                orderStatus\n                total\n                driver {\n                    email\n                }\n                customer {\n                    email\n                }\n                restaurant {\n                    name\n                }\n            }\n        }\n    }\n": types.GetOrderDocument,
    "\n    subscription OrderUpdates($input: OrderUpdatesInput!) {\n        orderUpdates(input: $input) {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n": types.OrderUpdatesDocument,
    "\n    mutation EditOrder($input: EditOrderInput!) {\n        editOrder(input: $input) {\n            ok\n            error\n        }\n    }\n": types.EditOrderDocument,
    "\n    mutation editProfile($input: EditProfileInput!) {\n        editProfile(input: $input) {\n            ok\n            error\n        }\n    }\n": types.EditProfileDocument,
    "\n                    fragment EditedUser on User {\n                        verified\n                        email\n                    }\n                ": types.EditedUserFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment RestaurantParts on Restaurant {\n        id\n        name\n        coverImage\n        category {\n            name\n        }\n        address\n    }\n"): (typeof documents)["\n    fragment RestaurantParts on Restaurant {\n        id\n        name\n        coverImage\n        category {\n            name\n        }\n        address\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment CategoryParts on Category {\n        id\n        name\n        coverImage\n        slug\n    }\n"): (typeof documents)["\n    fragment CategoryParts on Category {\n        id\n        name\n        coverImage\n        slug\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query me {\n        me {\n            id\n            email\n            role\n            verified\n        }\n    }\n"): (typeof documents)["\n    query me {\n        me {\n            id\n            email\n            role\n            verified\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    \n    \n    query Category($input: CategoryInput!) {\n        category(input: $input) {\n            ok\n            error\n            totalPages\n            totalCount\n            restaurants {\n                ...RestaurantParts\n            }\n            category {\n                ...CategoryParts\n            }\n        }\n    }\n"): (typeof documents)["\n    \n    \n    query Category($input: CategoryInput!) {\n        category(input: $input) {\n            ok\n            error\n            totalPages\n            totalCount\n            restaurants {\n                ...RestaurantParts\n            }\n            category {\n                ...CategoryParts\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            ok\n            error\n            orderId\n        }\n    }\n"): (typeof documents)["\n    mutation CreateOrder($input: CreateOrderInput!) {\n        createOrder(input: $input) {\n            ok\n            error\n            orderId\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query restaurant($input: RestaurantInput!) {\n        restaurant(input: $input) {\n            ok\n            error\n            restaurant {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n                menu {\n                    id\n                    name\n                    price\n                    photo\n                    description\n                    options {\n                        name\n                        extra\n                        choices {\n                            name\n                            extra\n                        }\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query restaurant($input: RestaurantInput!) {\n        restaurant(input: $input) {\n            ok\n            error\n            restaurant {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n                menu {\n                    id\n                    name\n                    price\n                    photo\n                    description\n                    options {\n                        name\n                        extra\n                        choices {\n                            name\n                            extra\n                        }\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RestaurantsPage($input: AllRestaurantsInput!) {\n        allRestaurants(input: $input) {\n            ok\n            totalPages\n            totalCount\n            restaurants {\n                id\n                name\n                category {\n                    name\n                }\n                address\n                coverImage\n            }\n        }\n        \n        allCategories {\n            ok\n            categories {\n                id\n                name\n                slug\n                coverImage\n            }\n            error\n        }\n    }\n"): (typeof documents)["\n    query RestaurantsPage($input: AllRestaurantsInput!) {\n        allRestaurants(input: $input) {\n            ok\n            totalPages\n            totalCount\n            restaurants {\n                id\n                name\n                category {\n                    name\n                }\n                address\n                coverImage\n            }\n        }\n        \n        allCategories {\n            ok\n            categories {\n                id\n                name\n                slug\n                coverImage\n            }\n            error\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n        createAccount(input: $createAccountInput) {\n            ok\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n        createAccount(input: $createAccountInput) {\n            ok\n            error\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Login($loginInput: LoginInput!) {\n        login(input: $loginInput) {\n            ok\n            token\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation Login($loginInput: LoginInput!) {\n        login(input: $loginInput) {\n            ok\n            token\n            error\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation createRestaurant($input: CreateRestaurantInput!) {\n        createRestaurant(input: $input) {\n            error\n            ok\n        }\n    }\n"): (typeof documents)["\n    mutation createRestaurant($input: CreateRestaurantInput!) {\n        createRestaurant(input: $input) {\n            error\n            ok\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query MyRestaurants {\n        myRestaurants {\n            ok\n            error\n            restaurants {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n            }\n        }\n    }\n"): (typeof documents)["\n    query MyRestaurants {\n        myRestaurants {\n            ok\n            error\n            restaurants {\n                id\n                name\n                coverImage\n                category {\n                    name\n                }\n                address\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription PendingOrders {\n        pendingOrders {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    subscription PendingOrders {\n        pendingOrders {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                    fragment VerifiedUser on User {\n                        verified\n                    }\n                "): (typeof documents)["\n                    fragment VerifiedUser on User {\n                        verified\n                    }\n                "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOrder($input: GetOrderInput!) {\n        getOrder(input: $input) {\n            ok\n            error\n            order {\n                id\n                orderStatus\n                total\n                driver {\n                    email\n                }\n                customer {\n                    email\n                }\n                restaurant {\n                    name\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetOrder($input: GetOrderInput!) {\n        getOrder(input: $input) {\n            ok\n            error\n            order {\n                id\n                orderStatus\n                total\n                driver {\n                    email\n                }\n                customer {\n                    email\n                }\n                restaurant {\n                    name\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription OrderUpdates($input: OrderUpdatesInput!) {\n        orderUpdates(input: $input) {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    subscription OrderUpdates($input: OrderUpdatesInput!) {\n        orderUpdates(input: $input) {\n            id\n            orderStatus\n            total\n            driver {\n                email\n            }\n            customer {\n                email\n            }\n            restaurant {\n                name\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation EditOrder($input: EditOrderInput!) {\n        editOrder(input: $input) {\n            ok\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation EditOrder($input: EditOrderInput!) {\n        editOrder(input: $input) {\n            ok\n            error\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation editProfile($input: EditProfileInput!) {\n        editProfile(input: $input) {\n            ok\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation editProfile($input: EditProfileInput!) {\n        editProfile(input: $input) {\n            ok\n            error\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                    fragment EditedUser on User {\n                        verified\n                        email\n                    }\n                "): (typeof documents)["\n                    fragment EditedUser on User {\n                        verified\n                        email\n                    }\n                "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;