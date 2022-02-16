import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

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

const DisplayData = () => {
    const [movieSearched, setMovieSearched] = useState("");
    const [fetchMovie, {data: movieSearchedData, error: movieError}] = useLazyQuery(GET_MOVIE_BY_NAME);

    const {data, loading, error} = useQuery(QUERY_ALL_USERS);
    const {data: movieData } = useQuery(QUERY_ALL_MOVIES);


    if(loading){
        return <h1>Data loading</h1>
    }

    if(error){
        console.log(error)
    }

    if(movieError){
        console.log(movieError)
    }

    return (
        <div>
            <h1 style={mystyle}>USERS</h1>
            {data && 
                data.users.map((user) => {
                    return(
                        <div style={card}>
                            <h1>Name: {user.name}</h1>
                            <h1>Username: {user.username}</h1>
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