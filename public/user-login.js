email = document.querySelector('#wf-log-in-email')
form = document.getElementById("log-in");

form.addEventListener('submit', function () {
    localStorage.setItem("email", email.value);
    localStorage.setItem("valid", false);
});
