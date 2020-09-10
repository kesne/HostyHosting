import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { InvitedMember_OrganizationInvite$key } from './__generated__/InvitedMember_OrganizationInvite.graphql';
import { InvitedMemberRemoveMutation } from './__generated__/InvitedMemberRemoveMutation.graphql';
import IconButton from '../../ui/IconButton';

type Props = {
    invite: InvitedMember_OrganizationInvite$key;
};

export default function InvitedMember({ invite }: Props) {
    const [commit, isInFlight] = useMutation<InvitedMemberRemoveMutation>(graphql`
        mutation InvitedMemberRemoveMutation($id: ID!) {
            removeInvite(id: $id) {
                id @deleteRecord
            }
        }
    `);

    const data = useFragment(
        graphql`
            fragment InvitedMember_OrganizationInvite on OrganizationInvite {
                id
                name
                permission
                email
            }
        `,
        invite,
    );

    return (
        <li className="px-4 sm:px-6 py-4 relative">
            <div className="flex justify-between items-center space-x-2">
                <div className="flex-1 min-w-0 relative">
                    <div className="flex items-center space-x-2">
                        <div className="text-sm leading-5 font-medium text-gray-900 truncate">
                            {data.name}
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800">
                            {data.permission}
                        </span>
                    </div>
                    <div className="text-sm leading-5 text-gray-500 truncate">{data.email}</div>
                </div>
                <div>
                    <IconButton
                        disabled={isInFlight}
                        onClick={() => {
                            commit({ variables: { id: data.id } });
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </li>
    );
}
