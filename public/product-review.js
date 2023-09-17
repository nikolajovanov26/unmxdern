// check local storage to see if he has already posted a review on the product

reviewForm = document.querySelector('#review-form')
submitButton = document.querySelector('#post-comment')
reviewsDiv = document.querySelector('#review-list')

document.querySelector('#email-3').value = localStorage.getItem("email");
document.querySelector('#isValid').value = localStorage.getItem("valid");

parts = window.location.href.split('/');
document.querySelector('#url').value = parts.at(-1);

reviewForm.addEventListener('submit', function () {
    setTimeout(function(){
        reviewForm.remove()

        newReview = '<div id="review-list" class="review-list"><div class="review-header"><div class="review-author">Full Name</div><div class="review-date">Just now</div></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p></div>'
        reviewsDiv.innerHTML = newReview + reviewsDiv.innerHTML;
    });
})

