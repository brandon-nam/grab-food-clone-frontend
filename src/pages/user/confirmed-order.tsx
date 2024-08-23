import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import {
    EditOrderMutation,
    EditOrderMutationVariables,
    GetOrderQuery,
    GetOrderQueryVariables,
    OrderStatus,
    OrderUpdatesSubscription,
    UserRole,
} from "../../__generated__/graphql";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { useMe } from "../../hooks/useMe";
import { Button } from "../../components/button";

const GET_ORDER_QUERY = gql`
    query GetOrder($input: GetOrderInput!) {
        getOrder(input: $input) {
            ok
            error
            order {
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
    }
`;

const ORDER_UPDATES_SUBSCRIPTION = gql`
    subscription OrderUpdates($input: OrderUpdatesInput!) {
        orderUpdates(input: $input) {
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

const EDIT_ORDER_MUTATION = gql`
    mutation EditOrder($input: EditOrderInput!) {
        editOrder(input: $input) {
            ok
            error
        }
    }
`;

export const ConfirmedOrder = () => {
    const { data: myData } = useMe();
    const orderId = useParams<{ id: string }>();
    const { data, subscribeToMore } = useQuery<GetOrderQuery, GetOrderQueryVariables>(GET_ORDER_QUERY, {
        variables: {
            input: {
                id: orderId.id ? +orderId.id : 0,
            },
        },
    });

    const [editOrderMutation, { data: editOrderData, loading }] = useMutation<EditOrderMutation, EditOrderMutationVariables>(
        EDIT_ORDER_MUTATION
    );

    useEffect(() => {
        if (data?.getOrder.ok) {
            subscribeToMore({
                document: ORDER_UPDATES_SUBSCRIPTION,
                variables: {
                    input: {
                        id: orderId.id ? +orderId.id : 0,
                    },
                },
                updateQuery: (prev, { subscriptionData: { data } }: { subscriptionData: { data: OrderUpdatesSubscription } }) => {
                    if (!data) {
                        return prev;
                    }
                    return {
                        getOrder: {
                            ...prev.getOrder,
                            order: {
                                ...data.orderUpdates,
                            },
                        },
                    };
                },
            });
        }
    }, [data]);

    const handleEditOrder = (orderStatus: OrderStatus) => {
        editOrderMutation({
            variables: {
                input: {
                    id: orderId.id ? +orderId.id : 0,
                    orderStatus,
                },
            },
        });
    };

    return (
        <div className="w-full h-full">
            <Header transparent={false} />
            <div className="w-full h-full mt-32 flex flex-col items-center">
                <div className="flex flex-col w-1/3 h-1/2 ">
                    <span className="border-b py-10 text-3xl">Order Success!</span>
                    <span className="border-b py-5 ">Prepared by: {data?.getOrder.order?.restaurant.name}</span>
                    <span className="border-b py-5 ">Deliver to: {data?.getOrder.order?.customer?.email}</span>
                    <span className="border-b py-5 ">
                        Driver: {data?.getOrder.order?.driver ? data?.getOrder.order.driver.email : "Not yet"}
                    </span>
                    {myData?.me.role === UserRole.Client && (
                        <span className=" py-5 text-center text-primary">Status: {data?.getOrder.order?.orderStatus}</span>
                    )}
                    {myData?.me.role === UserRole.Owner && (
                        <>
                            {data?.getOrder.order?.orderStatus === OrderStatus.Pending && (
                                <Button
                                    canClick={!loading}
                                    loading={loading}
                                    actionText={"Accept Order"}
                                    onClick={() => {
                                        handleEditOrder(OrderStatus.Cooking);
                                    }}
                                ></Button>
                            )}
                            {data?.getOrder.order?.orderStatus === OrderStatus.Cooking && (
                                <Button
                                    canClick={!loading}
                                    loading={loading}
                                    actionText={"Order cooked"}
                                    onClick={() => {
                                        handleEditOrder(OrderStatus.Cooked);
                                    }}
                                ></Button>
                            )}
                            {data?.getOrder.order?.orderStatus === OrderStatus.Cooked && (
                                <span className=" py-5 text-center text-primary">Status: {data?.getOrder.order?.orderStatus}</span>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
