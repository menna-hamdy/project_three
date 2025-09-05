let productsincart = JSON.parse(localStorage.getItem("productsincart")) || [];let allProducts = document.querySelector(".add_products")
let total_price=document.querySelector(".totalprice")
let badge=document.querySelector(".badge")

if (productsincart.length) {
    badge.style.display = "block";
    updateBadge();
    drawcartproducts(productsincart);
} else {
    badge.style.display = "none";
}
// ====================================
function drawcartproducts(products) {
    let Tprice = 0;   

    let y = products.map((item) => {
        let cleanPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        Tprice += cleanPrice * (item.quantity || 1);

        return `
        <div class="div_card" data-id="${item.id}">
          <div class="div_img">
            <img src=${item.source} alt="">
          </div>
          <div class="div_cont">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-price">Price : ${item.price}</p>
            <p class="cart-category">Category : ${item.Category}</p>
            <div class="number_item">
              <i class="fas fa-minus minus"></i>
              <span class="num">${item.quantity || 1}</span>
              <i class="fas fa-plus plus"></i>
              <a href="#" class="btn btn-primary remove">Remove From Cart</a>
            </div>
          </div>
        </div>
        `;
    });

    allProducts.innerHTML = y.join("");
    total_price.textContent = `Total price is ${Tprice.toFixed(2)} EGP`;

    document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
            let parent = btn.closest(".div_card");
            let id = parseInt(parent.dataset.id);

            productsincart = JSON.parse(localStorage.getItem("productsincart")) || [];
            let product = productsincart.find(p => p.id === id);
            product.quantity = (product.quantity || 1) + 1;

            saveAndRedraw();
        });
    });

    document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
            let parent = btn.closest(".div_card");
            let id = parseInt(parent.dataset.id);

            productsincart = JSON.parse(localStorage.getItem("productsincart")) || [];
            let product = productsincart.find(p => p.id === id);
            product.quantity = (product.quantity || 1) - 1;

            if (product.quantity < 1) {
                productsincart = productsincart.filter(p => p.id !== id);
            }
            saveAndRedraw();
        });
    });

    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            let parent = btn.closest(".div_card");
            let id = parseInt(parent.dataset.id);

            productsincart = JSON.parse(localStorage.getItem("productsincart")) || [];
            productsincart = productsincart.filter(p => p.id !== id);

            saveAndRedraw();
        });
    });
}

function updateBadge() {
    let productsincart = JSON.parse(localStorage.getItem("productsincart")) || [];
    badge.innerHTML = productsincart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    badge.style.display = productsincart.length ? "block" : "none";
}

function saveAndRedraw() {
    localStorage.setItem("productsincart", JSON.stringify(productsincart));
    drawcartproducts(productsincart);
    updateBadge();
}
// ==========================================================================================
let products_sort_live = localStorage.getItem("productlove");
let productslove = document.querySelector(".productlove");
let itemslove = document.querySelector(".itemslove");
let Favorite=document.querySelector('.Favorite')
if (products_sort_live) {
   let item = JSON.parse(products_sort_live);
   drawloveProducts(item);
}

function drawloveProducts(products) {
    let y = products.map((item) => {
        return `
        <div class="card" data-id="${item.id}">
          <img src="${item.source}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="cart-category">Category : ${item.Category}</p>
              <div>
                <i class="fas fa-heart heart" style="color:red"></i>
              </div>
          </div>
        </div>`;
    });
    
    productslove.innerHTML = y.join("");
    if (productslove){
        itemslove.style.display = "block";
        Favorite.style.display = "block";
    }else{
         itemslove.style.display = "none";
        Favorite.style.display = "none";
    }

    document.querySelectorAll(".heart").forEach(heart => {
        heart.addEventListener("click", () => {
            let parent = heart.closest(".card");
            let id = parseInt(parent.dataset.id);

            let productlove = JSON.parse(localStorage.getItem("productlove")) || [];
            productlove = productlove.filter(p => p.id !== id);

            localStorage.setItem("productlove", JSON.stringify(productlove));

            drawloveProducts(productlove);
        });
    });
}

// ///////////////////////////////////////////////////////////////////////////////







