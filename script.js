class CartItem {
  constructor(index, title, price, imageUrl, quantity = 1) {
    this.index = index;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.element = document.getElementById(`item-${index}`);
    this.updateQuantityElement();
  }

  updateQuantityElement() {
    document.getElementById(`quantity-${this.index}`).textContent = this.quantity;
  }

  increaseQuantity() {
    this.quantity++;
    this.updateQuantityElement();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQuantityElement();
    }
  }

  deleteItem() {
    if (this.element) {
      this.element.remove();
    }
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}

class ShoppingCart {
  constructor(prices, titles, imageUrls) {
    this.items = [];
    this.prices = prices;
    this.titles = titles;
    this.imageUrls = imageUrls;
    this.totalPriceElement = document.getElementById("total-price");
    this.cartCountElement = document.getElementById("cart-count");
  }

  addItem(index) {
    const newItem = new CartItem(index, this.titles[index], this.prices[index], this.imageUrls[index]);
    this.items.push(newItem);
    this.updateCart();
  }

  removeItem(index) {
    const item = this.items.find(item => item.index === index);
    if (item) {
      item.deleteItem();
      this.items = this.items.filter(item => item.index !== index);
      this.updateCart();
    }
  }

  updateTotalPrice() {
    const totalPrice = this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    this.totalPriceElement.textContent = totalPrice.toLocaleString();
  }

  updateCartCount() {
    this.cartCountElement.textContent = this.items.length;
  }

  updateCart() {
    this.updateTotalPrice();
    this.updateCartCount();
  }
}

// Initialisation des prix, titres et images des articles
const prices = [700000, 180900, 430790];
const titles = ['samsung galaxy s24 ultra', 'Tecno camon 30 pro', 'iPhone 14'];
const imageUrls = [
  'https://i.pinimg.com/564x/44/db/f3/44dbf3252affe1b050eef4b7ea01c988.jpg',
  'https://i.pinimg.com/736x/d1/2c/54/d12c5421692a7fb34b8ac1be6aa0be99.jpg',
  'https://i.pinimg.com/564x/f5/c1/66/f5c16671a90ff6094847c3a765d26147.jpg'
];

const cart = new ShoppingCart(prices, titles, imageUrls);

// Ajouter les articles au panier
cart.addItem(0); // Ajouter l'article 0
cart.addItem(1); // Ajouter l'article 1
cart.addItem(2); // Ajouter l'article 2

// Fonction pour gérer l'augmentation de la quantité
function increaseQuantity(index) {
  const item = cart.items.find(item => item.index === index);
  if (item) {
    item.increaseQuantity();
    cart.updateCart();
  }
}

// Fonction pour gérer la diminution de la quantité
function decreaseQuantity(index) {
  const item = cart.items.find(item => item.index === index);
  if (item) {
    item.decreaseQuantity();
    cart.updateCart();
  }
}

// Fonction pour supprimer un article
function deleteItem(index) {
  cart.removeItem(index);
}

// Fonction pour liker un article
function toggleLike(index) {
  const likeButton = document.querySelector(`#item-${index} .like-button`);
  if (likeButton) {
    likeButton.classList.toggle("liked");
  }
}
