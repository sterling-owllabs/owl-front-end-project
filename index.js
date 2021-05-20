function getPhotos() {
  let date = document.getElementById('dateValue').value;
  let btn1IsChecked = document.getElementById('button1').checked;
  let btn2IsChecked = document.getElementById('button2').checked;
  let btn3IsChecked = document.getElementById('button3').checked;

  if(btn1IsChecked === true) {
    roverName = "curiosity";
  } else if (btn2IsChecked === true) {
    roverName = "opportunity";
  } else {
    roverName = "spirit";
  }

  const api_key = 'DEMO_KEY'
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${date}&api_key=DEMO_KEY`;

  const fetchRoverPhotos = async () => {
  try {
    const response = await fetch(`${url}`)
    const data = await response.json()
    displayData(data)
  } catch (error) {
    console.log(error, 'error')
    document.getElementById("dataTitle").innerHTML = error;
  }
}
  fetchRoverPhotos()
  // document.getElementById("dateValue").value = "";
}

function displayData(data) {
  if(data.photos.length === 0) {
    document.getElementById("dataTitle").innerHTML = "There are no photos to display";
  } else {
    document.getElementById("dataTitle").innerHTML = "Photo Gallery";

    let imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = "";

    for (var i = 0; i < data.photos.length; i++) {
      imageContainer.innerHTML += '<img src=\"'+data.photos[i].img_src+'\" class=\"rover-image\">';
    }
  }
}
