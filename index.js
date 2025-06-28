let signName = document.getElementById("signName");
let signEmail = document.getElementById("signEmail");
let signPassword = document.getElementById("signPassword");
let btnSignup = document.querySelector('#btnSignup');

let LoginEmail = document.getElementById("LoginEmail");
let LoginPassword = document.getElementById("LoginPassword");
let btnLogin = document.getElementById("btnLogin")
let btnLogout = document.getElementById("btnLogout")

const togglePassword = document.getElementById("togglePassword");
const inputPassword = document.getElementById("LoginPassword");

const toggleSignPassword = document.getElementById("toggleSignPassword");
const signPasswordInput = document.getElementById("signPassword");



let iconPassword = document.querySelector('.icon-password');

var userList = [];

// let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "", logged: false };




if (localStorage.getItem("dataContainer") !== null) {
  userList = JSON.parse(localStorage.getItem("dataContainer")); 
}



function signUp() {
    var userData = {
        name: signName.value.trim(),
        email: signEmail.value.trim(),
        password: signPassword.value.trim()
    };
            const msgDiv = document.querySelector(".msgDiv");
    if (validateName() && validateEmail() && validatePassword()) {
        let userFounded = null;

        for (let user of userList) {
            if (user.email === userData.email) {
                userFounded = user;
                break;
            }
        }

        if (userFounded) {
            msgDiv.textContent = "This email already exists!";
            signEmail.classList.add("is-invalid");
            msgDiv.style.display = "block";
            return;
        }

        userList.push(userData);
        localStorage.setItem("dataContainer", JSON.stringify(userList));
        
        msgDiv.textContent = "Account created successfully!";
        msgDiv.classList.remove("d-none", "text-danger"); // لإظهار الرسالة وإزالة أي لون خاطئ
        msgDiv.classList.add("text-success");  
        clearSignUpForm();
    }
}

function login(){
 var loginUser = {
        email: LoginEmail.value.trim(),
        password: LoginPassword.value.trim()
    };

    const msgDiv = document.getElementById("msgDiv");

    if (validateLoginEmail() && validateLoginPassword()) {
        var userList = JSON.parse(localStorage.getItem("dataContainer")) || [];

        let userFounded = null;

        for (let user of userList) {
            if (user.email === loginUser.email && user.password === loginUser.password) {
                userFounded = user;
                break;
            }
        }

        if (!userFounded) {
            msgDiv.textContent = "Incorrect email or password!";
            LoginEmail.classList.add("is-invalid");
            LoginPassword.classList.add("is-invalid");
            msgDiv.classList.remove("text-success");
            msgDiv.classList.add("text-danger");
            msgDiv.style.display = "block";
            return;
        }

        const currentUser = {
            name: userFounded.name,
            email: userFounded.email,
            logged: true
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        clearLoginForm();
        window.location.href = "home.html";
    }
}
function logout() {
    localStorage.removeItem("currentUser"); 
    window.location.href = 'index.html';    
}

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const icon = togglePassword.querySelector("i");
    const isPasswordShown = inputPassword.type === "text";

    // Toggle input type
    inputPassword.type = isPasswordShown ? "password" : "text";

    // Toggle icon
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}
toggleSignPassword.addEventListener("click", () => {
  const icon = toggleSignPassword.querySelector("i");

  // toggle input type
  if (signPasswordInput.type === "password") {
    signPasswordInput.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    signPasswordInput.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
});


function clearSignUpForm() {
  signEmail.value = null;
  signName.value = null;
  signPassword.value = null;

  signName.classList.remove("is-valid");
  signEmail.classList.remove("is-valid");
  signPassword.classList.remove("is-valid");
}
function clearLoginForm() {
    LoginEmail.value = "";
    LoginPassword.value = "";

    LoginEmail.classList.remove("is-valid", "is-invalid");
    LoginPassword.classList.remove("is-valid", "is-invalid");
}
function sayWelcome() {
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement && currentUser && currentUser.name) {
        userNameElement.textContent = `Welcome ${currentUser.name}`;
    }
}


function validateName() {
    var regex = /^[a-zA-Z]{3,20}$/;
    var text = signName.value;
    var msgName = document.getElementById("msgName");

    if (regex.test(text)) {
        signName.classList.add("is-valid");
        signName.classList.remove("is-invalid");
        msgName.classList.add("d-none"); // إخفاء الرسالة لو صح
        return true;
    } else {
        signName.classList.add("is-invalid");
        signName.classList.remove("is-valid");
        msgName.classList.remove("d-none"); // إظهار الرسالة
        return false;
    }
}

function validateEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var EmailText = signEmail.value;
    var msgEmail = document.getElementById("msgEmail");

    if (regex.test(EmailText)) {
        signEmail.classList.add("is-valid");
        signEmail.classList.remove("is-invalid");
        msgEmail.classList.add("d-none");
        return true;
    } else {
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
        msgEmail.classList.remove("d-none");
        return false;
    }
}

function validatePassword() {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var pass = signPassword.value;
    var msgPassword = document.getElementById("msgPassword");

    if (regex.test(pass)) {
        signPassword.classList.add("is-valid");
        signPassword.classList.remove("is-invalid");
        msgPassword.classList.add("d-none");
        return true;
    } else {
        signPassword.classList.add("is-invalid");
        signPassword.classList.remove("is-valid");
        msgPassword.classList.remove("d-none"); 
        return false;
    }
}

function validateLoginEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var emailText = LoginEmail.value;
    var msgEmail = document.getElementById("msgLoginEmail");

    if (regex.test(emailText)) {
        LoginEmail.classList.add("is-valid");
        LoginEmail.classList.remove("is-invalid");
        msgEmail.classList.add("d-none");
        return true;
    } else {
        LoginEmail.classList.add("is-invalid");
        LoginEmail.classList.remove("is-valid");
        msgEmail.classList.remove("d-none");
        return false;
    }
}
function validateLoginPassword() {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var passText = LoginPassword.value;
    var msgPassword = document.getElementById("msgLoginPassword");

    if (regex.test(passText)) {
        LoginPassword.classList.add("is-valid");
        LoginPassword.classList.remove("is-invalid");
        msgPassword.classList.add("d-none");
        return true;
    } else {
        LoginPassword.classList.add("is-invalid");
        LoginPassword.classList.remove("is-valid");
        msgPassword.classList.remove("d-none");
        return false;
    }
}

if (signName) {
    signName.addEventListener("input", function () {
        signName.classList.remove("is-invalid");
        signName.classList.remove("is-valid");
        document.getElementById("msgName").classList.add("d-none");
    });
}

if (signEmail) {
    signEmail.addEventListener("input", function () {
        signEmail.classList.remove("is-invalid");
        signEmail.classList.remove("is-valid");
        document.getElementById("msgEmail").classList.add("d-none");
    });
}

if (signPassword) {
    signPassword.addEventListener("input", function () {
        signPassword.classList.remove("is-invalid");
        signPassword.classList.remove("is-valid");
        document.getElementById("msgPassword").classList.add("d-none");
    });
}
if (LoginEmail) {
    LoginEmail.addEventListener("input", function () {
        LoginEmail.classList.remove("is-invalid", "is-valid");
        document.getElementById("msgLoginEmail").classList.add("d-none");

        const msgDiv = document.getElementById("msgDiv");
        if (msgDiv) msgDiv.classList.add("d-none");
    });
}

if (LoginPassword) {
    LoginPassword.addEventListener("input", function () {
        LoginPassword.classList.remove("is-invalid", "is-valid");
        document.getElementById("msgLoginPassword").classList.add("d-none");

        const msgDiv = document.getElementById("msgDiv");
        if (msgDiv) msgDiv.classList.add("d-none");
    });
}

if (btnSignup) {
    btnSignup.addEventListener('click', signUp);
}

if (btnLogin) {
    btnLogin.addEventListener('click', login);
}
if (btnLogout) {
    btnLogout.addEventListener('click', () => logout())
}

document.addEventListener("DOMContentLoaded", () => {
    const protectedPages = ["home.html", "dashboard.html"]; // الصفحات المحمية
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const welcomeElement = document.querySelector('.user-name');

        if (!user || !user.logged) {
            window.location.href = "index.html";
            return;
        }

        if (welcomeElement) {
            welcomeElement.textContent = `Welcome ${user.name}`;
        }
    }
});


