let token = localStorage.getItem('token')
let baseUrl = 'http://localhost:3000'
let spinner = `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>`

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    token = ''
    loginVerify()
}

function login(data) {
    axios({
        url: `${baseUrl}/api/users/login`,
        method: 'POST',
        data,
    })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            token = localStorage.getItem('token')
            loginVerify()
        })
        .catch(response => {
            onLoginChecked(false, response)
        })
}

function register(data) {
    axios({
        url: `${baseUrl}/api/users/register`,
        method: 'POST',
        data,
    })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            token = localStorage.getItem('token')
            loginVerify()
        })
        .catch(response => {
            onLoginChecked(false, response)
        })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    //let profile = auth2.currentUser.get().getBasicProfile();
    /*console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log('Token: ' + googleUser.getAuthResponse().id_token)*/
    if (!localStorage.getItem('token')) {
        axios({
            url: `${baseUrl}/api/googleloginverify`,
            headers: {
                'googletoken': googleUser.getAuthResponse().id_token
            }
        })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                token = localStorage.getItem('token')
                loginVerify()

            })
            .catch(response => {
                onLoginChecked(false, response)
            })
    }
}

function loginVerify() {
    if (localStorage.getItem('token')) {
        axios({
            url: `${baseUrl}/api/users/loginverify`,
            headers: { token: localStorage.getItem('token') }
        })
            .then(response => {
                onLoginChecked(true, response.data)
            })
            .catch(response => {
                onLoginChecked(false, response)
            })
    } else {
        onLoginChecked(false, { "message": "Not signed in" })
    }
}

loginVerify()
