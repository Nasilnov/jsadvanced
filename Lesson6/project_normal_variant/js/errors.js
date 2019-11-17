Vue.component('error', {

    template: `
          <div class="errors" v-show="$root.showErr">
            Ошибка соединения с сервером.
        </div>
    `
});

