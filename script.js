const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const main = document.querySelector('main');
getMovies();

async function getMovies() {
    const response = await fetch(APIURL);
    const respData = await response.json();

    console.log(respData);

    respData.results.forEach(movie => {
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
    return respData;
}

function getClassByRate(rate){
    if(rate > 7)
        return 'green';
    else if( rate <5)
        return 'red';
    else
        return 'orange';
}
