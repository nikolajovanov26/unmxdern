searchForm = document.getElementById('wf-form-search-from')
searchInput = document.getElementById('search-products')
products = document.querySelectorAll('[data-search-product]');

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Form submitted (prevented)");
});

searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        alert("Form submitted (prevented)");
    }
});

search = document.getElementById("changeMessage");

searchInput.addEventListener("input", debounce(function () {
    search = searchInput.value;
    filterProducts(search)
}, 250));

function debounce(callback, delay) {
    let timerId;
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(this, arguments);
        }, delay);
    };
}

function filterProducts(search) {
    products.forEach(product => {
        const pattern = new RegExp(search, "i");
        if (pattern.test(product.querySelector('[data-search-name]').innerText)) {
            product.style.display = 'flex'
        } else {
            product.style.display = 'none'
        }
    })
}
