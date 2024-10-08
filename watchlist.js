let watchlistHtml = ''
let watchlistArr = JSON.parse(localStorage.getItem('watchlist')|| "[]")

render()

document.addEventListener('click', (e) => {
    // Check if the clicked element or its parent has the 'add-remove-btn' class
    const button = e.target.closest(".add-remove-btn");
  
    if (button && button.dataset.id) {
      const id = button.dataset.id;
      
  
      // Find the index of the movie in the watchlist
      const index = watchlistArr.findIndex((movie) => movie.imdbID === button.dataset.id);
  
      if (index !== -1) {
        // Remove the movie from the watchlist
        watchlistArr.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
        alert(`Movie has been removed from the watchlist.`);
        
        // Re-render the watchlist to reflect the changes
        renderWatchlist();
      } else {
        console.log("Movie is not in the watchlist.");
      }
    }
  })

function updateWatchlistHtml(movie){
    watchlistHtml += `
    <div class="movie">
            <div class="movie-poster">
                <img src="${movie.Poster}" alt= ${movie.Poster}">
            </div>
            <div class="movie-body">
              <div class="movie-data>
                 <h2 class= "movie-title"${movie.Title}</h2>
                 <p class="movie-rating"> ⭐${movie.imdbRating}</p>
               </div>
               <div class="movie-details">
                   <p class= "movie-runtime">${movie.Runtime}</p>
                   <p class= "movie-genres"> ${movie.Genre}</p>
                   <button class="add-remove-btn" data-id=${movie.imdbID}>
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="https://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="white"/>
                     </svg>
                    remove
                    </button>
                </div>
                <p class ="moive-description">
                   ${movie.Plot}
                   </p>
                 </div>
        </div>
                 <hr>`

       
    }


function render() {
    watchlistHtml = ''
    if(watchlistArr.length){
        watchlistArr.forEach(movie => {
            updateWatchlistHtml(movie)
            renderWatchlist()
    })
    renderWatchlist()
} else {
    renderWatchlistApology()
}


}
function renderWatchlist() {
    watchlistHtml = ''
    if(watchlistArr.length){
        watchlistArr.forEach(movie => updateWatchlistHtml(movie))
        document.getElementById('watchlist-container').innerHTML = watchlistHtml
    } else {
        renderWatchlistApology () 
    }
}


function renderWatchlistApology(){
    document.getElementById('watchlist-container').innerHTML =`
    <div class="body-wrapper">
        <h2 class= "no-data"> Your watchlist is looking a little empty..</h2>
        <a href="index.html" class="page-nav">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="https://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
      </svg>
      let &#39;s add some movies!
      </a>
    </div>
    
    `
}