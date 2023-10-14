// Cart Open or Close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('cart-active')
}
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove('cart-active')
}

// Add to Cart
// A função é chamada quando tudo estiver carregado.
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready() {
  const removeCartButtons = document.getElementsByClassName('cart-remove');
  for (let index = 0; index < removeCartButtons.length; index++) {
    const button = removeCartButtons[index];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity Change
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let index = 0; index < quantityInputs.length; index++) {
    const input = quantityInputs[index];
    input.addEventListener('change', quantityChanged);
  }
}

// Remove Cart Item
function removeCartItem(event) {
  const buttonClicked = event.target;
  // Remove o contêiner pai do botão, que representa a remoção do item correspondente.
  buttonClicked.parentElement.remove();
}

// Quantity Change
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Update Total
function updateTotal() {
  const cartContent = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (let index = 0; index < cartBoxes.length; index++) {
    const cartBox = cartBoxes[index];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}