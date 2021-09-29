const signUp_form = document.querySelector(".signup-form");

signUp_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = signUp_form["login-email"].value;
  const loginPassword = signUp_form["login-password"].value;
  signUp_form.reset();
  console.log(loginEmail, loginPassword);
  auth
    .createUserWithEmailAndPassword(loginEmail, loginPassword)
    .then(() => {
      location = "index-1.html";
    })
    .catch((err) => {
      const loginError = document.getElementById("loginError");
      loginError.innerText = "Error Message -> " + err.message;
    });
});
