/**
 * Created by Matthew on 2/1/2017.
 */

function bandsTable() {
    var xhr = new XMLHttpRequest();
    var url = '/band'; //API path

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var myArr = JSON.parse(xhr.responseText);
            bandsData(myArr);
            //console.log(xhr.response); //Outputs a DOMString by default
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function bandsData(jsonData) {
    var bands = jsonData;
    var out = '<h1>Bands</h1>' +
        '<table border="2"><tr><th>Name</th><th>Origin City</th><th>Origin Country</th><th>Year Formed</th><th>Action</th></tr>';

    for (var i = 0; i < bands.length; i++) {
        out += '<tr><td>' + bands[i].name + '</td><td>' + bands[i].city + '</td><td>' + bands[i].country + '</td>' +
            '<td>' + bands[i].yearFormed + '</td><td><input type="submit" value="Delete" onclick="deleteBand(' + bands[i].id + ')"></td></tr>';
    }

    out += '</table>';

    document.getElementById("showBands").innerHTML = out;
}

function deleteBand(id) {
    var xhr = new XMLHttpRequest();
    var url = '/band/' + id; //API path

    xhr.open('DELETE', url, true);
    xhr.send();

    showBands();
}

