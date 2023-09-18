localStorage.setItem("valid", true);

fetch("https://app.unmxdern.com/api/user-data?email=" + localStorage.getItem("email"))
    .then((response) => response.json())
    .then((data) => localStorage.setItem('name', data.user))
    .catch((error) => console.error(error));

setTimeout(function () {window.location.href = "/";}, 500)
