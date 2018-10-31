window.addEventListener("DOMContentLoaded", () => {
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
    getRequestXML()
})