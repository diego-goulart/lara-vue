window.billPayComponent = Vue.extend({
    template: `

    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h1 class="panel-title pull-left">{{ title }}</h1>
                <menu-component></menu-component>
                <div class="clearfix"></div>
            </div>
            <div class="panel-body">
                <div class="alert" :class="{'alert-danger': status > 0, 'alert-success': status == 0, 'alert-info': status === false}" >
                    <p>
                        {{ status | accountStatus }}
                    </p>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>

    `,
    components: {
        'menu-component': billPayMenuComponent
    },
    data: function () {
        return {
            title: "Contas a pagar",
        }
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billPays;
            if (bills.length == 0) {
                return false
            }

            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
});