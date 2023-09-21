parts = window.location.href.split('/');
slug = parts.at(-1);
buttons = document.querySelectorAll('.variant-button')

fetch("https://app.unmxdern.com/api/variant-photos?slug=" + slug, {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then((response) => response.json())
    .then((data) => {
        data.forEach(div => {
            buttons.forEach(btn => {
                if (btn.querySelector('div').innerText === div.name) {
                    btn.style.backgroundImage = 'url("' + div.url + '")';
                    btn.querySelector('div').innerText = '';
                }
            })
        })
    })
    .catch((error) => {
        console.error(error);
        fetchCompleted = true;
    });
