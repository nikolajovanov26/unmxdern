email = document.querySelector('#wf-log-in-email')
name = document.querySelector('#wf-sign-up-name')
form = document.getElementById("log-in");

form.addEventListener('submit', function () {
    localStorage.setItem("email", email.value);
    localStorage.setItem("valid", true);
    localStorage.setItem("name", name.value)

    fetch("https://app.unmxdern.com/api/new-user", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
});

