category = 'all';
sale = false;
priceMin = 1;
priceMax = 500;

document.querySelector('[data-filter-category=all]').addEventListener('click', function () {
    document.querySelectorAll('[data-filter-category]').forEach(div => {
        if(div.dataset.filterCategory === 'all') {
            div.classList.add('active')
        } else {
            div.classList.remove('active')
        }
    })

    category = 'all';
    filter()
})


document.querySelector('[data-filter-category=men]').addEventListener('click', function () {
    document.querySelectorAll('[data-filter-category]').forEach(div => {
        if(div.dataset.filterCategory === 'men') {
            div.classList.add('active')
        } else {
            div.classList.remove('active')
        }
    })

    category = 'men';
    filter()
})

document.querySelector('[data-filter-category=women]').addEventListener('click', function () {
    document.querySelectorAll('[data-filter-category]').forEach(div => {
        if(div.dataset.filterCategory === 'women') {
            div.classList.add('active')
        } else {
            div.classList.remove('active')
        }
    })

    category = 'women';
    filter()
})

document.querySelector('[data-filter-category=accessories]').addEventListener('click', function () {
    document.querySelectorAll('[data-filter-category]').forEach(div => {
        if(div.dataset.filterCategory === 'accessories') {
            div.classList.add('active')
        } else {
            div.classList.remove('active')
        }
    })

    category = 'accessories';
    filter()
})

document.querySelector('[data-filter-category="sale"]').addEventListener('click', function () {
    sale = !sale
    document.querySelector('[data-filter-category="sale"]').classList.toggle('checked')

    document.querySelector('[data-filter-category="sale"] img').style.display = sale ? 'block' : 'none'
    filter()
})

min.addEventListener('change', function () {
    console.log('ok')
})

function filter()
{
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

    if (sale)  {
        document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
            if (div.querySelector('[data-filter-tag]').innerText !== 'Sale') {
                div.style.display = 'none';
            }
        })
    }

    document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
        if (div.querySelector('[data-filter="price"]').innerText.replace(/\D/g, '') / 100
            < min.innerHTML.replace(/\D/g, '')) {
            div.style.display = 'none';
        }
    })

    document.querySelectorAll('.product-div.w-dyn-item').forEach(div => {
        if (div.querySelector('[data-filter="price"]').innerText.replace(/\D/g, '') / 100
            > max.innerHTML.replace(/\D/g, '')) {
            div.style.display = 'none';
        }
    })
}

rangeInput.forEach(input => {
    input.addEventListener("input", debounce(function () {
        filter()
    }, 250));
});
