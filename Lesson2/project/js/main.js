class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 40000},
      {id: 2, title: 'Mouse', price: 1000},
      {id: 3, title: 'Keyboard', price: 2500},
      {id: 4, title: 'Gamepad', price: 1500},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  getGood(id) {
      return this.allProducts.find(good => good.id == id);
  }
}

const list = new ProductList();

class CartItem extends ProductItem {
    constructor(product)  {
        super(product);
        super.img =    product.img;
        this.col =     product.col;

    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">               
                    <div class="cart-cell"><h3>${this.title}</h3></div>
                    <div class="cart-cell"><p>${this.price} \u20bd</p></div>
                    <div class="cart-cell"><p>${this.col} шт. </p></div>          
                    <div class="cart-cell">
                        <div class="cart-add">
                            <div class="plus"> + </div> / 
                            <div class="minus"> - </div>
                         </div>
                    </div>                
                </div>`;
    }
}

class CartList extends ProductList{

    _fetchProducts() {}

    _render() {
        const block = document.querySelector(this.container);
        block.innerHTML = "";
        if (this.goods.length > 0) {
            for (let product of this.goods) {
                const productObject = new CartItem(product);
                this.allProducts.push(productObject);
                block.insertAdjacentHTML('beforeend', productObject.render());
            }
        }
        else {block.insertAdjacentHTML('beforeend', `<div class="cart-empty">Ваша корзина пуста</div>`); }
        block.insertAdjacentHTML('beforeend', `<div class="cart-empty"><button class="empty-btn">Очистить корзину</button></div> 
            <div class="cart-close">X</div>`);
    }

    _addGood(id) {
        let indexGood = this.goods.findIndex(good => good.id == id);
        let product = list.getGood(id);
        if (indexGood != -1) {
            this.goods[indexGood].col += 1;
        }
        else {
            this.goods.push({...product, col: 1});
        }
        this.getSumm();
        this._render();
    }


    _delGood(id) {
        let indexGood = this.goods.findIndex(good => good.id == id);
        if (this.goods[indexGood].col > 1) {
            this.goods[indexGood].col -= 1;
        }
        else {
            this.goods.splice(indexGood,1);
        }
        this.getSumm();
        this._render();
    }

    getSumm() {
        const sumCart = document.querySelector('.sum-cart');
        let sum = this.goods.reduce((summa, good) => {
            return summa + good.price * good.col;
        }, 0);
        let col = this.goods.reduce((col, good) => {
            return col + good.col;
        },0);
        sumCart.innerHTML = `В корзине ${col} товаров на сумму ${sum} рублей`;
    }

    _closeCart() {
        let cartBlock = document.querySelector(cart.container);
        cartBlock.classList.remove('flex');
        cartBlock.classList.add('hide');
    }

    _emptyCart() {
        this.goods = [];
        this.getSumm();
        this._render();
    }
}

const cart = new CartList('.cart');

document.querySelector(list.container)
    .addEventListener('click',event => {
        ClickCart(event)});

function ClickCart(event) {
    if (event.target.className !== 'buy-btn') return;
    cart._addGood(event.target.parentElement.parentElement.dataset.id);
}

document.querySelector('.btn-cart')
    .addEventListener('click',event => {
        ClickBtnCart(event)});

function ClickBtnCart() {
    cart._render();
    let cartBlock = document.querySelector(cart.container);
    cartBlock.classList.remove('hide');
    cartBlock.classList.add('flex');
}

document.querySelector('.cart')
    .addEventListener('click',event => {
       ClickCartIn(event)});

function ClickCartIn (e) {
    let x = e.target.className;

    switch (x) {
        case 'plus': cart._addGood(e.target.parentElement.parentElement.parentElement.dataset.id);
        break;
        case 'minus': cart._delGood(e.target.parentElement.parentElement.parentElement.dataset.id);
        break;
        case 'empty-btn': cart._emptyCart();
        break;
        case 'cart-close': cart._closeCart();
        break;
        default : return;
    }
}




