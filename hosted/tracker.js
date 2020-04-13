"use strict";

var _this = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var searching = true; //toggle view

var getResultSection = function getResultSection(e) {
  _this.searching = true;
}; //toggle view


var getTrackedSection = function getTrackedSection(e) {
  _this.searching = false;

  _this.getManga(e);
};
/*
    ,
    ,
    //parses incoming json from requests
    parseJSON(xhr, content) {
      const obj = JSON.parse(xhr.response);

      if (xhr.response) {
        this.mangaList = obj;
      }
    },
    //handles if json needs parsing
    handleResponse(xhr, parse) {
      const content = document.querySelector("#content");
      if (parse) {
        this.parseJSON(xhr, content);
      }
    },
    //sends post requests
    sendPost(e, postForms) {
      e.preventDefault();
      for (let form of postForms) {
        if (e.target.form.id === form.id) {
          const action = form.getAttribute("action");
          const method = form.getAttribute("method");

          let title, currentChapter, maxChapter, description;

          title = form.querySelector(".title");
          currentChapter = form.querySelector(".currentChapter");
          maxChapter = form.querySelector(".maxChapter");
          description = form.querySelector(".synopsis");

          const xhr = new XMLHttpRequest();
          xhr.open(method, action);

          xhr.setRequestHeader("Accept", "application/json");
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onload = () => this.handleResponse(xhr, false);
          let formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.textContent}&description=${description.value}`;

          xhr.send(formData);

          e.preventDefault();
        }
      }

      return false;
    },
    //sends get requests
    sendGet(e, getForm) {
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
    },
    //sends put requests
    sendPut(e, updateForms) {
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
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onload = () => this.handleResponse(xhr, false);
          const formData = `title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.textContent}`;

          xhr.send(formData);

          e.preventDefault();
        }
      }

      return false;
    },
    //updates manga
    updateManga(e) {
      const updateForms = document.querySelectorAll(".updateForm");
      console.log(updateForms);
      this.sendPut(e, updateForms);
    },
    //event listener to send get requests
    getManga(e) {
      const getForm = document.querySelector("#getForm");
      this.sendGet(e, getForm);
    },
    //event listener to send post requests
    addManga(e) {
      const addForms = document.querySelectorAll(".addForm");
      console.log(addForms);
      this.sendPost(e, addForms);
    },
    //deletes cards from datamodel and view
    deleteCard(id) {
      delete this.mangaList.mangaList[id];
      this.deleteManga(id);
      this.forceUpdate();
    },
    //updates mangaList on server
    deleteManga(id) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteManga");

      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onload = () => this.handleResponse(xhr, false);
      const formData = `title=${id}`;

      xhr.send(formData);
    },
    //updates view
    forceUpdate() {
      this.$forceUpdate();
    },
    searchManga() {
      fetch(
        `https://api.jikan.moe/v3/search/manga?q=${this.searchQuery}&page=1&limit=10&type=Manga`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          this.searchResults = data;
        });
    }
*/


var SearchBar = function SearchBar(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", {
    "class": "is-size-1"
  }, "MangaTracker"), /*#__PURE__*/React.createElement("h5", {
    "class": "is-size-3"
  }, "Search for a manga and track your progress."), /*#__PURE__*/React.createElement("input", {
    type: "search",
    name: "searchbar",
    id: "searchbar",
    placeholder: "Search Manga",
    "class": "input"
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Search",
    "class": "input"
  }));
};

var Controls = function Controls(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("form", {
    id: "getForm",
    action: "/getManga",
    method: "GET"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "box"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "class": "button"
  }, "Results"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "class": "button"
  }, "Tracked"))));
};

var AddSection = function AddSection(props) {
  return /*#__PURE__*/React.createElement("section", {
    id: "addSection"
  }, /*#__PURE__*/React.createElement("div", {
    id: "addDiv"
  }, /*#__PURE__*/React.createElement("h1", {
    "class": "is-size-3"
  }, "Add a manga:")));
};

var TrackedSection = function TrackedSection(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    id: "trackedScrollWrap"
  }, /*#__PURE__*/React.createElement("h1", {
    "class": "is-size-3"
  }, "Tracked Manga:")));
};

var AddMangaList = function AddMangaList(props) {
  if (props.manga.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "mangaList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMangaList"
    }, "No Manga yet"));
  }

  var mangaNodes = props.manga.map(function (manga) {
    return /*#__PURE__*/React.createElement("section", {
      "class": "resultCard"
    }, /*#__PURE__*/React.createElement("div", {
      "class": "box"
    }, /*#__PURE__*/React.createElement("article", {
      "class": "media"
    }, /*#__PURE__*/React.createElement("div", {
      "class": "media-left"
    }, /*#__PURE__*/React.createElement("figure", {
      "class": "image"
    }, /*#__PURE__*/React.createElement("img", {
      src: result.image_url,
      alt: result.title
    }))), /*#__PURE__*/React.createElement("div", {
      "class": "media-content"
    }, /*#__PURE__*/React.createElement("form", {
      id: result.title.replace(/\s/g, ""),
      "class": "addForm",
      action: "/addManga",
      method: "POST"
    }, /*#__PURE__*/React.createElement("h1", {
      "class": "title"
    }, result.title), /*#__PURE__*/React.createElement("label", {
      "class": "label",
      "for": "currentChapter"
    }, "Current Chapter"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "currentChapter",
      min: "1",
      max: "9999",
      "class": "input currentChapter"
    }), /*#__PURE__*/React.createElement("label", {
      "class": "label",
      "for": "maxChapter"
    }, "Max Chapters(can be adjusted later)"), /*#__PURE__*/React.createElement("p", {
      "class": "maxChapter"
    }, result.chapters), /*#__PURE__*/React.createElement("label", {
      "class": "label",
      "for": "synopsis"
    }, "Synopsis"), /*#__PURE__*/React.createElement("textarea", {
      "class": "textarea synopsis"
    }, result.synopsis), /*#__PURE__*/React.createElement("button", {
      "class": "button",
      onClick: addManga($event),
      type: "submit"
    }, "Add"))))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mangaList"
  }, mangaNodes);
};

var TrackedMangaList = function TrackedMangaList(props) {
  if (props.manga.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "mangaList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMangaList"
    }, "No Manga yet"));
  }

  var mangaNodes = props.manga.map(function (manga) {
    return /*#__PURE__*/React.createElement("section", {
      "class": "trackedCard"
    }, /*#__PURE__*/React.createElement("div", {
      "class": "box"
    }, /*#__PURE__*/React.createElement("article", {
      "class": "media"
    }, /*#__PURE__*/React.createElement("div", {
      "class": "media-left"
    }, /*#__PURE__*/React.createElement("figure", {
      "class": "image"
    }, /*#__PURE__*/React.createElement("img", {
      src: manga.image_url,
      alt: manga.title
    }))), /*#__PURE__*/React.createElement("div", {
      "class": "media-content"
    }, /*#__PURE__*/React.createElement("form", {
      "class": "updateForm",
      action: "/updateManga",
      method: "PUT"
    }, /*#__PURE__*/React.createElement("label", {
      "class": "label"
    }, "Title:"), /*#__PURE__*/React.createElement("h1", {
      "class": "title"
    }, manga.title), /*#__PURE__*/React.createElement("label", {
      "class": "label"
    }, "Current Chapter:"), /*#__PURE__*/React.createElement("input", _defineProperty({
      "class": "currentChapter",
      type: "number",
      min: "1",
      max: "9999",
      value: manga.currentChapter
    }, "class", "input currentChapter")), /*#__PURE__*/React.createElement("label", {
      "class": "label"
    }, "Max Chapter:"), /*#__PURE__*/React.createElement("input", _defineProperty({
      "class": "maxChapter",
      type: "number",
      min: "1",
      max: "9999",
      value: manga.maxChapter
    }, "class", "input maxChapter")), /*#__PURE__*/React.createElement("label", {
      "class": "label"
    }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
      "class": "description textarea"
    }, manga.description), /*#__PURE__*/React.createElement("button", {
      "class": "button",
      onClick: updateManga($event),
      type: "submit"
    }, "Update")), /*#__PURE__*/React.createElement("button", {
      "class": "button",
      onClick: deleteCard(manga.title)
    }, "Delete")))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mangaList"
  }, mangaNodes);
};

var loadMangaFromServer = function loadMangaFromServer() {
  sendAjax("GET", "/getManga", null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      manga: data.manga
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SearchBar, {
    csrf: csrf
  }), document.querySelector("#search"));
  ReactDOM.render( /*#__PURE__*/React.createElement(Controls, {
    csrf: csrf
  }), document.querySelector("#controls"));

  if (searching) {
    ReactDOM.render( /*#__PURE__*/React.createElement(AddSection, {
      csrf: csrf
    }), document.querySelector("#content"));
  } else {
    ReactDOM.render( /*#__PURE__*/React.createElement(TrackedSection, {
      csrf: csrf
    }), document.querySelector("#content"));
  }

  ReactDOM.render( /*#__PURE__*/React.createElement(AddMangaList, {
    manga: [],
    csrf: csrf
  }), document.querySelector("#addDiv"));
  loadMangaFromServer();
};

var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});