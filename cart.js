const products = [
  {
    id: 1,
    name: "Encebollado",
    price: 3.5,
    image: "encebollado.jpg",
    inStock: false,
  },
  {
    id: 2,
    name: "Ceviche",
    price: 3.0,
    image: "ceviche.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Arroz Marinero",
    price: 12,
    image: "arroz-marinero.png",
    inStock: true,
  },
  {
    id: 4,
    name: "Pescado Frito",
    price: 5.5,
    image: "pescadofrito.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "Encocado de Pescado",
    price: 6.5,
    image: "pescado_encocado.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Filete de Pescado",
    price: 8,
    image: "filete_de_pescado.jpg",
    inStock: true,
  },
];

const productList = document.getElementById("product-list");
function loadProducts() {
  let list = renderItems(products);

  productList.innerHTML = list;
}

function addProduct(product) {
  if (product.inStock) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length > 0) {
      const productExists = products.find(function (p) {
        return p.id == product.id;
      });

      if (productExists) {
        products = products.map(function (p) {
          if (p.id == product.id) {
            p.quantity++;
          }
          return p;
        });
      } else {
        products.push({ ...product, quantity: 1 });
      }
    } else {
      products.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("products", JSON.stringify(products));
    loadCartItems();
  } else {
    alert("producto no disponible");
  }
}

function renderItems(products) {
  let list = "";

  products.forEach((product) => {
    const item = `<div class="border ${
      product.inStock ? "" : "grayscale"
    } border-gray-300 rounded-lg overflow-hidden">
                <img class="aspect-video" src="images/${product.image}" alt="${
      product.name
    }">
                <div class="p-2">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-900">${
                          product.name
                        }</h2>
                        <p class="text-green-600">$${product.price.toFixed(
                          2
                        )}</p>
                    </div>
                    
                    <button id="${
                      product.id
                    }" class="product-button rounded-md bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add to Cart</button>
                </div>
            </div>`;

    list += item;
  });

  return list;
}

function loadCartItems() {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("products")) || [];

  let list = "";

  items.forEach(function (item) {
    const product = `<div class="flex justify-between items-center border-b border-gray-300 py-2">
                <div class="flex items-center">
                <img class="w-12 h-12 object-cover rounded-lg" src="images/${
                  item.image
                }" alt="${item.name}">
                   <div class="flex flex-col">
                    <h2 class="text-base font-bold text-gray-900 ml-2">${
                      item.name
                    }</h2>
                    <p class="text-green-600 ml-2">$${item.price.toFixed(
                      2
                    )} x ${item.quantity}</p>
                    </div>
                </div>
                <button data-id="${
                  item.id
                }" class="btn-remove flex items-center">
                    Remove
                </button>
            </div>`;
    list += product;
  });

  cart.innerHTML = list;

  const removeButtons = document.querySelectorAll(".btn-remove");

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;

      const products = JSON.parse(localStorage.getItem("products")) || [];

      const newProducts = products.filter((product) => product.id != id);

      localStorage.setItem("products", JSON.stringify(newProducts));
      loadCartItems();
    });
  });
}

function events() {
  const buttons = document.querySelectorAll(".product-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const id = e.target.id;

      const product = products.find(function (product) {
        return product.id == id;
      });

      addProduct(product);
    });
  });

  const searchInput = document.getElementById("search");

  searchInput.addEventListener("keypress", (e) => {
    if (e.target.value === "") {
      renderItems(products).innerHTML = "list";
    }
    const searchResult = products.filter((product) => {
      return product.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    if (searchResult.length > 0) {
      const list = renderItems(searchResult);
      productList.innerHTML = list;
    } else {
      productList.innerHTML = "No hay ninguna coincidencia.";
    }
  });
}

(function () {
  loadProducts();
  loadCartItems();
  events();
})();
