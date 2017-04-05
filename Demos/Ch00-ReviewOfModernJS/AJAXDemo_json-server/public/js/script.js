
function showBands() {
    var xhr = new XMLHttpRequest();
    var url = '/band'; //API path

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 2 && xhr.status == 404) {
            document.getElementById("showBands").innerHTML = 'Unable to access database';
        }

        if (xhr.readyState === 4 && xhr.status == 200) {
            var myArr = JSON.parse(xhr.responseText);
            bandsData(myArr);
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function bandsData(jsonData) {
    var bands = jsonData;
    var out = `<h1>Bands</h1>
               <table border="2"><tr><th>Name</th><th>Origin City</th><th>Origin Country</th><th>Year Formed</th><th>Action</th></tr>`;

    for (var i = 0; i < bands.length; i++) {
        out += '<tr><td>' + bands[i].name + '</td><td>' + bands[i].city + '</td><td>' + bands[i].country + '</td>' +
            '<td>' + bands[i].yearFormed + '</td><td><input type="submit" value="Modify" onclick="modifyBand(' + bands[i].id + ')"> <a href="/band/' + bands[i].id + '">View JSON</a></td></tr>';
    }

    out += '</table>';

    document.getElementById("showBands").innerHTML = out;
}
