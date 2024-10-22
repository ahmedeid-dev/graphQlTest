import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
            login(input: { username: $username, password: $password }) {
            token
            }
        }
            `



// # Welcome to Altair GraphQL Client.
// # You can send your request using CmdOrCtrl + Enter.

// # Enter your graphQL query here.
export const ADD_USER = gql`mutation saveUser($input:UserInput!) {
  saveUser(input:$input){
    id
    username
  }
}
`