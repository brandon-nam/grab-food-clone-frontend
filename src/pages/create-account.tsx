import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "../__generated__";
import { FormError } from "../components/form-error";
import grab from "../images/grab.svg";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CreateAccountMutation, CreateAccountMutationVariables, UserRole } from "../__generated__/graphql";
import { Button } from "../components/button";

const CREATE_ACCOUNT_MUTATION = gql(`
    mutation CreateAccount($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`);

interface IForm {
    email: string;
    password: string;
    role: UserRole;
}

export const CreateAccount = () => {
    const navigate = useNavigate();

    const onCompleted = (data: CreateAccountMutation) => {
        const {
            createAccount: { ok },
        } = data;
        if (ok) {
            navigate("/login", {replace: true});
        }
    };

    const {
        register,
        handleSubmit,
        getValues, 
        formState: { errors, isValid },
    } = useForm<IForm>({ defaultValues: { role: UserRole.Client } });
    const [createAccountMutation, { loading, error, data: createAccountMutationResult }] = useMutation<
        CreateAccountMutation,
        CreateAccountMutationVariables
    >(CREATE_ACCOUNT_MUTATION, {
        onCompleted: onCompleted,
    });

    const onSubmit = () => {
        if (!loading) {
            const { email, password, role } = getValues();
            createAccountMutation({
                variables: {
                    createAccountInput: {
                        email,
                        password,
                        role,
                    },
                },
            });
        }
    };
    return (
        <div className="h-screen flex flex-col items-center">
            <Helmet>
                <title>Grab</title>
            </Helmet>
            <div className="w-full border border-b-slate-950 py-5 px-7">
                <img src={grab} className="w-24"></img>
            </div>
            <div className="bg-white w-full max-w-lg ">
                <h3 className="transition-all duration-300 text-4xl text-left my-10 mt-10 md:mt-40">Create new account</h3>
                <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    ></input>
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 7, message: "Password must be at least 10 characters." },
                        })}
                    ></input>
                    <select className="input" {...register("role", { required: "User role is required" })}>
                        {Object.keys(UserRole).map((role) => (
                            <option>{role}</option>
                        ))}
                    </select>
                    <Button canClick={isValid} loading={loading} actionText="Sign up" onClick={() => true}></Button>
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error} />}
                </form>
                <h3 className="font-bold text-lg "></h3>
            </div>
            <div>
                Already have an account?
                <Link className="text-primary hover:underline" to="/">
                    {" "}
                    Log in now
                </Link>
            </div>
        </div>
    );
};
