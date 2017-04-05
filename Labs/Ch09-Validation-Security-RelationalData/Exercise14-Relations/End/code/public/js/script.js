$('tr').hover(function () {
	$(this).find('td').addClass('hovered');
}, function () {
	$(this).find('td').removeClass('hovered');
});

function filter() {
	let td1, td2, td3, i;
	let input = $("#inputSearch").val();
	let filter = input.toUpperCase();
	let table = document.getElementById("studentList");
	let tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td1 = tr[i].getElementsByTagName("td")[1];
		td2 = tr[i].getElementsByTagName("td")[2];
		td3 = tr[i].getElementsByTagName("td")[3];
		if (td1) {
			if (td1.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				continue;
			} else {
				tr[i].style.display = "none";
			}
		}
		if (td2) {
			if (td2.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				continue;
			} else {
				tr[i].style.display = "none";
			}
		}
		if (td3) {
			if (td3.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				continue;
			} else {
				tr[i].style.display = "none";
			}
		}//*/
	}
}