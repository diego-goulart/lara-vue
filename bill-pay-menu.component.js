window.billPayMenuComponent = Vue.extend({
    template: `
    <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <ul class="nav navbar-nav">
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </div>
</nav>
`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Contas a pagar", routeName: 'bill.list'},
                {id: 1, name: "Criar conta", routeName: 'bill.create'}
            ],
        };
    }
});