import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql` query    {
    listUsers(input: { active: true }) {
        paginatorInfo {
        total
        }
        data {
        id
        username
        account {
            __typename
        }
        }
    }
    }`;


export const GET_USER = gql`
    query user($id: Int!) {
        user(id: $id) {
            id
            username
        }
    }
`;
export const GET_ROLES = gql`query{
    listRolesDropdown{
        code
        id
        name
    }
    }`

export const GET_CUSTOMERS = gql`
        query{
    listCustomersDropdown{
        code
        id
        name
    }
}`
export const GET_AGENTS = gql`
    query{
    listDeliveryAgentsDropdown{
        code
        id
        name
    }
    }`