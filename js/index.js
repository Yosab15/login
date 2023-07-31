var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var pathparts = location.pathname.split('/');
var url = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    url += '/' + pathparts[i]
}
// console.log(url);
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}
var useres = []
if (localStorage.getItem('users') == null) {
    useres = []
} else {
    useres = JSON.parse(localStorage.getItem('users'))
}
function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}
function isEmailExist() {
    for (var i = 0; i < useres.length; i++) {
        if (useres[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}
function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (useres.length == 0) {
        useres.push(signUp)
        localStorage.setItem('users', JSON.stringify(useres))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        useres.push(signUp)
        localStorage.setItem('users', JSON.stringify(useres))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }

}
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}
function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('loginerror').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < useres.length; i++) {
        if (useres[i].email.toLowerCase() == email.toLowerCase() && useres[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', useres[i].name)
            if (url == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(url + '/home.html')

            }
        } else {
            document.getElementById('loginerror').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
function logout() {
    localStorage.removeItem('sessionUsername')
}