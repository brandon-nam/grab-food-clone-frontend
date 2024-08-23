import { gql, useMutation, useQuery } from "@apollo/client";
import { displayedItemsVar, orderItemsVar, orderPriceVar, restaurantIdVar } from "../../apollo";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import emptyCart from "../../images/empty-cart.svg";
import { CreateOrderMutation, CreateOrderMutationVariables } from "../../__generated__/graphql";
import { useNavigate } from "react-router-dom";

const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            ok
            error
            orderId
        }
    }
`;

export const OrderReview = () => {
    const navigate = useNavigate(); 
    const orderItem = orderItemsVar();
    const displayedItem = displayedItemsVar();
    const totalPrice = orderPriceVar();

    const [createOrderMutation, { loading, data }] = useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
        CREATE_ORDER_MUTATION,
        {
            variables: {
                input: {
                    restaurantId: restaurantIdVar(),
                    createOrderInput: orderItem,
                },
            },
        }
    );

    const handleClick = async () => {
        const { data } = await createOrderMutation(); 
        navigate(`/confirmed-order/${data?.createOrder.orderId}`); 
        orderItemsVar([]);
        displayedItemsVar([]);
        orderPriceVar(0);
    }

    return (
        <div className="w-full h-full">
            <Header transparent={false} />
            <div className="mt-20">
                {displayedItem.length !== 0 && (
                    <div>
                        {displayedItem?.map((displayedItem) => (
                            <div className="flex flex-row">
                                <div>
                                    <img src={displayedItem.coverImage} />
                                </div>
                                <div className="flex flex-col">
                                    <h1>{displayedItem.dish}</h1>
                                    {displayedItem.options?.map((option) => {
                                        if (option.option) {
                                            return <h1>{option.option}</h1>;
                                        } else {
                                            return <h1>{option.name}</h1>;
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                        <span>Total Price: {totalPrice}</span>
                        <Button canClick={true} loading={false} actionText={"Check out"} onClick={handleClick}></Button>
                    </div>
                )}
                {displayedItem.length === 0 && (
                    <div className="text-center w-full flex flex-col justify-center">
                        <div className="flex w-full justify-center">
                            <img src={emptyCart} className="mt-5 w-1/2" />
                        </div>
                        <h1 className="text-2xl">Start grabbing food!</h1>
                        <h2 className="text-xs text-gray-400">Add items to your basket and place order here.</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
