

function modifyBand(id) {
    var xhr = new XMLHttpRequest();
    var url = '/band/' + id; //API path

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 2 && xhr.status == 404) {
            document.getElementById("modifyBand").innerHTML = 'Unable to find band';
        }

        if (xhr.readyState === 4 && xhr.status == 200) {
            var myArr = JSON.parse(xhr.responseText);
            console.log(myArr);
            updateForm(myArr);
        }
    };

    xhr.open('GET', url, true);
    xhr.send();

}

function updateForm(jsonData) {
    var band = jsonData;
    var out = '<h4>' + band.name + '</h4><form id="updateForm" name="updateForm">';

    out += `<div>
                <label for="name">Band Name:</label>
                <input type="text" id="name" name="name" value="` + band.name + `">
            </div>
            <div>
                <label for="city">Origin City:</label>
                <input type="text" id="city" name="city" value="` + band.city + `">
            </div>
            <div>
                <label for="country">Origin Country:</label>
                <input type="text" id="country" name="country" value="` + band.country + `">
            </div>
            <div>
                <label for="yearFormed">Year Formed:</label>
                <input type="text" id="yearFormed" name="yearFormed" value="` + band.yearFormed + `">
            </div>
            <div>
                <label for="genres">Genres:</label>
                <input type="text" id="genres" name="genres" value="` + band.genres.join(', ') + `">
            </div>`;

    out += '<input type="submit" value="Submit" onclick="updateBand(' + band.id + ')"></form>';

    document.getElementById("modifyBand").innerHTML = out;
}

function updateBand(id) {
    var updateForm = document.getElementById('updateForm');
    var formData = new FormData(updateForm);

    var xhr = new XMLHttpRequest();
    var url = '/band/' + id; //API path

    var band = {
        "name": formData.get('name'),
        "city": formData.get('city'),
        "country": formData.get('country'),
        "yearFormed": formData.get('yearFormed'),
        "genres": formData.get('genres').split(',')
    };

    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(band));

    document.getElementById("modifyBand").innerHTML = '';
    showBands();
}
