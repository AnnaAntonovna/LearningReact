import React from 'react';
import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';

import SearchIcon from './search.svg';


const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=262c42f7';//'http://www.omdbapi.com?apikey=262c42f7';

const movie1 = {
    "Title": "Sunrise",
    "Year": "2000–",
    "imdbID": "tt0428169",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM2OWYyYjQtZjRlNS00NzIxLThjMDEtMjY2YWM5MDRmZjBhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjk3ODk1MzU@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const repsonse = await fetch(API_URL + "&s=" + title);
        const data = await repsonse.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Sunrise');
    },[]);

    return(
        <div className="app">
            <h1>Top Movies By Name</h1>

            <div className="search">
                <input placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/> 
                        ))}
                    </div>
                ) :
                (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;