const containers = document.querySelectorAll(".zoom-image-div");
const images = document.querySelectorAll(".zoom-image-div img");

const enabledStates = new Array(containers.length).fill(false);

containers.forEach((container, index) => {
    container.addEventListener("mousemove", (e) => onZoom(e, index));
    container.addEventListener("mouseover", (e) => onZoom(e, index));
    container.addEventListener("click", (e) => toggleZoom(e, index));
    container.addEventListener("mouseleave", () => offZoom(index));
});

function onZoom(e, index) {
    if (enabledStates[index]) {
        const rect = containers[index].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        images[index].style.transformOrigin = `${x}px ${y}px`;
        images[index].style.transform = "scale(1.5)";
    }
}

function toggleZoom(e, index) {
    if (enabledStates[index]) {
        enabledStates[index] = false;
        images[index].style.transformOrigin = `center center`;
        images[index].style.transform = "scale(1)";
    } else {
        enabledStates[index] = true;
        const rect = containers[index].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        images[index].style.transformOrigin = `${x}px ${y}px`;
        images[index].style.transform = "scale(1.5)";
    }
}

function offZoom(index) {
    enabledStates[index] = false;
    images[index].style.transformOrigin = `center center`;
    images[index].style.transform = "scale(1)";
}
