// Professional Add-to-Cart functionality with mini-cart popup
let cart = {}; // Object to store products and quantities
const cartCountElement = document.getElementById('cart-count');

const buttons = document.querySelectorAll('.add-to-cart');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // If product already in cart, increase quantity
    if (cart[productName]) {
      cart[productName].quantity += 1;
    } else {
      cart[productName] = {
        price: productPrice,
        quantity: 1
      };
    }

    // Update total items in cart
    const totalItems = Object.values(cart).reduce(function(sum, item) {
      return sum + item.quantity;
    }, 0);
    cartCountElement.textContent = totalItems;

    // Show mini-cart popup
    showCartPopup();
  });
});

// Function to show mini-cart popup on page
function showCartPopup() {
  var popup = document.getElementById('cart-popup');
  
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'cart-popup';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#0b4c6a';
    popup.style.color = 'white';
    popup.style.padding = '15px 20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    popup.style.zIndex = '1000';
    popup.style.transition = 'opacity 0.5s';
    document.body.appendChild(popup);
  }

  // Build cart content
  var content = '<strong>Cart Summary:</strong><br>';
  var totalPrice = 0;
  for (var product in cart) {
    content += product + ' x ' + cart[product].quantity + ' = $' + (cart[product].price * cart[product].quantity).toFixed(2) + '<br>';
    totalPrice += cart[product].price * cart[product].quantity;
  }
  content += '<strong>Total: $' + totalPrice.toFixed(2) + '</strong>';

  popup.innerHTML = content;

  // Auto-hide after 3 seconds
  popup.style.opacity = '1';
  setTimeout(function() {
    popup.style.opacity = '0';
  }, 3000);
}