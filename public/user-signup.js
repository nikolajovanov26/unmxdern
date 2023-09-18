form = document.querySelector('[data-wf-user-form-type="signup"]');

form.addEventListener('submit', function () {
    localStorage.setItem("email", document.querySelector('#wf-sign-up-email').value);
    localStorage.setItem("valid", true);
    localStorage.setItem("name", document.querySelector('#wf-sign-up-name').value)

    fetch("https://app.unmxdern.com/api/new-user", {
        method: "POST",
        body: JSON.stringify({
            email:  document.querySelector('#wf-sign-up-email').value,
            name: document.querySelector('#wf-sign-up-name').value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
});

