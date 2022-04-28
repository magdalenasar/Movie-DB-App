function saveToLS(movie) {
  let movies;
  //check if already haves movies
  if (localStorage.getItem("movies") === null) {
    // if no, create empthy []
    movies = [];
  } else {
    // if yes get all the data
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  //Add the new array into the LS
  movies.push(movie);
  localStorage.setItem("movies", JSON.stringify(movies));

  // TEST
  alert("Added to your favorites!");
}

//==============================================================

function getMoviesDataFromLS(movie) {
  let movies;

  if (localStorage.getItem("movies") === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  movies.forEach((movie) => {
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

function deleteMoviesFromLS(movie) {
  let movies;

  if (localStorage.getItem("movies") === null) {
    // if no, empthy []
    movies = [];
  } else {
    // if yes get all the data
    movies = JSON.parse(localStorage.getItem("movies"));
  }

  const movieElement = movie.childrens[0].innerHTML;
  if (completedTodos.includes(todoElement)) {
    completedTodos.splice(completedTodos.indexOf(todoElement), 1);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  } else {
    todos.splice(todos.indexOf(todoElement), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
