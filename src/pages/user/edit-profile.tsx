import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { EditProfileMutation, EditProfileMutationVariables } from "../../__generated__/graphql";
import { useForm } from "react-hook-form";

const EDIT_PROFILE_MUTATION = gql(`
    mutation editProfile($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
        }
    }
`);

interface IFormProps {
    email?: string;
    password?: string;
}

export const EditProfile = () => {
    const { data: userData } = useMe();
    const client = useApolloClient(); 
    const onCompleted = (data: EditProfileMutation) => {
        const {
            editProfile: { ok },
        } = data;
        if (ok && userData?.me.email) {
            client.writeFragment({
                id: `User:${userData.me.id}`,
                fragment: gql`
                    fragment EditedUser on User {
                        verified
                        email
                    }
                `,
                data: {
                    verified: false, 
                    email: userData.me.email
                }
            })
        }
    };

    const [editProfile, { loading }] = useMutation<EditProfileMutation, EditProfileMutationVariables>(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });

    const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
        defaultValues: {
            email: userData?.me.email,
        },
    });

    const onSubmit = () => {
        const { email, password } = getValues();
        editProfile({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password }),
                },
            },
        });
    };

    return (
        <div className="mt-52 flex flex-col justify-center items-center">
            <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
            <form className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input className="input" type="email" placeholder="Email" {...register("email")}/>
                <input className="input" type="password" placeholder="Password" {...register("password")}/>
                <Button
                    loading={loading}
                    canClick={!loading}
                    actionText="Save Profile"
                    onClick={() => {
                        return;
                    }}
                />
            </form>
        </div>
    );
};
