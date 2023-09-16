document.addEventListener("DOMContentLoaded", () => {
    glide = document.querySelector('.glide')

    if (glide) {
        var slidesDiv = document.querySelector('.glide__slides');

        Array.from(slidesDiv.parentElement.childNodes).forEach(node => {
            if (!node.classList || !node.classList.contains('glide__slides')) {
                node.remove();
            }
        });

        var navigation = '<div class="glide__bullets" data-glide-el="controls[nav]">';
        var slideNum = 0;

        document.querySelectorAll('.glide__slide').forEach(slide => {
            var imgSrc = slide.querySelector('img').src;
            navigation += '<button class="glide__bullet" data-glide-dir="=' + slideNum + '" style="background-image:url(' + imgSrc + ')"></button>';
            slideNum++;
        });

        navigation += '</div>';

        slidesDiv.insertAdjacentHTML('afterend', navigation);

        const settings = {
            type: "carousel",
            startAt: 0,
            perView: 1,
            gap: 0,
            animationDuration: 300,
            animationTimingFunc: "cubic-bezier(0.26, 0.52, 0.26, 0.91)",
            rewindDuration: 1600,
        };

        const products = new Glide(".glide", settings);

        products.mount();
    }
});
