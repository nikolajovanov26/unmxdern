localStorage.setItem("valid", true);

fetch("https://app.unmxdern.com/api/user-data?email=" . localStorage.getItem("email"))
    .then((response) => response.json())
    .then((json) => console.log(json));

// window.location.href = "/";
