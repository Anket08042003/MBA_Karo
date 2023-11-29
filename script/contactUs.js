document.addEventListener('DOMContentLoaded', function () {
  // Your existing code for theme switch and form validation
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const contactForm = document.getElementById('contact-form');
  const errorElement = document.getElementById('error');
  const successMsg = document.getElementById('success-msg');
  const submitBtn = document.getElementById('submit');

  toggleSwitch.addEventListener('change', function (e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });

  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    validate();
  });

  const validate = () => {
    if (name.value.length < 3) {
      errorElement.innerHTML = 'Your name should be at least 3 characters long.';
      return;
    }

    if (!(email.value.includes('.') && email.value.includes('@'))) {
      errorElement.innerHTML = 'Please enter a valid email address.';
      return;
    }

    if (!emailIsValid(email.value)) {
      errorElement.innerHTML = 'Please enter a valid email address.';
      return;
    }

    if (message.value.length < 15) {
      errorElement.innerHTML = 'Please write a longer message.';
      return;
    }

    errorElement.innerHTML = '';
    successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.';

    setTimeout(function () {
      successMsg.innerHTML = '';
      document.getElementById('contact-form').reset();
    }, 6000);
  };

  const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to initialize the map
  function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 17.79298516206121, lng: 74.3955550966623 },
      zoom: 14,
    });

    // Add a click event listener to the map
    map.addListener("click", function (event) {
      // Get the clicked coordinates
      var clickedLatLng = event.latLng;

      // Reverse geocode the coordinates to get the address
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedLatLng }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            // Update the address on the page
            document.getElementById("clicked-address").innerText =
              "Clicked Address: " + results[0].formatted_address;
          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    });
  }
});
