const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
sidebar.classList.add("active");
overlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
sidebar.classList.remove("active");
overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
sidebar.classList.remove("active");
overlay.classList.remove("active");
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

const value = searchInput.value.toLowerCase();

const products = document.querySelectorAll(".product");

products.forEach(product => {

const title = product.querySelector("h3").textContent.toLowerCase();

if(title.includes(value)){
product.style.display="block";
}else{
product.style.display="none";
}

});

});
