document.addEventListener("DOMContentLoaded", () => {
    let glide = document.querySelector('.glide');
    let removedScripts = [];

    if (glide) {
        let slidesDiv = document.querySelector('.glide__slides');

        // Remove the script tags and store them in the removedScripts array
        Array.from(slidesDiv.parentElement.childNodes).forEach(node => {
            if (node.tagName === 'SCRIPT') {
                removedScripts.push(node);
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

        // Listen for the 'run.end' event, which is triggered when the Glide component has finished mounting
        products.on('run.end', () => {
            // Add the removed script tags back to their original place
            removedScripts.forEach(script => {
                slidesDiv.parentElement.appendChild(script);
            });
        });
    }
});
