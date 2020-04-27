"use strict";

var handleReset = function handleReset(e) {
  e.preventDefault();

  if ($("#user").val() == "" || $("#oldPass").val() == "" || $("#pass").val() == "" || $("#pass2").val() == "") {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax("POST", $("#resetForm").attr("action"), $("#resetForm").serialize(), redirect);
  return false;
};

var ResetWindow = function ResetWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "resetForm",
    name: "resetForm",
    onSubmit: handleReset,
    action: "/updatePassword",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "oldPass"
  }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
    id: "oldPass",
    type: "password",
    name: "oldPass",
    placeholder: "old password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Reset"
  }));
};

var createResetWindow = function createResetWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ResetWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  createResetWindow(csrf);
};

var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});