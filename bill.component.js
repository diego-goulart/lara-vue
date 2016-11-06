window.billComponent = Vue.extend({
    template: `
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <ul class="nav navbar-nav">
                <li v-for="o in dashboardMenus">
                    <a v-link="{name: o.routeName}">{{ o.name }}</a>
                </li>
            </ul>
        </div>
    </nav>
<div class="container-fluid">
    <router-view></router-view>
</div>
`,
    data: function () {
        return {
            dashboardMenus: [
                {name: "Dashboard", routeName: 'dashboard'},
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive.list'}
            ],
        };
    }
});