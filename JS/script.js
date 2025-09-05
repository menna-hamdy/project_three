let poducts = [
  {
    id: 1,
    title: "BQ2401",
    price: "12,055.50 EGP ",
    Category: "Men watches",
    source: "images/img2.png"
  },
  {
    id: 2,
    title: "BQ2814",
    price: "10,795.50 EGP ",
    oldprice: "11,995.00 EGP",
    Category: "Men watches",
    source: "images/img1.png"
  },
  {
    id: 3,
    title: "JC1L032L0035",
    price: "3,150.00 EGP ",
    oldprice: "3,500.00  EGP",
    Category: "Women watches",
    source: "images/img3.png"
  },
  {
    id: 4,
    title: "MF0047L.02",
    price: "2,250.00  EGP ",
    Category: "Women watches",
    source: "images/img4.png"
  },
  {
    id: 5,
    title: "W1157L1",
    price: "11,709.00 EGP ",
    oldprice: "13,010.00 EGP",
    Category: "Women watches",
    source: "images/img5.png"
  },
  {
    id: 6,
    title: "Amazon Echo Frames (3rd Gen)",
    price: "11,699.10 EGP ",
    oldprice: "12,999.00 EGP",
    Category: "smart glasses",
    source: "images/img6.png"
  },
  {
    id: 7,
    title: "Tommy Hilfiger Bifold Wallet-3",
    price: "1,215.00 EGP ",
    Category: "Men Wallet",
    source: "images/img7.png"
  },
  {
    id: 8,
    title: "CK Set of Wallet and Belt-6",
    price: "1,755.00 EGP ",
    oldprice: "1,950.00 EGP",
    Category: "Men Belt",
    source: "images/img8.png"
  },
  {
    id: 9,
    title: "Women's Bracelet -7",
    price: "495.00 EGP ",
    Category: "Women's Bracelet",
    source: "images/img9.png"
  },
  {
    id: 10,
    title: "Guess Women's MINI BAG-3",
    price: "2,250.00 EGP ",
    oldprice: "2,500.00 EGP",
    Category: "Women Bages",
    source: "images/img10.png"
  },
  {
    id: 11,
    title: "Women's Bracelet -15",
    price: "550.00 EGP ",
    Category: "Women's Bracelet",
    source: "images/img11.png"
  },
  {
    id: 12,
    title: "OZARO SMART SUNGLASSES-2",
    price: "2,835.00 EGP ",
    oldprice: "3,150.00 EGP",
    Category: "smart glasses",
    source: "images/img12.png"
  }
];

// ============================
let cartItems = localStorage.getItem("productsincart")
  ? JSON.parse(localStorage.getItem("productsincart"))
  : [];
let cartlove = localStorage.getItem("productlove")
  ? JSON.parse(localStorage.getItem("productlove"))
  : [];

// ============================
let all_poducts = document.querySelector(".products");

function drawproduct(list = poducts) {
  let poduct = list.map((item) => {
    let oldPriceHTML = item.oldprice
      ? `&nbsp;&nbsp;<del style="color: red;">${item.oldprice}</del>`
      : "";

    let inCart = cartItems.some((p) => p.id === item.id);
    let btnText =
      inCart && localStorage.getItem("firstname")
        ? "Remove From Cart"
        : "Add To Cart";
    let btnColor =
      inCart && localStorage.getItem("firstname") ? "red" : "blue";
    let btnborder =
      inCart && localStorage.getItem("firstname") ? "red" : "blue";

    let inCartlove = cartlove.some((p) => p.id === item.id);
    let heartColor =
      inCartlove && localStorage.getItem("firstname") ? "red" : "black";

    return `
     <div class="card">
        <img src="${item.source}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-price">Price : ${item.price} ${oldPriceHTML}</p>
          <p class="cart-category">Category : ${item.Category}</p>
          <div>
            <i class="fas fa-heart" style="color:${heartColor}" onclick="saveliveproduct(${item.id},this)"></i>
            <a href="#" 
               class="btn btn-primary ADD" 
               style="background-color:${btnColor};border:solid ${btnborder}" 
               onclick="addtocart(${item.id},this)">
               ${btnText}
            </a>
          </div>
        </div>
      </div>`;
  });

  all_poducts.innerHTML = poduct.join("");
}

drawproduct();

// ================================================================================
// Search
let searchType = document.querySelector(".form-select");
let searchInput = document.querySelector(".form-control");
let searchForm = document.querySelector("form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!localStorage.getItem("firstname")) {
    alert("You must log in first to use search!");
    return;
  }

  let query = searchInput.value.toLowerCase().trim();
  let type = searchType.value;

  let filtered = poducts.filter((item) => {
    if (type === "search by product name") {
      return item.title.toLowerCase().includes(query);
    } else if (type === "search by category") {
      return item.Category.toLowerCase().includes(query);
    }
    return true;
  });

  drawproduct(filtered);
});

function updateDatalist() {
  let datalist = document.querySelector("#dynamicList");
  if (datalist) datalist.remove();

  let options = [];

  if (searchType.value === "search by product name") {
    options = [...new Set(poducts.map((p) => p.title.toLowerCase()))];
  } else if (searchType.value === "search by category") {
    options = [...new Set(poducts.map((p) => p.Category.toLowerCase()))];
  }

  if (options.length > 0) {
    datalist = document.createElement("datalist");
    datalist.id = "dynamicList";
    datalist.innerHTML = options.map((o) => `<option value="${o}">`).join("");

    searchInput.setAttribute("list", "dynamicList");
    document.body.appendChild(datalist);
  } else {
    searchInput.removeAttribute("list");
  }
}

searchType.addEventListener("change", updateDatalist);
updateDatalist();

// ================================================================================
// Wishlist
function saveliveproduct(id, heart) {
  if (!localStorage.getItem("firstname")) {
    alert("You must log in first to use wishlist!");
    // cartlove.splice(index, 1);
    // heart.style.color = "black";
    return;
  }

  let choosenlove = poducts.find((item) => item.id === id);
  let index = cartlove.findIndex((p) => p.id === id);

  if (index === -1) {
    cartlove = [...cartlove, choosenlove];
    heart.style.color = "red";
  } else {
    cartlove.splice(index, 1);
    heart.style.color = "black";
  }

  localStorage.setItem("productlove", JSON.stringify(cartlove));
}

// ================================================================================
// Cart
let badge = document.querySelector(".badge");
let carts_products = document.querySelector(".carts_products");
let carts_products_div = document.querySelector(".carts_products div");

if (localStorage.getItem("firstname")) {
  function addtocart(id, btn) {
    if (!localStorage.getItem("firstname")) {
    alert("You must log in first to use addation to cart!");
    // btn.textContent = "Add To Cart";
    // btn.style.backgroundColor = "blue";
    // btn.style.border = "blue";
    return;
    }
    let choosenitem = poducts.find((item) => item.id === id);
    let index = cartItems.findIndex((p) => p.id === id);

    if (index === -1) {
      choosenitem.quantity = 1;
      cartItems = [...cartItems, choosenitem];
      btn.innerHTML = "Remove From Cart";
      btn.style.backgroundColor = "red";
      btn.style.border = "red";
    } else {
      cartItems.splice(index, 1);
      btn.textContent = "Add To Cart";
      btn.style.backgroundColor = "blue";
      btn.style.border = "blue";
    }

    localStorage.setItem("productsincart", JSON.stringify(cartItems));
    renderCart();
    drawproduct();
  }

  function renderCart() {
    carts_products_div.innerHTML = "";

    cartItems.forEach((item) => {
      carts_products_div.innerHTML += `
        <div class="div_cont" data-id="${item.id}">
          <div class="conttttt">
            <div class="name">${item.title}</div>
            <div class="price">price: ${item.price}</div>
            <div class="num_item">
              <i class="fas fa-minus minus"></i>
              <span class="num">${item.quantity || 1}</span>
              <i class="fas fa-plus plus"></i>
            </div>
          </div>
        </div>`;
    });

    badge.innerHTML = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );

    document.querySelectorAll(".plus").forEach((plusBtn) => {
      plusBtn.addEventListener("click", () => {
        let parentDiv = plusBtn.closest(".div_cont");
        let id = parseInt(parentDiv.dataset.id);

        let product = cartItems.find((p) => p.id === id);
        product.quantity = (product.quantity || 1) + 1;

        localStorage.setItem("productsincart", JSON.stringify(cartItems));
        renderCart();
        drawproduct();
      });
    });

    document.querySelectorAll(".minus").forEach((minusBtn) => {
      minusBtn.addEventListener("click", () => {
        let parentDiv = minusBtn.closest(".div_cont");
        let id = parseInt(parentDiv.dataset.id);

        let product = cartItems.find((p) => p.id === id);
        product.quantity = (product.quantity || 1) - 1;

        if (product.quantity < 1) {
          cartItems = cartItems.filter((p) => p.id !== id);
        }

        localStorage.setItem("productsincart", JSON.stringify(cartItems));
        renderCart();
        drawproduct();
      });
    });
  }

  renderCart();
} else {
  window.location = "signup.html";
}

// ================================================================================
// Cart Icon Toggle
let icon_cart = document.querySelector(".icon_cart");
icon_cart.onclick = function open_cart() {
  if (carts_products_div) {
    if (carts_products.style.display === "block") {
      carts_products.style.display = "none";
    } else {
      carts_products.style.display = "block";
    }
  }
};

// ====================================================================


