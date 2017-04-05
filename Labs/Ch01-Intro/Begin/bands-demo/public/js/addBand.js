/**
 * Created by Matthew on 2/2/2017.
 */

function addBand() {
    var myForm = document.getElementById('myForm');
    var formData = new FormData(myForm);

    var band = {
        "name": formData.get('name'),
        "city": formData.get('city'),
        "country": formData.get('country'),
        "yearFormed": formData.get('yearFormed'),
        "genres": formData.get('genres').split(',')
    };

    $.ajax({
        url: '/band',
        type: 'POST',
        data: band,
    });
}
