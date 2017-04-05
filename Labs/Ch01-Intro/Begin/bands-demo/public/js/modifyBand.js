/**
 * Created by Matthew on 2/3/2017.
 */

function modifyBand(id) {
    $.getJSON('/band/' + id, function (data) {
        updateForm(data);
    });
}

function updateForm(jsonData) {
    var band = jsonData;
    var out = '<h4>' + band.name + '</h4><form id="updateForm" name="updateForm">';
    var keys = Object.keys(band);
    var vals = Object.values(band);

    out += `<div>
                <label for="name">Band Name:</label>
                <input type="text" id="name" name="name" value="` + vals[0] + `">
            </div>
            <div>
                <label for="city">Origin City:</label>
                <input type="text" id="city" name="city" value="` + vals[1] + `">
            </div>
            <div>
                <label for="country">Origin Country:</label>
                <input type="text" id="country" name="country" value="` + vals[2] + `">
            </div>
            <div>
                <label for="yearFormed">Year Formed:</label>
                <input type="text" id="yearFormed" name="yearFormed" value="` + vals[3] + `">
            </div>
            <div>
                <label for="genres">Genres:</label>
                <input type="text" id="genres" name="genres" value="` + vals[4] + `">
            </div>`;

    out += '<input type="submit" value="Submit" onclick="updateBand(' + band.id + ')"></form>';

    $('#modifyBand').html(out);
}

function updateBand(id) {
    var updateForm = document.getElementById('updateForm');
    var formData = new FormData(updateForm);

    var band = {
        "name": formData.get('name'),
        "city": formData.get('city'),
        "country": formData.get('country'),
        "yearFormed": formData.get('yearFormed'),
        "genres": formData.get('genres').split(',')
    };

    $.ajax({
        url: '/band/' + id,
        type: 'PUT',
        data: band,
        success: function () {
            $('#modifyBand').html('');
            showBands();
        }
    });
}
