import React from "react";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import { RestaurantsPageQuery, RestaurantsPageQueryVariables } from "../../__generated__/graphql";
import { Link } from "react-router-dom";
import { RestaurantCard } from "../../components/restaurant-card";

const RESTAURANTS_QUERY = gql(`
    query RestaurantsPage($input: AllRestaurantsInput!) {
        allRestaurants(input: $input) {
            ok
            totalPages
            totalCount
            restaurants {
                id
                name
                category {
                    name
                }
                address
                coverImage
            }
        }
        
        allCategories {
            ok
            categories {
                id
                name
                slug
                coverImage
            }
            error
        }
    }
`);

export const Restaurants = () => {
    const { data, loading, error } = useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page: 1,
            },
        },
    });

    return (
        <div className="max-w-custom-xl mx-auto h-full mt-5 mb-5">
            <div className="w-full h-1/2 px-2 py-2 flex flex-col md:flex-row gap-3">
                {data?.allRestaurants.restaurants?.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

            <span className="w-screen block text-4xl font-bold mb-10">There's something for everyone!</span>
            <div className="w-full h-full flex">
                {data?.allCategories.categories.map((category) => (
                    <div key={category.id} className="w-1/4 h-1/4 px-2 py-2 items-center cursor-pointer">
                        <Link to={`/category/${category.slug}`}>
                            <div
                                className="w-full h-full bg-cover hover:bg-gray-100 rounded-md mb-4"
                                style={{ backgroundImage: `url(${category.coverImage})` }}
                            ></div>
                            <span className="text-center font-bold text-lg">{category.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
