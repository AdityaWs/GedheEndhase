
document.getElementById("action-menu").addEventListener("click", function(){
    document.querySelector(".menu").style.transform = "translateX(0%)";
    document.querySelector(".menu-blur").style.zIndex = "21";
    document.querySelector(".menu-blur").style.opacity = "1";
});

document.getElementById("action-menu-close").addEventListener("click", function(){
    document.querySelector(".menu").style.transform = "translateX(-100%)";
    document.querySelector(".menu-blur").style.opacity = "0";
    setTimeout(function(){
        document.querySelector(".menu-blur").style.zIndex = "-1";
    }, 1000);
});

document.getElementById("action-search").addEventListener("click", function(){
    document.querySelector(".menu--search").style.transform = "translateY(0%)";
});

document.getElementById("action-search-close").addEventListener("click", function(){
    document.querySelector(".menu--search").style.transform = "translateY(-100%)";
});

document.getElementById("action-contact").addEventListener("click", function(){
    document.querySelector(".menu--contact").style.transform = "translateY(0%)";
});

document.getElementById("action-contact-close").addEventListener("click", function(){
    document.querySelector(".menu--contact").style.transform = "translateY(100%)";
});

function showCart() {
    document.querySelector(".menu--cart").style.transform = "translateX(0%)";
    document.querySelector(".menu-blur").style.zIndex = "21";
    document.querySelector(".menu-blur").style.opacity = "1";
}

document.getElementById("action-cart").addEventListener("click", function(){
    document.querySelector(".menu--cart").style.transform = "translateX(0%)";
    document.querySelector(".menu-blur").style.zIndex = "21";
    document.querySelector(".menu-blur").style.opacity = "1";
});

document.getElementById("action-cart-close").addEventListener("click", function(){
    document.querySelector(".menu--cart").style.transform = "translateX(100%)";
    document.querySelector(".menu-blur").style.opacity = "0";
    setTimeout(function(){
        document.querySelector(".menu-blur").style.zIndex = "-1";
    }, 1000);
});


let items = {};
let itemCount = 0;

function addItem(color) {

    items[itemCount] = color;
    itemCount++;
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("itemCount", itemCount.toString());
    displayItem();

}

function removeItem(index) {

    delete items[index];
    localStorage.setItem("items", JSON.stringify(items));
    displayItem();

    if(Object.keys(items).length === 0) {
        itemCount = 0;
        localStorage.setItem("itemCount", itemCount.toString());
    }

}

function displayItem() {

    let element = document.getElementById("cart");
    element.innerHTML = "";

    for (let [key, value] of Object.entries(items)) {
        element.innerHTML += `
            <div>
                <button class="menu--cart--delete-item" onclick="removeItem(${key}); parentElement.remove()"><i class="bi bi-x-lg"></i></button>
                <img src="./images/RenderJacket${value}03.png">
                <div class="menu--cart--info-item">
                    <p>${value} Coffee Leather Jacket</p>
                    <small>IDR 2.000.000</small>
                </div>
            </div>`;
    }

    if(Object.keys(items).length !== 0) {
        element.innerHTML += `
            <div class="menu--cart--checkout">
                <a href="product_checkout.html"><button><i class="bi bi-arrow-right"></i> CHECKOUT</button></a>
            </div>`;
    } else {
        element.innerHTML += `<p style="text-align: center; font-size: 0.875rem; padding: 2rem 0;">Uh oh there nothing here</p>`;
    }

    displayItemOnPage();

}

function displayItemOnPage() {

    if(document.getElementById("cart-items") == null) {
        return;
    }

    let element = document.getElementById("cart-items");
    element.innerHTML = "";

    for (let [key, value] of Object.entries(items)) {
        element.innerHTML += `
            <div>
                <button class="menu--cart--delete-item" onclick="removeItem(${key}); parentElement.remove()"><i class="bi bi-x-lg"></i></button>
                <img src="./images/RenderJacket${value}03.png">
                <div class="menu--cart--info-item">
                    <p>${value} Coffee Leather Jacket</p>
                    <small>IDR 2.000.000</small>
                </div>
            </div>`;
    }

    if(Object.keys(items).length !== 0) {
        document.getElementById("cart-checkout").style.display = "block";
    } else {
        document.getElementById("cart-checkout").style.display = "none";
        element.innerHTML += `<p style="text-align: center; font-size: 0.875rem; padding: 2rem 0;">Uh oh there nothing here</p>`;
    }

}

if(localStorage.getItem("items") != null) {
    items = JSON.parse(localStorage.getItem("items"));
    itemCount = parseInt(localStorage.getItem("itemCount"));
    displayItem();
}

console.log(items);
console.log(itemCount);
