import React from 'react';
import { useQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users{
            id
            name
            age
            username
        }
    }
`

const DisplayData = () => {
    const {data, loading} = useQuery(QUERY_ALL_USERS);

    if(loading){
        return <h1>Data loading</h1>
    }

    if(data) {
        console.log(data);
    }
    return (
        <div>
            <h1>User List</h1>
        </div>
    );
};

export default DisplayData;