// when everything is loaded
const ready = () => {
  const removeCartButtons = document.getElementsByClassName('cart-remove');
  for (const button of removeCartButtons) {
    button.addEventListener('click', removeCartItem)
  }
  // Quantity Change
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (const input of quantityInputs) {
    input.addEventListener('change', quantityChanged);
  }
  // Add to cart
  const addCart = document.getElementsByClassName('add-cart');
  for (const button of addCart) {
    button.addEventListener('click', addCartClicked);
  }
  loadCartItems();
}

// Remove Cart Item
const removeCartItem = (event) => {
  const buttonClicked = event.target;
  // Removes the button's parent container, which represents the removal of the corresponding item.
  buttonClicked.parentElement.remove();
  updateTotal();
  saveCartItems();
  updateCartIcon();
}

// Quantity Change
const quantityChanged = (event) => {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
  saveCartItems();
  updateCartIcon();
}

// Add Cart function
const addCartClicked = (event) => {
  const button = event.target;
  const shopProducts = button.parentElement;
  const title = shopProducts.querySelector('.product-title').innerText;
  const price = shopProducts.querySelector('.price').innerText;
  const productImg = shopProducts.querySelector('.product-img').src;
  addProductToCart(title, price, productImg);
  updateTotal();
  saveCartItems();
  updateCartIcon();
}

// Add Product To Cart
const addProductToCart = (title, price, productImg) => {
  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.querySelector('.cart-content');
  const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (const cartItemsName of cartItemsNames) {
    if (cartItemsName.innerText == title) {
      alert('You have already added this item to cart');
      return;
    }
  }
  const cartBoxContent = `
  <img src=${productImg} alt="" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" name="" id="" value="1" class="cart-quantity">
  </div>
  <i class='bx bx-trash cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .querySelector('.cart-remove')
    .addEventListener('click', removeCartItem);
  cartShopBox
    .querySelector('.cart-quantity')
    .addEventListener('change', quantityChanged);
  saveCartItems();
  updateCartIcon();
}

// Update Total
const updateTotal = () => {
  const cartContent = document.querySelector('.cart-content');
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (const cartBox of cartBoxes) {
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.cart-quantity');
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  document.querySelector('.total-price').innerText = '$' + total.toFixed(2);
  // Save Total to LocalStorage
  localStorage.setItem('cartTotal', total);
}

//Keep Item in cart when page refresh with localstorage
const saveCartItems = () => {
  const cartContent = document.querySelector('.cart-content');
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  const cartItems = [];
  for (const cartBox of cartBoxes) {
    const titleElement = cartBox.querySelector('.cart-product-title');
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.cart-quantity');
    const productImg = cartBox.querySelector('.cart-img');

    const item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg.src,
    };
    cartItems.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

//Loads in Cart from localstorage
const loadCartItems = () => {
  let cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    for (const item of cartItems) {
      addProductToCart(item.title, item.price, item.productImg);

      const cartBoxes = document.getElementsByClassName('cart-box');
      const cartBox = cartBoxes[cartBoxes.length - 1];
      const quantityElement = cartBox.querySelector('.cart-quantity');
      quantityElement.value = item.quantity;
    }
  }
  const cartTotal = localStorage.getItem('cartTotal');
  if (cartTotal) {
    document.querySelector('.total-price').innerText = '$' + cartTotal;
  }
  updateCartIcon();
}

// Quantity in Cart Icon
const updateCartIcon = () => {
  const cartBoxes = document.getElementsByClassName('cart-box');
  let quantity = 0;
  for (const cartBox of cartBoxes) {
    const quantityElement = cartBox.querySelector('.cart-quantity');
    quantity += parseInt(quantityElement.value);
  }
  const cartIcon = document.querySelector('#cart-icon');
  cartIcon.setAttribute('data-quantity', quantity);
}

// Clear Cart Item after successful payment
const clearCart = () => {
  const cartContent = document.querySelector('.cart-content');
  cartContent.innerHTML = '';
  updateTotal();
  localStorage.removeItem('cartItems');
}

export {
  ready,
  updateCartIcon,
  clearCart
};
