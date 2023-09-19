starRatingDivs = document.querySelectorAll('[rating-star]');
button = document.querySelector('#rating-submit');
ratingStarsDiv = document.querySelector('.rating-stars-div');
ratingInput = document.querySelector('#star-rating');
ratingForm = document.querySelector('#rating-form');

clicked = false

starRatingDivs.forEach((div, index) => {
    div.addEventListener('mouseover', () => {
        if (!clicked) {
            for (let i = 0; i < starRatingDivs.length; i++) {
                if (i <= index) {
                    starRatingDivs[i].querySelector('.star-rating-form-hover').style.opacity = '1';
                } else {
                    starRatingDivs[i].querySelector('.star-rating-form-hover').style.opacity = '0';
                }
            }
        }
    });

    div.addEventListener('click', () => {
        ratingStarsDiv.style.opacity = '1';
        button.style.display = 'block';
        ratingInput.value = index + 1
        clicked = true

        for (let i = 0; i < starRatingDivs.length; i++) {
            if (i <= index) {
                starRatingDivs[i].querySelector('.star-rating-form-hover').style.opacity = '1';
            } else {
                starRatingDivs[i].querySelector('.star-rating-form-hover').style.opacity = '0';
            }
        }
    });
});

ratingForm = document.querySelector('#rating-form');
ratingCount = document.querySelector('#review-cnt');
ratingAvg = document.querySelector('#review-avg');

document.querySelector('#email-rating').value = localStorage.getItem("email");
document.querySelector('#isValid-rating').value = localStorage.getItem("valid");

parts = window.location.href.split('/');
document.querySelector('#url-rating').value = parts.at(-1);

ratingForm.addEventListener('submit', function (e) {
    setTimeout(function () {
        rating = document.querySelector('#star-rating').value;

        newAvg = (Number(ratingCount.innerText) * Number(ratingAvg.innerText) + Number(rating)) / (Number(ratingCount.innerText) + 1)

        ratingCount.innerText = (Number(ratingCount.innerText) + 1);
        ratingAvg.innerText = newAvg

        ratingForm.remove()
    }, 2000)
});



