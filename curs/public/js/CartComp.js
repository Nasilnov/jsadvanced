Vue.component('cart', {
    data(){
      return {
          // imgCart: 'https://placehold.it/50x100',
          cartUrl: '/api/cart',
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            //console.log(product);
            this.$parent.postJson(`${API + this.cartUrl}`, product)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.deleteJson(`${API + this.cartUrl}`, item)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },

    computed: {
        cartTotal() {
           return this.cartItems.reduce((summa, good) => {
                      return summa + good.price * good.quantity;
                 }, 0);
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                // console.log(data);
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart"><img src="img/Forma_1.svg" alt="cart"></button>
            <div class="cart-block drop__header_cart" v-show="showCart">
                <!--<p v-if="!cartItems.length">Корзина пуста</p>-->
               <div class="drop_block_cart">
               <ul class="mega_ul">
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item"             
                @remove="remove">
                </cart-item>
                </ul>
                         <div class="cart_total">
                                <p>TOTAL</p>
                                <p>$ {{cartTotal}}</p>
                                <!--<p>S{{cartItem.quantity*cartItem.price}}</p>-->
                         </div>
                         <div class="cart_checkout">
                                <a href="#">Checkout</a>
                         </div>
                         <div class="cart_tocart">
                                <a href="cart.html">Go to cart</a>
                         </div>
                </div>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <li class="mega_li">
                  <div class="cart_box">  
                   <div class="cart_box_img">   
                        <img :src="cartItem.img" alt="Some image">
                   </div>                    
                        <div class="cart_box_content">
                            <h3>{{cartItem.product_name}}</h3>
                            <p><img src="img/stars.png" alt=""></p>
                            <p>{{cartItem.quantity}} x S {{cartItem.price}}</p>
                        </div>                    
                    <div class="cart-out">
                        <!--<p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>-->
                        <button class="cart_out" @click="$emit('remove', cartItem)"><img src="img/out.png" alt=""></button>
                    </div>
                  </div>  
                </li>
    `
});
