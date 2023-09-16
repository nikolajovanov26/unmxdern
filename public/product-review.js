// check local storage to see if he has already posted a review on the product

reviewForm = document.querySelector('#review-form')
submitButton = document.querySelector('#post-comment')
reviewsDiv = document.querySelector('#review-list')

reviewForm.addEventListener('submit', function () {
    showLoader();

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            sendData(data.ip);
        });
})

function showLoader() {
    submitButton.disabled = true;
    submitButton.innerText = 'Posting...'
}

function sendData(ip) {
    fetch("https://unmxdern.test/api/review", {
        method: "POST",
        body: JSON.stringify({
            email: localStorage.getItem("email"),
            isValid: localStorage.getItem("valid"),
            // content: document.querySelector('#post-content').value,
            content: 'content',
            url: window.location.href,
            ip: ip
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            setTimeout(function(){
                optimisticReviewPost(json)
            }, 2000);
        });
}

function optimisticReviewPost(json) {
    reviewForm.innerHTML = 'REIVEW POSSTED SUCCESSFULLY'
    // add success message

    newReview = '<div id="review-list" class="review-list"><div class="review-header"><div class="review-author">Full Name</div><div class="review-date">Just now</div></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p></div>'
    reviewsDiv.innerHTML = newReview + reviewsDiv.innerHTML;
}
