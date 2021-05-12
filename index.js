// Javascript goes here
// Example Queries: https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?    sol=1000&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?    sol=1000&camera=fhaz&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?    sol=1000&page=2&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?    earth_date=2015-6-3&api_key=DEMO_KEY
const marsRoverQueryBase = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const demoKey = "&api_key=DEMO_KEY";
var whichRover = "curiosity";
var solDate = 1000;
var earthDate = "earth_date=";
var camera = "MAST";
var pageNum = 1;

//Elements:
var refetchButton = document.getElementById("refetch");
var sortButtonAsc = document.getElementById("load-pictures-asc");
var sortButtonDesc = document.getElementById("load-pictures-desc");
var photoList = document.getElementById("photo-list");

// Initialize list of photos with basic descriptions.
fetch(marsRoverQueryBase + whichRover + '/photos?' 
	+ 'sol=' + solDate
	+ '&camera=' + camera
	+ '&page=' + pageNum
	+ demoKey)
.then(function(response) {
	return response.json();
}).then(function(data) {
	changePhotoDisplay(data.photos, "ASC");
});

var changePhotoDisplay = function(photoData, sort) {
	// Sort data before displaying, ASC (oldest first) by default.
	sort == "ASC" ? photoData.sort() : photoData.sort(dataSortDesc);
	// Remove all current photos and replace them with the new set.
	while(photoList.firstChild) photoList.removeChild(photoList.firstChild);
	// Add back all new photos whether sorted or from a different page or refetch.
	for(var i = 0; i < photoData.length; i++) {
		var curPhoto = document.createElement('div');
		curPhoto.setAttribute("class", "photo");
		var curA = document.createElement('a');
		curA.setAttribute("id", "img-"+i);
		var photo = document.createElement('img');
		photo.src = photoData[i].img_src;
		curA.appendChild(photo);
		var descr = document.createElement('div');
		descr.setAttribute("class", "descr");
		descr.innerHTML = "Photo " + (i+1) + " taken by " + whichRover + " rover on " + camera + " camera on " + new Date(photoData[i].earth_date);

		curPhoto.appendChild(curA);
		curPhoto.appendChild(descr);
		
		photoList.appendChild(curPhoto);
	}
};

var dataSortDesc = function(a,b) {
	return new Date(b.earth_date).getTime() - new Date(a.earth_date).getTime();
}

// Sort button for getting pictures oldest to newest.
sortButtonAsc.addEventListener('click', function() {
	fetch(marsRoverQueryBase + whichRover + '/photos?' 
		+ 'sol=' + solDate
		+ '&camera=' + camera
		+ '&page=' + pageNum
		+ demoKey)
	.then(function(response) {
		return response.json();
	}).then(function(data) {
		changePhotoDisplay(data.photos, "ASC");
	});
}, false);

// Sort button for getting pictures newest to oldest.
sortButtonDesc.addEventListener('click', function() {
	fetch(marsRoverQueryBase + whichRover + '/photos?' 
		+ 'sol=' + solDate
		+ '&camera=' + camera
		+ '&page=' + pageNum
		+ demoKey)
	.then(function(response) {
		return response.json();
	}).then(function(data) {
		changePhotoDisplay(data.photos, "DESC");
	});
}, false);

// OPTIONAL: Add button to get latest photos without reloading entire page:
refetchButton.addEventListener('click', function() {
	fetch(marsRoverQueryBase + whichRover + '/photos?'
		+ 'sol=' + solDate
		+ '&camera=' + camera
		+ '&page=' + pageNum
		+ demoKey)
	.then(function(response) {
		return response.json();
	}).then(function(data) {
		changePhotoDisplay(data.photos, "DESC");
	});
}, false);
