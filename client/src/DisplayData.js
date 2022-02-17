import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
};

const card = {
    textAlign: "center",
    color: "white",
    backgroundColor: "grey",
    padding: "20px",
    fontFamily: "Arial",
    fontSize: "11px",
};

const search = {
    margin: "20px",
    padding: "10px",
    backgroundColor: "DodgerBlue",
    color: "white",
    textAlign: "center",
}

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
const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies{
            id
            name
            yearOfPublication
            isInTheaters
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            name
            id
        }
    }
`

const DisplayData = () => {
    // Movies states
    const {data: movieData } = useQuery(QUERY_ALL_MOVIES);

    const [movieSearched, setMovieSearched] = useState("");
    const [fetchMovie, {data: movieSearchedData, error: movieError}] = useLazyQuery(GET_MOVIE_BY_NAME);

    // User states
    const {data, loading, refetch} = useQuery(QUERY_ALL_USERS);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");
    
    const [createUser] = useMutation(CREATE_USER_MUTATION)

    if(loading){
        return <h1>Data loading</h1>
    }

    // if(error){
    //     console.log(error)
    // }

    if(movieError){
        console.log(movieError)
    }

    return (
        <div>
            <div>
                <input type="text" placeholder='Name...' onChange={(event) => {
                    setName(event.target.value);}} />
                <input type="text" placeholder='Username...' onChange={(event) => {
                    setUsername(event.target.value);}} />
                <input type="number" placeholder='Age...' onChange={(event) => {
                    setAge(event.target.value);}} />
                <input type="text" placeholder='Nationality...'onChange={(event) => {
                    setNationality(event.target.value.toUpperCase());}}  />

                <button
                    onClick={() => {
                        createUser({ variables: { input: {name, username, age: Number(age), nationality}}});
                        refetch()
                    }}
                >Create User</button>
            </div>
            
            <h1 style={mystyle}>USERS</h1>
            {data && 
                data.users.map((user) => {
                    return(
                        <div style={card}>
                            <h1>Name: {user.name}</h1>
                            <h1>Username: {user.username}</h1>
                            <h1>Nationality: {user.nationality}</h1>
                            <h1>Age: {user.age}</h1>
                        </div>
                    )
                })
            }

            <h1 style={mystyle}>MOVIES</h1>
            {movieData && 
                movieData.movies.map((movie) => {
                    return(
                        <div style={card}>
                            <h1>Name: {movie.name}</h1>
                            <h1>Year: {movie.yearOfPublication}</h1>
                        </div>
                    )
                })
            }

            <div style={search}>
                <input 
                type="text" 
                placeholder='name a movie...' 
                onChange={(event) => {setMovieSearched(event.target.value);}}/>
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            name: movieSearched,
                        }
                    })
                }}>Fetch Data</button>
                <div>
                    {movieSearchedData && (
                        <div>
                            {" "}<h1>Movie: {movieSearchedData.movie.name}</h1>{" "}
                            {" "}<h1>Year: {movieSearchedData.movie.yearOfPublication}</h1>{" "}
                        </div>
                    )}
                    {movieError && <h1>There was an error fetching the data</h1>}
                </div>
            </div>
        </div>
    );
};

export default DisplayData;


