
  const handleReset = (e) => {
    e.preventDefault();
  
    if (
      $("#user").val() == "" ||
      $("#oldPass").val() == "" ||
      $("#pass").val() == "" ||
      $("#pass2").val() == ""
    ) {
      handleError("All fields are required");
      return false;
    }
  
    if ($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;
    }
  
    sendAjax(
      "POST",
      $("#resetForm").attr("action"),
      $("#resetForm").serialize(),
      redirect
    );
  
    return false;
  };
  

  
  const ResetWindow = (props) => {
    return (
      <form
        id="resetForm"
        name="resetForm"
        onSubmit={handleReset}
        action="/updatePassword"
        method="POST"
        className="mainForm"
      >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username" />
        <label htmlFor="oldPass">Old Password: </label>
        <input id="oldPass" type="password" name="oldPass" placeholder="old password" />
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password" />
        <label htmlFor="pass2">Password: </label>
        <input
          id="pass2"
          type="password"
          name="pass2"
          placeholder="retype password"
        />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Reset" />
      </form>
    );
  };
  
 
  
  const createResetWindow = (csrf) => {
    ReactDOM.render(
      <ResetWindow csrf={csrf} />,
      document.querySelector("#content")
    );
  };
  
  const setup = (csrf) => {
    createResetWindow(csrf);
  };
  
  const getToken = () => {
    sendAjax("GET", "/getToken", null, (result) => {
      setup(result.csrfToken);
    });
  };
  
  $(document).ready(function () {
    getToken();
  });