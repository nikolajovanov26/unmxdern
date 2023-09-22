rangeInput = document.querySelectorAll(".range-input input")
range = document.querySelector(".slider .progress");
min = document.querySelector('#min-price')
max = document.querySelector('#max-price')
priceGap = 1;
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (minVal < maxVal) {
            min.innerHTML = minVal
            max.innerHTML = maxVal
        } else {
            if (e.target.className === "range-min") {
                min.innerHTML = maxVal

            } else {
                max.innerHTML = minVal

            }
        }

        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

            minP = (((minVal / rangeInput[0].max) * 100) - 8);
            maxP = 94 - (maxVal / rangeInput[1].max) * 100

            if (minP + maxP < 55) {
                min.style.left = minP + "%";
                max.style.right = maxP + "%";
            }
        }
    });
});
