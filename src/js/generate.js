import { details } from "./portfolio";

const productContainer = document.getElementById("main-div");


if (!productContainer) {
    console.error("Product container not found");
} else {
    console.log("Product container found:", productContainer);

    document.addEventListener("DOMContentLoaded", function () {
        generateProductCards();
    });
}