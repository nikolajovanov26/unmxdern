category = 'all';
sale = false;
products = [false, false, false, false]

if (document.querySelector('[data-filter-category=all]') != null) {
    document.querySelector('[data-filter-category=all]').addEventListener('click', function () {
        document.querySelectorAll('[data-filter-category]').forEach(div => {
            if (div.dataset.filterCategory === 'all') {
                div.classList.add('active')
            } else {
                div.classList.remove('active')
            }
        })

        category = 'all';
        filter()
    })
}


if (document.querySelector('[data-filter-category=men]') != null) {
    document.querySelector('[data-filter-category=men]').addEventListener('click', function () {
        document.querySelectorAll('[data-filter-category]').forEach(div => {
            if (div.dataset.filterCategory === 'men') {
                div.classList.add('active')
            } else {
                div.classList.remove('active')
            }
        })

        category = 'men';
        filter()
    })
}


if (document.querySelector('[data-filter-category=women]') != null) {
    document.querySelector('[data-filter-category=women]').addEventListener('click', function () {
        document.querySelectorAll('[data-filter-category]').forEach(div => {
            if (div.dataset.filterCategory === 'women') {
                div.classList.add('active')
            } else {
                div.classList.remove('active')
            }
        })

        category = 'women';
        filter()
    })
}

if (document.querySelector('[data-filter-category=accessories]') != null) {
    document.querySelector('[data-filter-category=accessories]').addEventListener('click', function () {
        document.querySelectorAll('[data-filter-category]').forEach(div => {
            if (div.dataset.filterCategory === 'accessories') {
                div.classList.add('active')
            } else {
                div.classList.remove('active')
            }
        })

        category = 'accessories';
        filter()
    })
}

document.querySelector('[data-filter-category="sale"]').addEventListener('click', function () {
    sale = !sale
    document.querySelector('[data-filter-category="sale"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="sale"] img').style.display = sale ? 'block' : 'none'
    filter()
})

document.querySelector('[data-filter-category="1-50"]').addEventListener('click', function () {
    products[0] = !products[0]
    document.querySelector('[data-filter-category="1-50"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="1-50"] img').style.display = products[0] ? 'block' : 'none'
    filter()
})

document.querySelector('[data-filter-category="50-100"]').addEventListener('click', function () {
    products[1] = !products[1]
    document.querySelector('[data-filter-category="50-100"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="50-100"] img').style.display = products[1] ? 'block' : 'none'
    filter()
})

document.querySelector('[data-filter-category="100-250"]').addEventListener('click', function () {
    products[2] = !products[2]
    document.querySelector('[data-filter-category="100-250"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="100-250"] img').style.display = products[2] ? 'block' : 'none'
    filter()
})

document.querySelector('[data-filter-category="250-500"]').addEventListener('click', function () {
    products[3] = !products[3]
    document.querySelector('[data-filter-category="250-500"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="250-500"] img').style.display = products[3] ? 'block' : 'none'
    filter()
})

function filter() {
    document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
        div.style.display = 'block'
    })

    if (category === 'men') {
        document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
            if (div.querySelector('[data-filter="category"]').innerText !== 'Men') {
                div.style.display = 'none';
            }
        })
    }

    if (category === 'women') {
        document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
            if (div.querySelector('[data-filter="category"]').innerText !== 'Women') {
                div.style.display = 'none';
            }
        })
    }

    if (category === 'accessories') {
        document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
            if (div.querySelector('[data-filter="category"]').innerText !== 'Accessories') {
                div.style.display = 'none';
            }
        })
    }

    if (sale) {
        saleItems = document.querySelectorAll('.product-div.w-dyn-item');

        if (saleItems.length !== 0) {
            document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
                if (div.querySelector('[data-filter-tag]').innerText !== 'Sale') {
                    div.style.display = 'none';
                }
            })
        } else {
            document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
                div.style.display = 'none';
            })
        }
    }

    if (!products.every(element => element === false)) {
        document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
            productPrice = div.querySelector('[data-filter="price"]').innerText.replace(/\D/g, '') / 100;

            if (!products[0]) {
                if (1 <= productPrice && productPrice <= 50.9) {
                    div.style.display = 'none';
                }
            }

            if (!products[1]) {
                if (51 <= productPrice && productPrice < 100.9) {
                    div.style.display = 'none';
                }
            }

            if (!products[2]) {
                if (101 <= productPrice && productPrice < 250.9) {
                    div.style.display = 'none';
                }
            }

            if (!products[3]) {
                if (251 <= productPrice && productPrice < 500.9) {
                    div.style.display = 'none';
                }
            }
        })
    }
}
