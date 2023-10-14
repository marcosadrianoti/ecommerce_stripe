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
}