starRatingDivs = document.querySelectorAll('[rating-star]');
button = document.querySelector('#rating-submit');
ratingStarsDiv = document.querySelector('.rating-stars-div');
ratingInput = document.querySelector('#star-rating');
ratingForm = document.querySelector('#rating-form');

clicked = false

ratingForm = document.querySelector('#rating-form');
ratingCount = document.querySelector('#review-cnt');
ratingAvg = document.querySelector('#review-avg');

document.querySelector('#email-rating').value = localStorage.getItem("email");
document.querySelector('#isValid-rating').value = localStorage.getItem("valid");

parts = window.location.href.split('/');
document.querySelector('#url-rating').value = parts.at(-1);

updateStars()

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


ratingForm.addEventListener('submit', function (e) {
    setTimeout(function () {
        rating = document.querySelector('#star-rating').value;

        if (Number(ratingCount.innerText) === 0) {
            newAvg = Number(rating)

            document.querySelectorAll('.star-div.w-condition-invisible').forEach((div, index) => {
                if (index < Number(rating)) {
                    div.classList.remove('w-condition-invisible')
                }
            });

            document.querySelector('#review-avg').classList.remove('w-dyn-bind-empty')

        } else {
            newAvg = (Number(ratingCount.innerText) * Number(ratingAvg.innerText) + Number(rating)) / (Number(ratingCount.innerText) + 1)
        }

        ratingCount.innerText = (Number(ratingCount.innerText) + 1);
        ratingAvg.innerText = Math.round(newAvg * 10) / 10

        if (((Number(ratingAvg.innerText) / 1) - newAvg / 1) !== 0) {
            document.querySelectorAll('.star-div').forEach((div, index) => {
                if (index - 0.1 <= newAvg) {
                    div.classList.remove('w-condition-invisible')
                } else {
                    div.classList.add('w-condition-invisible')
                }
            });
        }

        updateStars()


        ratingForm.remove()
    }, 2000)
});


function updateStars() {
    const starDivs = document.querySelectorAll('.star-div:not(.w-condition-invisible)');
    if (starDivs.length > 0) {
        const lastStarDiv = starDivs[starDivs.length - 1];
        widthPercent = Math.round((Number(ratingAvg.innerText) % 1) * 10) / 10
        if (widthPercent !== 0) {
            lastStarDiv.style.width = widthPercent * lastStarDiv.offsetWidth + 'px'
        }
    }
}

document.querySelector('.rate').addEventListener('mouseleave', function () {
    if (!clicked) {
        document.querySelectorAll('.star-rating-form-hover').forEach(div => {
            div.style.opacity = '0'
        });
    }
})
