const API_KEY = '2aaf3dea';
const formContainer = document.getElementById('form-container') as HTMLElement;
const inputMovieName = document.getElementById('input-movie-name') as HTMLInputElement;
const buttonSearchMovie = document.getElementById('button-search-movie') as HTMLButtonElement;
const movieData = document.getElementById('movie-data') as HTMLElement;

type Movie = {
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
};

type MovieDetails = {
  Poster: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
};

async function searchMovie(event: Event): Promise<void> {
  const movieName = inputMovieName.value.trim();

  if (!movieName) {
    return;
  }

  try {
    const movies = await getMovieList(movieName);
    inputMovieName.value = '';

    if (movies && movies.length > 0) {
      movieData.innerHTML = movies.map(getHtmlForMovie).join('');
    } else {
      movieData.innerHTML = `<div class="error">No movies found</div>`;
    }
  } catch (error: any) {
    movieData.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

async function getMovieList(movieText: string): Promise<Movie[]> {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieText}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const respData = await response.json();

  if (respData.Response === "False") {
    throw new Error(respData.Error);
  }

  return respData.Search || [];
}

async function getMovieById(movieID: string): Promise<MovieDetails> {
  const moreDetailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`;
  const response = await fetch(moreDetailsUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const respData = await response.json();

  if (respData.Response === "False") {
    throw new Error(respData.Error);
  }

  return respData || {};
}

function getHtmlForMovie(movie: Movie): string {
  return `
        <div class="movie-item">
        <div><img src="${movie.Poster}" alt="${movie.Title}" /></div>
        <div>${movie.Title}</div>
        <div>${movie.Year}</div>
        <div>${movie.Type}</div>
        <button 
        class="showMoreButton"
        data-imdb-id="${movie.imdbID}"
        type="button">More details</button>
        </div>
        `;
}

async function showMore(event: Event): Promise<void> {
  const target = event.target as HTMLElement;

  if (target.className !== 'showMoreButton') {
    return;
  }

  const movieID = target.dataset.imdbId;

  if (!movieID) {
    return;
  }

  try {
    const movieDetails = await getMovieById(movieID);

    if (Object.keys(movieDetails).length > 0) {
      movieData.innerHTML = getHtmlForMovieDetails(movieDetails);
    } else {
      movieData.innerHTML = `<div class="error">No movies found</div>`;
    }
  } catch (error: any) {
    movieData.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

function getHtmlForMovieDetails(movieDetails: MovieDetails): string {
  return `
  <div class="movieDataContainer">
  <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
  <div class="movie-description">
  <div>${movieDetails.Title}</div>
  <div>${movieDetails.Year}</div>
  <div>${movieDetails.Rated}</div>
  <div>${movieDetails.Released}</div>
  <div>${movieDetails.Runtime}</div>
  <div>${movieDetails.Genre}</div>
  <div>${movieDetails.Director}</div>
  <div>${movieDetails.Writer}</div>
  <div>${movieDetails.Actors}</div>
  <div>${movieDetails.Plot}</div>
  <div>${movieDetails.Language}</div>
  <div>${movieDetails.Country}</div>
  <div>${movieDetails.Awards}</div>
  </div>
  </div>
  `;
}

buttonSearchMovie.addEventListener('click', searchMovie);
movieData.addEventListener('click', showMore);