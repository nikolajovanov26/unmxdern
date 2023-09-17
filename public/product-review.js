reviewForm = document.querySelector('#review-form');
submitButton = document.querySelector('#post-comment');
reviewsDiv = document.querySelector('#review-list');

document.querySelector('#email-3').value = localStorage.getItem("email");
document.querySelector('#isValid').value = localStorage.getItem("valid");

parts = window.location.href.split('/');
document.querySelector('#url').value = parts.at(-1);

reviewForm.addEventListener('submit', function (e) {

    setTimeout(function () {

        content = document.querySelector('#post-content').value;
        reviewForm.remove()

        newReviewHTML = `
        <div role="listitem" class="w-dyn-item">
            <div class="review">
                <p class="paragraph">${content}</p>
                <div class="review-header footer">
                    <div class="review-author">You</div>
                    <div class="review-date">Just Now</div>
                </div>
            </div>
        </div>
    `;

        // Add the new review to the start of the reviews list
        reviewsDiv.insertAdjacentHTML('afterbegin', newReviewHTML);
    }, 2000)
});
