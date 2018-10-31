window.addEventListener("DOMContentLoaded", () => {
    let idInput = document.getElementsByClassName('id_input')[0],
        firstNameInput = document.getElementsByClassName('firstname_input')[0],
        secondNameInput = document.getElementsByClassName('secondname_input')[0],
        orgNameInput = document.getElementsByClassName('orgname_input')[0],
        emailInput = document.getElementsByClassName('email_input')[0],
        form = document.getElementById('form'),
        scoresList = document.querySelector(".scores_list"),
        radioPost = document.getElementById('post'),
        radioPatch = document.getElementById('patch');

    const postObj = {};

    form.addEventListener('submit', ajaxPost);

    // get with fetch
    function getPosts() {
        fetch(`http://localhost:3030/clients?id=${idInput.value}`)
            .then(res => res.json())
            .then(posts => {
                scoresList.textContent = '';
                for (i = 0; i < Object.keys(posts[0]).length - 2; i++) {
                    let li = document.createElement('li'),
                        nameOf = Object.keys(posts[0])[i];

                    let textValues = eval('posts[0].' + nameOf);
                    li.classList.add('score_item');
                    scoresList.appendChild(li);
                    li.setAttribute('name', nameOf);
                    scoresList.appendChild(li);
                    li.textContent = nameOf + ': ' + textValues;
                }
            })
    };

    // (POST, PATCH, PUT) with fetch
    function ajaxPost() {

        let m = '';
        let methodValue = function (m) {
            if (radioPatch.checked) {
                m = "PATCH"
            } else if (radioPost.checked) {
                m = "POST"
            }
            return m
        }

        function newPost(postObj) {

            event.preventDefault();

            postObj.id = idInput.value;
            postObj.first_name = firstNameInput.value;
            postObj.last_name = secondNameInput.value;
            postObj.org_name = orgNameInput.value;
            postObj.email = emailInput.value;

            let options = {
                method: methodValue(m),
                body: JSON.stringify(postObj),
                headers: new Headers({
                    "Content-type": "application/json",
                })
            };
            return fetch("http://localhost:3030/clients", options)
                .then(res => { 
                    if(res.status === 500) {
                        alert('try to change the way you do it')
                    }
                })
                .catch(error => console.error(`Error: ${error}`));
        }
        newPost(postObj);

        // waiting for the server to change data, and then render it to UI
        setTimeout(function () {
            return fetch(`http://localhost:3030/clients?id=${idInput.value}`)
                .then(res => res.json())
                .then(posts => {
                    scoresList.textContent = '';
                    for (i = 0; i < Object.keys(posts[0]).length - 2; i++) {
                        let li = document.createElement('li'),
                            nameOf = Object.keys(posts[0])[i];

                        let textValues = eval('posts[0].' + nameOf);
                        li.classList.add('score_item');
                        scoresList.appendChild(li);
                        li.setAttribute('name', nameOf);
                        scoresList.appendChild(li);
                        li.textContent = nameOf + ': ' + textValues;
                    }
                })
        }, 10)
    }

    // get with XMLHttpRequest
    function getRequestXML() {
        let request = new XMLHttpRequest();

        request.open("GET", "http://localhost:3030/clients?id=9");
        request.responseType = "text";

        request.onload = function () {
            console.log(request.status);
            console.log(request.response)
            let addressValue = JSON.parse(request.response)[0].Address.addr_line_1;
            let address = document.createElement('li');
            scoresList.appendChild(address);
            address.textContent = addressValue;
        };
        request.send();
    };

    // (POST, PATCH, PUT) with XMLHttpRequest
    function patchRequestXML(event) {
        event.preventDefault();

        let request = new XMLHttpRequest(),
            info = {};

        stringInfo = JSON.stringify(info);

        request.open("PATCH", "http://localhost:3030/clients?id=7", false);
        request.setRequestHeader("Content-type", "application/json");
        request.send(stringInfo);
    }

});