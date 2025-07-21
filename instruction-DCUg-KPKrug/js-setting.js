function myFunction(id) {
  var element = document.getElementById(id);
  if (element) {
    element.classList.toggle("show");

  if (element.classList.contains("show")) {
  localStorage.setItem("showElementId", id);
    } else {
      localStorage.removeItem("showElementId");
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var showElementId = localStorage.getItem("showElementId");
  if (showElementId) {
    var element = document.getElementById(showElementId);
    if (element) {
      element.classList.add("show");
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('background-video');
  video.play();
});

const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
