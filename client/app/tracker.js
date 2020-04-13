//fields
let searching = true;
let mangaList = [];
let searchQuery = "";
let filters = {};
let genres = {};
let searching = true;
let searchResults = {};

//toggle view
const getResultSection = (e) => {
  searching = true;
};

//toggle view
const getTrackedSection = (e) => {
  searching = false;
  getManga(e);
};

//event listener to send get requests
const getManga = (e) => {
  const getForm = document.querySelector("#getForm");
  sendGet(e, getForm);
};

//searches for manga in jikan API
const searchManga = () => {
  fetch(
    `https://api.jikan.moe/v3/search/manga?q=${this.searchQuery}&page=1&limit=10&type=Manga`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      searchResults = data;
    });
};

//updates manga
const updateManga = (e) => {
  const updateForms = document.querySelectorAll(".updateForm");
  console.log(updateForms);
  sendPut(e, updateForms);
};

//event listener to send post requests
const addManga = (e) => {
  const addForms = document.querySelectorAll(".addForm");
  console.log(addForms);
  sendPost(e, addForms);
};

//deletes cards from datamodel and view
const deleteCard = (id) => {
  delete mangaList.mangaList[id];
  deleteManga(id);
  forceUpdate();
};
//updates mangaList on server
const deleteManga = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteManga");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => handleResponse(xhr, false);
  const formData = `title=${id}`;

  xhr.send(formData);
};
//updates view
const forceUpdateList = () => {
  forceUpdate();
};

//parses incoming json from requests
const parseJSON = (xhr, content) => {
  const obj = JSON.parse(xhr.response);

  if (xhr.response) {
    this.mangaList = obj;
  }
};
//handles if json needs parsing
const handleResponse = (xhr, parse) => {
  const content = document.querySelector("#content");
  if (parse) {
    this.parseJSON(xhr, content);
  }
};
//sends post requests
const sendPost = (e, postForms) => {
  e.preventDefault();

//   if ($("#user").val() == "" || $("#pass").val() == "") {
//     handleError("Username or password is empty");
//     return false;
//   }
 
  for (let form of postForms) {
    if (e.target.form.id === form.id) {
      const method = form.getAttribute("method");

      let title, currentChapter, maxChapter, description;

      title = form.querySelector(".title");
      currentChapter = form.querySelector(".currentChapter");
      maxChapter = form.querySelector(".maxChapter");
      description = form.querySelector(".synopsis");

      const xhr = new XMLHttpRequest();
      xhr.open(method, action);

      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => this.handleResponse(xhr, false);
      let formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.textContent}&description=${description.value}`;

      xhr.send(formData);

      sendAjax("POST", method, null, (result) => {
        setup(result.csrfToken);
      });

      e.preventDefault();
    }
  }

  return false;
};
//sends get requests
const sendGet = (e, getForm) => {
  e.preventDefault();

  const action = getForm.getAttribute("action");
  const method = getForm.getAttribute("method");

  const xhr = new XMLHttpRequest();
  xhr.open(method, action);

  xhr.onload = () => this.handleResponse(xhr, true);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.send();

  e.preventDefault();

  return false;
};
//sends put requests
const sendPut = (e, updateForms) => {
  e.preventDefault();

  for (let form of updateForms) {
    if (e.target.form.id === form.id) {
      const action = form.getAttribute("action");
      const method = form.getAttribute("method");

      let title, currentChapter, maxChapter, description;

      title = form.querySelector(".title");
      currentChapter = form.querySelector(".currentChapter");
      maxChapter = form.querySelector(".maxChapter");
      description = form.querySelector(".description");

      console.log(title);
      console.log(currentChapter);
      console.log(maxChapter);
      console.log(description);

      const xhr = new XMLHttpRequest();
      xhr.open(method, action);

      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => this.handleResponse(xhr, false);
      const formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.textContent}`;

      xhr.send(formData);

      e.preventDefault();
    }
  }

  return false;
};

const SearchBar = (props) => {
  return (
    <section>
      <h1 class="is-size-1">MangaTracker</h1>
      <h5 class="is-size-3">Search for a manga and track your progress.</h5>
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="Search Manga"
        class="input"
      />
      <input type="submit" value="Search" class="input" />
    </section>
  );
};

const Controls = (props) => {
  return (
    <section>
      <form id="getForm" action="/getManga" method="GET">
        <div class="box">
          <button onClick={getResultSection} type="button" class="button">
            Results
          </button>
          <button onClick={getTrackedSection} type="button" class="button">
            Tracked
          </button>
        </div>
      </form>
    </section>
  );
};

const AddSection = (props) => {
  return (
    <section id="addSection">
      <div id="addDiv">
        <h1 class="is-size-3">Add a manga:</h1>
      </div>
    </section>
  );
};

const TrackedSection = (props) => {
  return (
    <section>
      <div id="trackedScrollWrap">
        <h1 class="is-size-3">Tracked Manga:</h1>
      </div>
    </section>
  );
};

const AddMangaList = function (props) {
  if (props.manga.length === 0) {
    return (
      <div className="mangaList">
        <h3 className="emptyMangaList">No Manga yet</h3>
      </div>
    );
  }

  const mangaNodes = props.manga.map(function (manga) {
    return (
      <section class="resultCard">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image">
                <img src={result.image_url} alt={result.title} />
              </figure>
            </div>
            <div class="media-content">
              <form
                id={result.title.replace(/\s/g, "")}
                class="addForm"
                action="/addManga"
                method="POST"
              >
                <h1 class="title">{result.title}</h1>
                <label class="label" for="currentChapter">
                  Current Chapter
                </label>
                <input
                  type="number"
                  name="currentChapter"
                  min="1"
                  max="9999"
                  class="input currentChapter"
                />
                <label class="label" for="maxChapter">
                  Max Chapters(can be adjusted later)
                </label>
                <p class="maxChapter">{result.chapters}</p>
                <label class="label" for="synopsis">
                  Synopsis
                </label>
                <textarea class="textarea synopsis">{result.synopsis}</textarea>
                <button class="button" onClick={addManga($event)} type="submit">
                  Add
                </button>
              </form>
            </div>
          </article>
        </div>
      </section>
    );
  });

  return <div className="mangaList">{mangaNodes}</div>;
};

const TrackedMangaList = function (props) {
  if (props.manga.length === 0) {
    return (
      <div className="mangaList">
        <h3 className="emptyMangaList">No Manga yet</h3>
      </div>
    );
  }

  const mangaNodes = props.manga.map(function (manga) {
    return (
      <section class="trackedCard">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image">
                <img src={manga.image_url} alt={manga.title} />
              </figure>
            </div>
            <div class="media-content">
              <form class="updateForm" action="/updateManga" method="PUT">
                <label class="label">Title:</label>
                <h1 class="title">{manga.title}</h1>
                <label class="label">Current Chapter:</label>
                <input
                  class="currentChapter"
                  type="number"
                  min="1"
                  max="9999"
                  value={manga.currentChapter}
                  class="input currentChapter"
                />
                <label class="label">Max Chapter:</label>
                <input
                  class="maxChapter"
                  type="number"
                  min="1"
                  max="9999"
                  value={manga.maxChapter}
                  class="input maxChapter"
                />
                <label class="label">Description:</label>
                <textarea class="description textarea">
                  {manga.description}
                </textarea>
                <button
                  class="button"
                  onClick={updateManga($event)}
                  type="submit"
                >
                  Update
                </button>
              </form>
              <button class="button" onClick={deleteCard(manga.title)}>
                Delete
              </button>
            </div>
          </article>
        </div>
      </section>
    );
  });

  return <div className="mangaList">{mangaNodes}</div>;
};

const loadMangaFromServer = () => {
  sendAjax("GET", "/getManga", null, (data) => {
    ReactDOM.render(
      <AddMangaList manga={data.manga} />,
      document.querySelector("#content")
    );
  });
};

const setup = function (csrf) {
  ReactDOM.render(<SearchBar csrf={csrf} />, document.querySelector("#search"));

  ReactDOM.render(
    <Controls csrf={csrf} />,
    document.querySelector("#controls")
  );

  if (searching) {
    ReactDOM.render(
      <AddSection csrf={csrf} />,
      document.querySelector("#content")
    );
  } else {
    ReactDOM.render(
      <TrackedSection csrf={csrf} />,
      document.querySelector("#content")
    );
  }

  ReactDOM.render(
    <AddMangaList manga={[]} csrf={csrf} />,
    document.querySelector("#addDiv")
  );

  loadMangaFromServer();
};

const getToken = () => {
  sendAjax("GET", "/getToken", null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
