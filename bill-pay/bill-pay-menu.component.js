window.billPayMenuComponent = Vue.extend({
    template: `
        
            <div class="pull-right" v-for="o in menus">
                <a class="btn btn-default" v-link="{name: o.routeName}">{{ o.name }}</a>&nbsp;&nbsp;
            </div>
`,
    data: function () {
        return {
            menus: [
                {name: "Listar", routeName: 'bill-pay.list'},
                {name: "Criar conta", routeName: 'bill-pay.create'}
            ],
        };
    }
});