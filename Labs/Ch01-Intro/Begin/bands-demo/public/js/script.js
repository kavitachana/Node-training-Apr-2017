/**
 * Created by Matthew on 2/1/2017.
 */

function showBands() {
    $.getJSON('/band', function (data) {
        bandsData(data);
    });
}

$('#show').click( function () {
    $.getJSON('/band', function (data) {
        bandsData(data);
    });
});

function deleteBand(id) {
    $.ajax({
        url: '/band/' + id,
        type: 'DELETE',
        success: function () {
            showBands();
        }
    });
}

function bandsData(jsonData) {
    var bands = jsonData;
    var out = `<h1>Bands</h1>
               <table class="full-width"><tr><th>Name</th><th>Origin City</th><th>Origin Country</th><th>Year Formed</th><th>Action</th></tr>`;

    for (var i = 0; i < bands.length; i++) {
        out += '<tr><td>' + bands[i].name + '</td><td>' + bands[i].city + '</td><td>' + bands[i].country + '</td>' +
            '<td>' + bands[i].yearFormed + '</td><td><input type="submit" value="Modify" onclick="modifyBand(' + bands[i].id + ')">' +
            ' <input type="submit" value="Delete" id="delete" onclick="deleteBand(' + bands[i].id + ')"> <a href="/band/' + bands[i].id + '">View JSON</a></td></tr>';
    }

    out += '</table>';

    $('#showBands').html(out);
}