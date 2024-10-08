import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
    fragment RestaurantParts on Restaurant {
        id
        name
        coverImage
        category {
            name
        }
        address
    }
`;

export const CATEGORY_FRAGMENT = gql`
    fragment CategoryParts on Category {
        id
        name
        coverImage
        slug
    }
`;
