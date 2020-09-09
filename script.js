const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const main = document.querySelector('main');
const form = document.querySelector('#form');
const search = document.querySelector('input');
getMovies(APIURL);

async function getMovies(url) {
    const response = await fetch(url);
    const respData = await response.json();

    console.log(respData);
    showMovies(respData.results);

}

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.original_title}">
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
        `;

        main.appendChild(movieEl)
    });
}

function getClassByRate(rate){
    if(rate > 7)
        return 'green';
    else if( rate <5)
        return 'red';
    else
        return 'orange';
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = '';
    }
})