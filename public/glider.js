
document.querySelector('#option-set-6880adb96d8fc51c4b67e9e4ce4bce7e').addEventListener('click', function () {
    document.querySelectorAll('.glide__slide.gray.w-dyn-item.w-dyn-repeater-item.glide__slide--clone').forEach(div => div.remove())

    element = document.querySelector('.glide__track')
    clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);

    createGlide()
    addZoomInEffect()
});

setTimeout(function () {
    document.querySelector('#option-set-6880adb96d8fc51c4b67e9e4ce4bce7e').click()
}, 150)

function createGlide() {
    glide = document.querySelector('.glide');
    removedScripts = [];

    if (glide) {
        slidesDiv = document.querySelector('.glide__slides');

        Array.from(slidesDiv.parentElement.childNodes).forEach(node => {
            if (node.tagName === 'SCRIPT') {
                removedScripts.push(node);
                node.remove();
            }
        });

        bullets = document.querySelector('.glide__bullets');
        if (bullets !== null) {
            bullets.remove()
        }

        navigation = '<div class="glide__bullets" data-glide-el="controls[nav]">';
        slideNum = 0;

        document.querySelectorAll('.glide__slide').forEach(slide => {
            imgSrc = slide.querySelector('img').src;
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

        var products = new Glide(".glide", settings);

        products.mount();

        removedScripts.forEach(script => {
            slidesDiv.parentElement.appendChild(script);
        });

        addZoomInEffect()
    }
}
