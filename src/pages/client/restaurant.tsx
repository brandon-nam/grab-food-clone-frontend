import React from "react";
import { Header } from "../../components/header";
import { PageHeading } from "../../components/page-heading";
import { gql } from "../../__generated__";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { RestaurantQuery, RestaurantQueryVariables } from "../../__generated__/graphql";

const RESTAURANT_QUERY = gql(`
    query restaurant($input: RestaurantInput!) {
        restaurant(input: $input) {
            ok
            error
            restaurant {
                name
                address
                category {
                    name 
                }
            }
        }
    }
`);

export const Restaurant = () => {
    const params = useParams<{ id: string }>();
    const restaurantId = params.id ? +params.id : 0;

    const { data, loading, error } = useQuery<RestaurantQuery, RestaurantQueryVariables>(RESTAURANT_QUERY, {
        variables: {
            input: {
                id: restaurantId,
            },
        },
    });
    const restaurantData = data?.restaurant.restaurant;

    return (
        <>
            <Header transparent={false} />
            <div>
                <PageHeading text={restaurantData?.name} />
                <h2 className="w-full max-w-custom-xl mx-auto px-3 md:px-5 mb-3">{restaurantData?.category?.name}</h2>
                <h2 className="w-full max-w-custom-xl mx-auto px-3 md:px-5">{restaurantData?.address}</h2>
            </div>
        </>
    );
};
