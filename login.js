// ###################################### For Login Form #####################################

const loginForm = document.getElementById("login-form");
const demo_login = document.querySelector(".guest-login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = loginForm["login-email"].value;
  const loginPassword = loginForm["login-password"].value;
  console.log(loginEmail, loginPassword);
  loginForm.reset();
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(() => {
      location = "index-1.html";
    })
    .catch((err) => {
      const loginError = document.getElementById("loginError");
      loginError.innerText = "Error Message -> " + err.message;
    });
});

demo_login.addEventListener("click", () => {
  const email = "ashish@gmail.com";
  const password = "123456";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      location = "index-1.html";
    })
    .catch((err) => {
      const loginError = document.getElementById("loginError");
      loginError.innerText = "Error Message -> " + err.message;
    });
});

// ##################################### Form SignUp ########################
