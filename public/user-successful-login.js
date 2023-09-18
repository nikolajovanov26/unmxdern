localStorage.setItem("valid", true);

fetch("https://app.unmxdern.com/api/user-data?email=" + localStorage.getItem("email"))
    .then((response) => response.json())
    .then((json) => localStorage.setItem("name", json.user));

window.location.href = "/";
