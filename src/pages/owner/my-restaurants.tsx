import { gql, useQuery } from "@apollo/client";
import React from "react";
import { MyRestaurantsOutput, MyRestaurantsQuery, MyRestaurantsQueryVariables } from "../../__generated__/graphql";
import { Link } from "react-router-dom";
import { RestaurantCard } from "../../components/restaurant-card";

const MY_RESTAURANTS_QUERY = gql`
    query MyRestaurants {
        myRestaurants {
            ok
            error
            restaurants {
                id
                name
                coverImage
                category {
                    name
                }
                address
            }
        }
    }
`;

export const MyRestaurants = () => {
    const { data, loading, error } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MY_RESTAURANTS_QUERY);
    console.log(error);
    return (
        <div>
            <div className="max-w-screen-2xl mx-auto mt-32">
                <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
                {data?.myRestaurants.ok && data.myRestaurants.restaurants?.length === 0 && (
                    <>
                        <h4 className="text-xl mb-5">You have no restaurants.</h4>
                        <Link className="text-lime-600 hover:underline" to="/add-restaurant">
                            Create one &rarr;
                        </Link>
                    </>
                )}
                <div>
                    {data?.myRestaurants.restaurants?.map((restaurant) => (
                        <RestaurantCard restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    );
};
