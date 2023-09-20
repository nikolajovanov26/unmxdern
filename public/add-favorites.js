favorites = localStorage.getItem('favorites').split(',')

document.querySelectorAll('.fav-product-div').forEach(div => {
    div.addEventListener('mouseover', function () {
        active = div.querySelector('.fav-img-active')

        if (!active.classList.contains('active')) {
            active.style.opacity = '0.3'
        }
    })

    div.addEventListener('mouseleave', function () {
        active = div.querySelector('.fav-img-active')

        if (!active.classList.contains('active')) {
            active.style.opacity = '0'
        }
    })
})

document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
    slugParts = div.querySelector('a').href.split('/');
    slug = slugParts.at(-1);

    if (favorites.includes(slug)) {
        div.querySelector('.fav-img-active').classList.add(('active'))
    }
})

document.querySelectorAll('.fav-product-div').forEach((div) => {
    div.addEventListener('click', function () {
        active = div.querySelector('.fav-img-active')
        if (active.classList.contains('active')) {
            active.classList.remove('active')
            favorites = favorites.filter(e => e !== div.parentNode.querySelector('a').href.split('/').at(-1));

            fetch("https://app.unmxdern.com/api/favorites", {
                method: "DELETE",
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    product: div.parentNode.querySelector('a').href.split('/').at(-1),
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        } else {
            active.classList.add('active')
            active.style.opacity = '1'
            favorites.push(div.parentNode.querySelector('a').href.split('/').at(-1))

            fetch("https://app.unmxdern.com/api/favorites", {
                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    product: div.parentNode.querySelector('a').href.split('/').at(-1),
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        }

        localStorage.setItem('favorites', favorites.join(','))


    })
})
