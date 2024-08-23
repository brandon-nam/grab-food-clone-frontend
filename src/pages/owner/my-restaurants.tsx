import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { MyRestaurantsQuery, MyRestaurantsQueryVariables, PendingOrdersSubscription } from "../../__generated__/graphql";
import { Link, useNavigate } from "react-router-dom";
import { RestaurantCard } from "../../components/restaurant-card";
import { Header } from "../../components/header";

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

const PENDING_ORDER_SUBSCRIPTION = gql`
    subscription PendingOrders {
        pendingOrders {
            id
            orderStatus
            total
            driver {
                email
            }
            customer {
                email
            }
            restaurant {
                name
            }
        }
    }
`;

export const MyRestaurants = () => {
    const { data, loading, error } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MY_RESTAURANTS_QUERY);
    const { data: pendingOrderData } = useSubscription<PendingOrdersSubscription>(PENDING_ORDER_SUBSCRIPTION);
    const navigate = useNavigate();
    useEffect(() => {
        if (pendingOrderData) {
            navigate(`/confirmed-order/${pendingOrderData?.pendingOrders.id}`);
        }
    }, [pendingOrderData]);

    console.log(error);
    return (
        <div>
            <Header transparent={false} />
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
                <div className="flex flex-wrap w-full h-full md:gap-3 px-3 md:px-5">
                    {data?.myRestaurants.restaurants?.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    );
};
