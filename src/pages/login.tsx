import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "../__generated__";
import { FormError } from "../components/form-error";
import grab from "../images/grab.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "../components/button";
import { LoginMutation, LoginMutationVariables } from "../__generated__/graphql";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { TOKEN } from "../constants";

const LOGIN_MUTATION = gql(`
    mutation Login($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`);

interface IForm {
    email: string;
    password: string;
}

export const Login = () => {
    const onCompleted = (data: LoginMutation) => {
        const {
            login: { ok, token },
        } = data;
        if (ok && token) {
            localStorage.setItem(TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    };

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm<IForm>();
    const [loginMutation, { loading, error, data: loginMutationResult }] = useMutation<LoginMutation, LoginMutationVariables>(
        LOGIN_MUTATION,
        {
            onCompleted: onCompleted,
        }
    );

    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
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
                <h3 className="transition-all duration-300 text-4xl text-left my-10 mt-10 md:mt-40">Log In</h3>
                <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
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
                    <Button canClick={isValid} loading={loading} actionText="Log in" onClick={() => true}></Button>
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
                </form>
                <h3 className="font-bold text-lg "></h3>
            </div>
            <div className="text-primary hover:underline">
                <Link to="/create-account">Create new account</Link>
            </div>
        </div>
    );
};
