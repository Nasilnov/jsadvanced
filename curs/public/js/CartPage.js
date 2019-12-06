Vue.component('cartpage', {
    data(){
      return {
          // imgCart: 'https://placehold.it/50x100',
          cartUrl: '/api/cart',
          cartItems: [],
          showCart: false,
          total: 0,
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
            this.total = this.cartItems.reduce((summa, good) => {
                return summa + good.price * good.quantity;
            }, 0);
            this.$root.setTotal(this.total);
            return this.total;
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
        <table class="shipping__table" width="100%">
                <tr>
                    <td class="shipping__td" width="12.5%"><h2>Product Details</h2></td>
                    <td class="shipping__td" width="25%"></td>
                    <td class="shipping__td shipping_text" width="12.5%"><h2>unite Price</h2></td>
                    <td class="shipping__td shipping_text" width="12.5%"><h2>Quantity</h2></td>
                    <td class="shipping__td shipping_text" width="12.5%"><h2>shipping</h2></td>
                    <td class="shipping__td shipping_text" width="12.5%"><h2>Subtotal</h2></td>
                    <td class="shipping__td shipping_text" width="12.5%"><h2>ACTION</h2></td>
                </tr>
                <!--<cart-item class="cart-item" -->
                <cart-item  
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item"             
                @remove="remove">
                </cart-item>
        </table>
        <p class="invisible">{{cartTotal}}</p>
        </div>
`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                    <tr>
                    <td class="shipping__td">
                        <div class="cart__img">   
                        <img :src="cartItem.img" alt="Some image">
                        </div>
                    </td>         
                    <td class="shipping__td" width="25%">
                        <div class="shipping__descr">
                            <h2>{{cartItem.product_name}}</h2>
                            <div class="add">
                                <p><span>{{cartItem.color}}</span></p>
                                <p><span>{{cartItem.size}}</span></p>
                            </div>   
                        </div>
                    </td>
                    <td class="shipping__td shipping_text" width="12.5%">$ {{cartItem.price}}</td>
                    <td class="shipping__td shipping_text" width="12.5%">{{cartItem.quantity}}</td>
                    <td class="shipping__td shipping_text" width="12.5%">FREE</td>
                    <td class="shipping__td shipping_text" width="12.5%">$ {{cartItem.quantity * cartItem.price}}</td>
                    <td class="shipping__td shipping_text" width="12.5%"><button class="btn-cart" @click="$emit('remove', cartItem)"  @click="$root.$refs.totalprice.cartTotal()"><img src="img/out.png" alt=""></button></td>
                    <!-- 2                    <button class="buy-btn"  @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->

                    </tr>
    `
});
