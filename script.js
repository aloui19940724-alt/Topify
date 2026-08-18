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

const products = [
{
name: "YouTube Premium",
price: "12 DT",
image: "images/youtube.jpg"
},
{
name: "ChatGPT Go",
price: "15 DT",
image: "images/chatgpt.jpg"
},
{
name: "PUBG UC 60",
price: "4 DT",
image: "images/pubg60.jpg"
},
{
name: "PUBG UC 300",
price: "15 DT",
image: "images/pubg300.jpg"
},
{
name: "Free Fire Diamonds",
price: "5 DT",
image: "images/ff.jpg"
},
{
name: "Google AI Plus",
price: "18 DT",
image: "images/gemini.jpg"
}
];

function renderProducts(items){

const container =
document.getElementById("productsContainer");

container.innerHTML = "";

items.forEach(product => {

container.innerHTML += `
<div class="product">
<img src="${product.image}" alt="${product.name}">
<h3>${product.name}</h3>
<p>${product.price}</p>
</div>
`;

});

}

renderProducts(products);

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

const value =
searchInput.value.toLowerCase();

const filtered =
products.filter(product =>
product.name.toLowerCase().includes(value)
);

renderProducts(filtered);

});
