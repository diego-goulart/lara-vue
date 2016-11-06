window.billReceiveMenuComponent = Vue.extend({
    template: `
        
            <div class="pull-right" v-for="o in menus">
                <a class="btn btn-default" v-link="{name: o.routeName}">{{ o.name }}</a>&nbsp;&nbsp;
            </div>
`,
    data: function () {
        return {
            menus: [
                {name: "Listar", routeName: 'bill-receive.list'},
                {name: "Criar Recebimento", routeName: 'bill-receive.create'}
            ],
        };
    }
});