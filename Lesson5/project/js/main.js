const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogProductUrl: '/catalogData.json',
        cartlistUrl: '/getBasket.json',
        products: [],
        cartlist:[],
        filtered: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        searchLine: ''
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product){
            console.log(product.id_product);
        },

        filterGoods(searchLine) {
            console.log(searchLine);
            const regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },

        cartVisibility(){
            document.querySelector('.cart-block').classList.toggle('invisible');
        }

    },
    mounted(){
        this.getJson(`${API + this.catalogProductUrl}`)
            .then(data => {
            //    console.log(data);
                if(data !== undefined) {
                    for (let el of data) {
                        this.products.push(el);
                    }
                } else document.querySelector('.product-empty').classList.remove('invisible');
            });


        this.getJson(`${API + this.cartlistUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartlist.push(el);
                }
            });
    },
});
