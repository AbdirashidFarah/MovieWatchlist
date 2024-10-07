const searchInput = document.getElementById("search-input");
const formEl = document.getElementById("form");
const moviesContainer = document.getElementById("movies-container");
const key = "9a7f7ead";

let reqUrl = "";
let movieArray = [];
let moviesHtml = "";
let movieArrayDetailed = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Event listener for form submission
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchString = searchInput.value.trim();
  reqUrl = `https://www.omdbapi.com/?s=${searchString}&type=movie&apikey=${key}`;

  fetch(reqUrl)
    .then((response) => response.json())
    .then((data) => {
      moviesHtml = "";
      if (data.Response == "False") {
        renderApology();
      } else {
        movieArray = data.Search;
        for (let movie of movieArray) {
          getMovieDetails(movie.imdbID);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
});

// Event listener for adding to the watchlist
document.addEventListener("click", (e) => {
  // Find the button element using closest method to ensure it targets the right element
  const button = e.target.closest(".add-remove-btn");

  // Check if the button exists and has a dataset id
  if (button && button.dataset.id) {
    // Find the movie object from the detailed movie array using the dataset id
    const targetMovieObj = movieArrayDetailed.find(
      (movie) => movie.imdbID === button.dataset.id
    );

    // Ensure the movie object was found
    if (targetMovieObj) {
      // Check if the movie is already in the watchlist
      if (!watchlist.some((movie) => movie.imdbID === targetMovieObj.imdbID)) {
        watchlist.push(targetMovieObj);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${targetMovieObj.Title} has been added to the watchlist.`);
        
        // Optionally update the button text to indicate it's in the watchlist
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
                            </svg> In Watchlist`;
      } else {
        alert(`${targetMovieObj.Title} is already in the watchlist.`);
      }
    } else {
      console.error("Movie not found in the detailed list.");
    }
  }
});


// Function to get detailed movie info by IMDb ID
function getMovieDetails(movieId) {
  reqUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${key}`;

  fetch(reqUrl)
    .then((response) => response.json())
    .then((data) => {
      movieArrayDetailed.push(data);
      updateResultsHtml(data); // Correct function call
      renderResults();
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

// Function to update the HTML results
function updateResultsHtml(movie) {
  // Use placeholder image if no poster is available
  const poster = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
  const isInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID)
  const buttonText = isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
  
  const buttonIconPath = isInWatchlist
  ? "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z"
  : "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z"

  moviesHtml += `
    <div class="movie">
      <div class="movie-poster">
        <img src="${poster}" alt="${movie.Title} Poster">
      </div>
      <div class="movie-body">
        <div class="movie-data">
          <h2 class="movie-title">${movie.Title}</h2>
          <p class="movie-rating">⭐ ${movie.imdbRating}</p>
        </div>
        <div class="movie-details">
          <p class="movie-runtime">${movie.Runtime}</p>
          <p class="movie-genres">${movie.Genre}</p>
          <button class="add-remove-btn" data-id="${movie.imdbID}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
            </svg>
            Watchlist
          </button>
        </div>
        <p class="movie-description">
          ${movie.Plot}
        </p>
      </div>
    </div>
    <hr>
  `;
}

// Function to render results
function renderResults() {
  moviesContainer.innerHTML = moviesHtml;
}

// Function to render apology message
function renderApology() {
  moviesContainer.innerHTML = `
    <div class="body-wrapper">
      <h2 class="no-data">Sorry, we couldn't find what you are looking for. Please try another search.</h2>
    </div>
  `;
}
      