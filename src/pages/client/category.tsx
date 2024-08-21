import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables, Restaurant, RestaurantPartsFragment } from "../../__generated__/graphql";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { PageHeading } from "../../components/page-heading";
import { RestaurantCard } from "../../components/restaurant-card";

const CATEGORY_QUERY = gql`
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
    query Category($input: CategoryInput!) {
        category(input: $input) {
            ok
            error
            totalPages
            totalCount
            restaurants {
                ...RestaurantParts
            }
            category {
                ...CategoryParts
            }
        }
    }
`;

export const Category = () => {
    const params = useParams<{ slug: string }>();
    const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY_QUERY, {
        variables: {
            input: {
                page: 1,
                slug: params.slug + "",
            },
        },
    });
    return (
        <div className="w-screen h-screen">
            <Header transparent={false} />
            <PageHeading
                text={
                    <span>
                        Food Promo from Top Restaurants in
                        <span className="text-primary truncate"> Singapore</span>
                    </span>
                }
            />
            {!loading && (
                <div className="flex flex-wrap w-full h-full md:gap-3 max-w-custom-xl mx-auto px-3 md:px-5">
                    {data?.category.restaurants?.map((restaurant) => {
                        const restWithCoverImage = restaurant as {
                            id: number;
                            name: string;
                            coverImage: string;
                            address: string;
                            category?: { name: string } | null;
                        };

                        return <RestaurantCard key={restWithCoverImage.id} restaurant={restWithCoverImage} />;
                    })}
                </div>
            )}
        </div>
    );
};
