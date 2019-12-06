Vue.component('products', {
    data(){
        return {
            catalogUrl: '/api/products',
            products: [],
            filtered: [],
            // imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <!--<product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>-->
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product' ],
    // props: ['product', 'img'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
          cartAPI: this.$root.$refs.cart,
      };
    },

    template: `
              <div class="smallimg__item">
                    <div class="smallimg__addcatr">
                        <img src="img/cart.svg" alt=""><div class="buy-btn" @click="cartAPI.addProduct(product)">Add to Cart</div>
                    </div>
                    <div class="small__img__box">
                        <img class="smallimg__img" :src="product.img" alt="Some img">
                    </div>
                    <p class="smallimg__text">{{product.product_name}}</p>
                    <p class="smallimg__price">{{product.price}}$</p>
                    <!--<button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>-->
<!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
              </div>`
});
