const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
  {id: 4, title: 'Какая-то хрень'},
];

const renderProduct = (title, price = 'уточняйте у продавца') => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
          </div>`;
};

const renderProducts = goodsList => {
  const productsList = goodsList.map(good => renderProduct(good.title, good.price));
  productsListOut = document.querySelector('.products');
  productsList.forEach(function (item) {
      productsListOut.innerHTML += item;
  })

};

renderProducts(products);
