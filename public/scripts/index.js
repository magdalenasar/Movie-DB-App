const API_KEY = "api_key=a8279624fb7c93479ed11b64a8bbb5b3";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/movie/popular?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <button type="button" data-id="${id}" class="favorite-btn">+</button>
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>`;
    main.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  // Prevent the Form from submitting if the search bar is empty.
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
// console.log(firebase);

// TODO: When favorite button is clicked
// bind click handler to element that is added later/dynamically
main.onclick = function (e) {
  if (e.target.classList.contains("favorite-btn")) {
    if (e.target.classList.contains("is-favorite")) {
      // remove the class
      e.target.classList.remove("is-favorite");
    } else {
      // addthe class
      e.target.classList.add("is-favorite");
      e.target.textContent = "-";
    }
  }
};
