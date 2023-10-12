// Cart Open or Close
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('cart-active')
}
closeCart.onclick = () => {
  cart.classList.remove('cart-active')
}