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
}

// Remove Cart Item
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
}