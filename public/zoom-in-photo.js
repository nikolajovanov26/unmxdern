container = document.querySelector(".zoom-image-div");
img = document.querySelector(".zoom-image-div img");
enabled = false;

container.addEventListener("mousemove", onZoom);
container.addEventListener("mouseover", onZoom);
container.addEventListener("click", toggleZoom);

function onZoom(e) {
    if (enabled) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = "scale(1.5)";
    }
}

function toggleZoom(e) {
    if (enabled) {
        enabled = false;
        img.style.transformOrigin = `center center`;
        img.style.transform = "scale(1)";
    } else {
        enabled = true;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = "scale(1.5)";
    }
}

container.addEventListener("mouseleave", offZoom);
function offZoom(e) {
    enabled = false;
    img.style.transformOrigin = `center center`;
    img.style.transform = "scale(1)";
}
