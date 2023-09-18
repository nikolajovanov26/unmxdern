localStorage.setItem("valid", true);

fetch("https://app.unmxdern.com/api/user-data?email=" + localStorage.getItem("email"))
    .then((response) => response.json())
    .then((data) => localStorage.setItem('name', data.user))
    .catch((error) => console.error(error));

for (i=0; i < 5; i++) {
    if (localStorage.getItem('name') != null) {
        setTimeout(function () {window.location.href = "/";}, 500)
    }
}

localStorage.setItem('name', localStorage.getItem("email"))
window.location.href = "/";
