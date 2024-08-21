import { gql, useApolloClient, useMutation } from "@apollo/client";
import { VerifyEmailMutation, VerifyEmailMutationVariables } from "../../__generated__/graphql";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";

const VERIFY_EMAIL_MUTATION = gql(`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`);

export const ConfirmEmail = () => {
    const { data: userData } = useMe();
    const client = useApolloClient();
    const navigate = useNavigate(); 

    const [verifyEmail, { loading: verifyingEmail }] = useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(
        VERIFY_EMAIL_MUTATION
    );

    const onCompleted = (data: VerifyEmailMutation) => {
        const {
            verifyEmail: { ok },
        } = data;

        if (ok && userData?.me.id) {
            client.writeFragment({
                id: `User:${userData?.me.id}`,
                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,
                data: {
                    verified: true,
                },
            });
            navigate("/"); 
        }
    };

    useEffect(() => {
        const [_, code] = window.location.href.split("code=");
        verifyEmail({
            variables: {
                input: {
                    code,
                },
            },
            onCompleted: onCompleted
        });
    }, []);
    return (
        <div className="mt-52 flex flex-col items-center justify-center">
            <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
            <h4 className="text-gray-700 text-sm">Please wait, don't close this page...</h4>
        </div>
    );
};
