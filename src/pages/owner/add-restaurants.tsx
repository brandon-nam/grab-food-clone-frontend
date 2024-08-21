import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { CreateRestaurantMutation, CreateRestaurantMutationVariables } from "../../__generated__/graphql";

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
        createRestaurant(input: $input) {
            error
            ok
        }
    }
`;

interface IFormProps {
    name: string;
    address: string;
    categoryName: string;
}

export const AddRestaurant = () => {
    const [createRestaurantMutation, { loading, data }] = useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(
        CREATE_RESTAURANT_MUTATION
    );
    const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
        mode: "onChange",
    });
    const onSubmit = () => {
        console.log(getValues());
    };
    return (
        <div className="container">
            <Helmet>
                <title>Add Restaurant | Nuber Eats</title>
            </Helmet>
            <h1>Add Restaurant</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required." })}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Address"
                    {...register("address", { required: "Address is required." })}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Category Name"
                    {...register("categoryName", { required: "Category Name is required." })}
                />
                <Button loading={loading} canClick={formState.isValid} actionText="Create Restaurant" onClick={function (): void {
                    throw new Error("Function not implemented.");
                } } />
            </form>
        </div>
    );
};
