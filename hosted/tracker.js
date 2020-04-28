"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//fields
var mangaList = [];
var searchQuery = ""; // let filters = {};
// let genres = {};

var subscribed;
var searchResults = [];
var csrfToken; //searches for manga in jikan API

var searchManga = function searchManga() {
  fetch("https://api.jikan.moe/v3/search/manga?q=".concat(searchQuery, "&page=1&limit=10&type=Manga")).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (document.querySelector("#addDiv")) {
      searchResults = data.results;
      ReactDOM.render( /*#__PURE__*/React.createElement(AddMangaList, {
        manga: searchResults
      }), document.querySelector("#addDiv"));
    } else {
      ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, "Go to results tab to search for manga. Click tracked button again to retrieve manga you track."), document.querySelector("#trackedScrollWrap"));
    }
  });
}; //updates manga


var updateManga = function updateManga(e) {
  var updateForms = document.querySelectorAll(".updateForm"); // console.log(updateForms);

  sendPut(e, updateForms);
}; //event listener to send post requests


var addManga = function addManga(e) {
  var addForms = document.querySelectorAll(".addForm"); // console.log(addForms);

  sendPost(e, addForms);
}; //deletes cards from datamodel and view


var deleteCard = function deleteCard(e, id) {
  //weird parameter order change happened from bind method
  // console.log(e);
  // console.log(id);
  deleteManga(e);
}; //updates mangaList on server


var deleteManga = function deleteManga(id) {
  var formData = "_csrf=".concat(csrfToken, "&id=").concat(id);
  sendAjax("POST", "/deleteManga", formData, function () {
    // console.log("succesful deletion");
    loadMangaFromServer();
  });
}; //sends post requests


var sendPost = function sendPost(e, postForms) {
  e.preventDefault();

  var _iterator = _createForOfIteratorHelper(postForms),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var form = _step.value;

      if (e.target.form.id === form.id) {
        var action = form.getAttribute("action");

        var title = void 0,
            currentChapter = void 0,
            maxChapter = void 0,
            description = void 0,
            _csrf = void 0,
            imageUrl = void 0,
            notes = void 0;

        title = form.querySelector(".title");
        currentChapter = form.querySelector(".currentChapter");
        maxChapter = form.querySelector(".maxChapter");
        description = form.querySelector(".synopsis");
        _csrf = form.querySelector("input[type='hidden']");
        imageUrl = form.parentElement.parentElement.querySelector("img").getAttribute("src");
        notes = form.querySelector(".notes"); // let formData = `_csrf=${_csrf.value}&notes=${notes.value}&title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.textContent}&description=${description.value}&imageUrl=${imageUrl}`;

        var formData = void 0;

        if (subscribed) {
          formData = "_csrf=".concat(_csrf.value, "&notes=").concat(notes.value || "put notes here", "&title=").concat(title.textContent, "&currentChapter=").concat(currentChapter.value, "&maxChapter=").concat(maxChapter.textContent, "&description=").concat(description.value, "&imageUrl=").concat(imageUrl);
        } else {
          formData = "_csrf=".concat(_csrf.value, "&notes=put notes here&title=").concat(title.textContent, "&currentChapter=").concat(currentChapter.value, "&maxChapter=").concat(maxChapter.textContent, "&description=").concat(description.value, "&imageUrl=").concat(imageUrl);
        } // console.log(formData);


        sendAjax("POST", action, formData, function (result) {
          mangaList.push(result[0]);
        });
        e.preventDefault();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}; //sends put requests


var sendPut = function sendPut(e, updateForms) {
  e.preventDefault();

  var _iterator2 = _createForOfIteratorHelper(updateForms),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var form = _step2.value;

      if (e.target.form.id === form.id) {
        var action = form.getAttribute("action");

        var title = void 0,
            currentChapter = void 0,
            maxChapter = void 0,
            description = void 0,
            _csrf = void 0,
            imageUrl = void 0,
            notes = void 0;

        title = form.querySelector(".title");
        currentChapter = form.querySelector(".currentChapter");
        maxChapter = form.querySelector(".maxChapter");
        description = form.querySelector(".description");
        _csrf = form.querySelector("input[type='hidden']");
        imageUrl = form.parentElement.parentElement.querySelector("img").getAttribute("src");
        notes = form.querySelector(".notes"); // let formData = `_csrf=${_csrf.value}&notes=${notes.value}&title=${title.textContent}&currentChapter=${currentChapter.value}&maxChapter=${maxChapter.value}&description=${description.value}&imageUrl=${imageUrl}`;

        var formData = void 0;

        if (subscribed) {
          formData = "_csrf=".concat(_csrf.value, "&notes=").concat(notes.value || "put notes here", "&title=").concat(title.textContent, "&currentChapter=").concat(currentChapter.value, "&maxChapter=").concat(maxChapter.value, "&description=").concat(description.value, "&imageUrl=").concat(imageUrl);
        } else {
          formData = "_csrf=".concat(_csrf.value, "&notes=put notes here&title=").concat(title.textContent, "&currentChapter=").concat(currentChapter.value, "&maxChapter=").concat(maxChapter.value, "&description=").concat(description.value, "&imageUrl=").concat(imageUrl);
        } // console.log(formData);


        sendAjax("POST", action, formData, function (result) {
          mangaList.push(result[0]);
        });
        e.preventDefault();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  loadMangaFromServer();
  return false;
}; //searchbar component


var SearchBar = function SearchBar(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", {
    className: "is-size-1"
  }, "MangaTracker"), /*#__PURE__*/React.createElement("h5", {
    className: "is-size-3"
  }, "Search for a manga and track your progress."), /*#__PURE__*/React.createElement("input", {
    type: "search",
    name: "searchbar",
    id: "searchbar",
    placeholder: "Search Manga",
    className: "input",
    onChange: function onChange(e) {
      searchQuery = e.target.value;
    }
  }), /*#__PURE__*/React.createElement("input", {
    onClick: searchManga,
    type: "submit",
    value: "Search",
    className: "input"
  }));
}; //controls component


var Controls = function Controls(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("form", {
    id: "getForm",
    action: "/getManga",
    method: "GET"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      ReactDOM.render( /*#__PURE__*/React.createElement(AddSection, {
        csrf: csrfToken
      }), document.querySelector("#content"));
    },
    type: "button",
    className: "button",
    id: "resultButton"
  }, "Results"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      ReactDOM.render( /*#__PURE__*/React.createElement(TrackedSection, {
        csrf: csrfToken
      }), document.querySelector("#content"));
      loadMangaFromServer();
    },
    type: "button",
    className: "button",
    id: "trackButton"
  }, "Tracked"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      sendAjax("POST", "/subscribe", "_csrf=".concat(csrfToken), function () {
        location.reload();
      });
    },
    type: "button",
    className: "button",
    id: "subscribeButton"
  }, "SubscribeToggle"))));
}; //add section component


var AddSection = function AddSection(props) {
  return /*#__PURE__*/React.createElement("section", {
    id: "addSection"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "is-size-3"
  }, "Add a manga:"), /*#__PURE__*/React.createElement("div", {
    id: "addDiv"
  }));
}; //tracked section component


var TrackedSection = function TrackedSection(props) {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", {
    className: "is-size-3"
  }, "Tracked Manga:"), /*#__PURE__*/React.createElement("div", {
    id: "trackedScrollWrap"
  }));
}; //add mangalist component


var AddMangaList = function AddMangaList(props) {
  if (props.manga.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "mangaList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMangaList"
    }, "No Manga yet"));
  }

  var mangaNodes = props.manga.map(function (result) {
    if (subscribed) {
      return /*#__PURE__*/React.createElement("section", {
        className: "resultCard"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("article", {
        className: "media"
      }, /*#__PURE__*/React.createElement("div", {
        className: "media-left"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "image"
      }, /*#__PURE__*/React.createElement("img", {
        src: result.image_url,
        alt: result.title
      }))), /*#__PURE__*/React.createElement("div", {
        className: "media-content"
      }, /*#__PURE__*/React.createElement("form", {
        id: result.title.replace(/\s/g, ""),
        className: "addForm",
        action: "/addManga",
        method: "POST"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, result.title), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "currentChapter"
      }, "Current Chapter"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "currentChapter",
        min: "1",
        max: "9999",
        className: "input currentChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "maxChapter"
      }, "Max Chapters(can be adjusted later)"), /*#__PURE__*/React.createElement("p", {
        className: "maxChapter"
      }, result.chapters), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "synopsis"
      }, "Synopsis"), /*#__PURE__*/React.createElement("textarea", {
        className: "textarea synopsis"
      }, result.synopsis), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "notes"
      }, "Notes(premium feature)"), /*#__PURE__*/React.createElement("textarea", {
        className: "textarea notes"
      }), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: csrfToken
      }), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: addManga.bind(event),
        type: "submit"
      }, "Add"))))));
    } else {
      return /*#__PURE__*/React.createElement("section", {
        className: "resultCard"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("article", {
        className: "media"
      }, /*#__PURE__*/React.createElement("div", {
        className: "media-left"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "image"
      }, /*#__PURE__*/React.createElement("img", {
        src: result.image_url,
        alt: result.title
      }))), /*#__PURE__*/React.createElement("div", {
        className: "media-content"
      }, /*#__PURE__*/React.createElement("form", {
        id: result.title.replace(/\s/g, ""),
        className: "addForm",
        action: "/addManga",
        method: "POST"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, result.title), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "currentChapter"
      }, "Current Chapter"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "currentChapter",
        min: "1",
        max: "9999",
        className: "input currentChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "maxChapter"
      }, "Max Chapters(can be adjusted later)"), /*#__PURE__*/React.createElement("p", {
        className: "maxChapter"
      }, result.chapters), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "synopsis"
      }, "Synopsis"), /*#__PURE__*/React.createElement("textarea", {
        className: "textarea synopsis"
      }, result.synopsis), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "notes"
      }, "Notes(premium feature)"), /*#__PURE__*/React.createElement("textarea", {
        disabled: true,
        className: "textarea notes"
      }), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: csrfToken
      }), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: addManga.bind(event),
        type: "submit"
      }, "Add"))))));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mangaList"
  }, mangaNodes);
}; //tracked mangalist component


var TrackedMangaList = function TrackedMangaList(props) {
  if (props.manga.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "mangaList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMangaList"
    }, "No Manga yet"));
  }

  var mangaNodes = props.manga.map(function (manga) {
    if (subscribed) {
      return /*#__PURE__*/React.createElement("section", {
        className: "trackedCard"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("article", {
        className: "media"
      }, /*#__PURE__*/React.createElement("div", {
        className: "media-left"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "image"
      }, /*#__PURE__*/React.createElement("img", {
        src: manga.imageUrl,
        alt: manga.title
      }))), /*#__PURE__*/React.createElement("div", {
        className: "media-content"
      }, /*#__PURE__*/React.createElement("form", {
        className: "updateForm",
        action: "/updateManga",
        method: "PUT"
      }, /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Title:"), /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, manga.title), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Current Chapter:"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        min: "1",
        max: "9999",
        defaultValue: manga.currentChapter,
        className: "input currentChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Max Chapter:"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        min: "1",
        max: "9999",
        defaultValue: manga.maxChapter,
        className: "input maxChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
        className: "description textarea"
      }, manga.description), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "notes"
      }, "Notes(premium feature)"), /*#__PURE__*/React.createElement("textarea", {
        className: "textarea notes"
      }, manga.notes), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: csrfToken
      }), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: updateManga.bind(event),
        type: "submit"
      }, "Update")), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: deleteCard.bind(event, "".concat(manga._id))
      }, "Delete")))));
    } else {
      return /*#__PURE__*/React.createElement("section", {
        className: "trackedCard"
      }, /*#__PURE__*/React.createElement("div", {
        className: "box"
      }, /*#__PURE__*/React.createElement("article", {
        className: "media"
      }, /*#__PURE__*/React.createElement("div", {
        className: "media-left"
      }, /*#__PURE__*/React.createElement("figure", {
        className: "image"
      }, /*#__PURE__*/React.createElement("img", {
        src: manga.imageUrl,
        alt: manga.title
      }))), /*#__PURE__*/React.createElement("div", {
        className: "media-content"
      }, /*#__PURE__*/React.createElement("form", {
        className: "updateForm",
        action: "/updateManga",
        method: "PUT"
      }, /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Title:"), /*#__PURE__*/React.createElement("h1", {
        className: "title"
      }, manga.title), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Current Chapter:"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        min: "1",
        max: "9999",
        defaultValue: manga.currentChapter,
        className: "input currentChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Max Chapter:"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        min: "1",
        max: "9999",
        defaultValue: manga.maxChapter,
        className: "input maxChapter"
      }), /*#__PURE__*/React.createElement("label", {
        className: "label"
      }, "Description:"), /*#__PURE__*/React.createElement("textarea", {
        className: "description textarea"
      }, manga.description), /*#__PURE__*/React.createElement("label", {
        className: "label",
        "for": "notes"
      }, "Notes(premium feature)"), /*#__PURE__*/React.createElement("textarea", {
        disabled: true,
        className: "textarea notes"
      }, manga.notes), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "_csrf",
        value: csrfToken
      }), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: updateManga.bind(event),
        type: "submit"
      }, "Update")), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: deleteCard.bind(event, "".concat(manga._id))
      }, "Delete")))));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mangaList"
  }, mangaNodes);
}; //get method to retrieve owner's manga


var loadMangaFromServer = function loadMangaFromServer() {
  sendAjax("GET", "/getManga", null, function (data) {
    // console.log(data);
    ReactDOM.render( /*#__PURE__*/React.createElement(TrackedMangaList, {
      manga: data.manga
    }), document.querySelector("#trackedScrollWrap"));
  });
}; //sets up page


var setup = function setup(csrf) {
  csrfToken = csrf;
  ReactDOM.render( /*#__PURE__*/React.createElement(SearchBar, {
    csrf: csrf
  }), document.querySelector("#search"));
  ReactDOM.render( /*#__PURE__*/React.createElement(Controls, {
    csrf: csrf
  }), document.querySelector("#controls"));
  ReactDOM.render( /*#__PURE__*/React.createElement(AddSection, {
    csrf: csrf
  }), document.querySelector("#content"));
}; //gets token


var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
  sendAjax("GET", "/getSubscription", null, function (result) {
    subscribed = result.subscribed; // console.log(subscribed);
  });
}; //initializes page


$(document).ready(function () {
  getToken();
});