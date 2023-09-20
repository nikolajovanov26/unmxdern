let fetchCompleted = false;

fetch("https://app.unmxdern.com/api/user-data?email=" + localStorage.getItem("email"))
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('name', data.user);
        fetchCompleted = true;
    })
    .catch((error) => {
        console.error(error);
        fetchCompleted = true;
    });

fetch("https://app.unmxdern.com/api/favorites?email=" + localStorage.getItem("email"))
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('favorites', data.products);
    })
    .catch((error) => {
        console.error(error);
        fetchCompleted = true;
    });

function redirectToHomePage() {
    if (fetchCompleted && localStorage.getItem('name') !== null) {
        window.location.href = "/";
    } else {
        setTimeout(redirectToHomePage, 500);
    }
}

redirectToHomePage();
