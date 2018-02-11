// Created by Nihal Ahmed on :11/02/2018


function loginClick() {
    let data = {
        emailId: document.getElementById('emailId').value,
        password: document.getElementById('password').value
    };
    let option = {
        url: '/password',
        data: data
    };
    ApiHelper.post(option)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function logoutClick() {
    localStorage.setItem('auth_token', '');
    let option = {
        url: '/logout',
        data: ''
    };
    ApiHelper.get(option)
        .then((data) => {
        })
        .catch((error) => {
            console.log(error);
        });
}

function homeClick() {

    let option = {
        url: '/home',
        data: ''
    };
    ApiHelper.get(option)
        .then((data) => {
        })
        .catch((error) => {
            console.log(error);
        });
}