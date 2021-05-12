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
var hwSpan = document.getElementById("StartAssessment");
var imgButton = document.getElementById("load-pictures");
var photoList = document.getElementById("photo-list");

fetch(marsRoverQueryBase + whichRover + '/photos?' 
	+ 'sol=' + solDate
	+ '&camera=' + camera
	+ '&page=' + pageNum
	+ demoKey)
.then(function(response) {
	return response.json();
}).then(function(data) {
	console.log(data.photos);
	for(var i = 0; i < data.photos.length; i++) {
		var curPhoto = document.createElement('div');
		curPhoto.setAttribute("class", "photo");
		var curA = document.createElement('a');
		curA.setAttribute("id", "img-"+i);
		var photo = document.createElement('img');
		photo.src=data.photos[i].img_src;
		curA.appendChild(photo);
		var descr = document.createElement('div');
		descr.setAttribute("class", "descr");
		descr.innerHTML = "Photo " + (i+1) + " taken by " + whichRover + " rover on " + camera + " camera on " + data.photos[i].earth_date;

		curPhoto.appendChild(curA);
		curPhoto.appendChild(descr);
		
		photoList.appendChild(curPhoto);
	}
});

// imgButton.addEventListener('click', function() {
// 	console.log("retrieving data");
// 	fetch(marsRoverQueryBase + whichRover + '/photos?' 
// 		+ 'sol=' + solDate
// 		+ '&camera=' + camera
// 		+ '&page=' + pageNum
// 		+ demoKey)
// 	.then(function(response) {
// 		return response.json();
// 	}).then(function(data) {
// 		var photo = document.createElement('img');
// 		photo.src=data.photos[0].img_src;
// 		photoList.appendChild(photo);
// 		console.log(data.photos[0].img_src);
// 	});
// }, false);
