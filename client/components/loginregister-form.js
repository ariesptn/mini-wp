Vue.component('loginregister-form', {
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            registerName: '',
            registerEmail: '',
            registerPassword: '',
        }
    },
    methods: {
        login: function () {
            login({
                email: this.loginEmail,
                password: this.loginPassword,
            })
        },
        register: function () {
            register({
                name: this.registerName,
                email: this.registerEmail,
                password: this.registerPassword,
            })
        },
    },
    template: `
<div>
    <div class="row">
        <h1>Mini WP</h1>
    </div>
    <div class="row">
        <div v-on:submit.prevent="login" id="loginFrame" class="col">
            <form class="form-group card" id="loginForm">
                <h2>Login</h2>
                <label for="loginEmail" class="control-label">Email</label>
                <input type="email" class="form-control" v-model="loginEmail">
                <label for="loginPassword" class="control-label">Password</label>
                <input type="password" class="form-control" v-model="loginPassword">
                <button id="loginSubmit" class="btn btn-primary">Login</button>
            </form>
        </div>

        <div id="registerFrame" class="col">
            <div class="form-group card" id="registerForm">
                <h2>Register</h2>
                <label for="registerName" class="control-label">Name</label>
                <input type="text" class="form-control" v-model="registerName">
                <label for="registerEmail" class="control-label">Email</label>
                <input type="email" class="form-control" v-model="registerEmail">
                <label for="registerPassword" class="control-label">Password</label>
                <input type="password" class="form-control" v-model="registerPassword">
                <button v-on:click="register" id="registerSubmit" class="btn btn-primary">Register</button>
            </div>
        </div>
    </div>
</div>`
})
