parts = window.location.href.split('/');
slug = parts.at(-1);

fetch("https://app.unmxdern.com/api/variant-photos?slug=" + slug, {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then((response) => response.json())
    .then((data) => {
        data.forEach(div => {
            console.log(div)
        })
    })
    .catch((error) => {
        console.error(error);
        fetchCompleted = true;
    });
