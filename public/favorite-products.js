favorites = localStorage.getItem('favorites').split(',')

document.querySelectorAll('.product-card').forEach(div => {
    if (favorites.includes(div.href.split('/').at(-1))) {
        div.classList.remove('hidden')
    } else {
        div.parentNode.remove()
    }
})

document.querySelectorAll('.fav-product-div').forEach((div) => {
    div.addEventListener('click', function () {
        fetch("https://app.unmxdern.com/api/favorites", {
            method: "DELETE",
            body: JSON.stringify({
                email: localStorage.getItem('email'),
                product: div.parentNode.querySelector('a').href.split('/').at(-1),
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json())
            .then((data) => {
                localStorage.setItem('favorites', data.products);
            })
            .catch((error) => {
                console.error(error);
                fetchCompleted = true;
            });

        div.parentNode.querySelector('a').innerHTML = 'Product Removed'
        div.parentNode.querySelector('a').style.display = 'flex'
        div.parentNode.querySelector('a').style.justifyContent = 'center'
        div.parentNode.querySelector('a').style.alignItems = 'center'
        div.parentNode.querySelector('a').style.color = '#292c39'
        div.parentNode.querySelector('a').style.fontWeight = 900
        div.style.opacity = '0'

        setTimeout(function () {
            div.parentNode.remove()
        }, 1500)
    })
})
