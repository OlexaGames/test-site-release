
function myFunction(id) {
  var element = document.getElementById(id);

  if (element) {
    element.classList.toggle("show");
    var button = element.previousElementSibling;

    if (button && button.classList.contains("dropbtn")) {
      button.classList.toggle(
        "active",
        element.classList.contains("show")
      );
    }

    if (element.classList.contains("show")) {
      localStorage.setItem("showElementId", id);
    } else {
      localStorage.removeItem("showElementId");
    }
  }
}

function subMyFunction(id) {
  var element = document.getElementById(id);

  if (element) {
    element.classList.toggle("show");
    var button = element.previousElementSibling;

    if (button && button.classList.contains("dropbtn")) {
      button.classList.toggle(
        "active",
        element.classList.contains("show")
      );
    }

    if (element.classList.contains("show")) {
      localStorage.setItem("showSubElementId", id);
    } else {
      localStorage.removeItem("showSubElementId");
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

  var showSubElementId = localStorage.getItem("showSubElementId");
  if (showSubElementId) {
    var element2 = document.getElementById(showSubElementId);
    if (element2) {
      element2.classList.add("show");
    }
  }

  document.querySelectorAll(".dropbtn").forEach(function(button) {
    var element = button.nextElementSibling;

    if (element && element.classList.contains("show")) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('background-video');
  video.play();
});

document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.querySelector('.copyright');
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `Ⓒ1992-${currentYear} ООО НПЦ «Промавтоматика»`;
});
