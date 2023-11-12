window.onload = function () {
    console.log("DOM ready!");
    function updateCharCount(id) {
        const inputField = document.getElementById(id);
        const charCountSpan = inputField.nextElementSibling;
        const charCount = inputField.value.length;
        charCountSpan.textContent = `${charCount} car.`;
    }

    const inputNom = document.getElementById('inputNom');
    if (inputNom) {
        inputNom.addEventListener('input', function () {
            updateCharCount('inputNom');
        });
    }

    const inputEmail = document.getElementById('inputEmail3');
    if (inputEmail) {
        inputEmail.addEventListener('input', function () {
            updateCharCount('inputEmail3');
        });
    }
    const inputPrenom = document.getElementById('inputPrenom');
    if (inputPrenom) {
        inputPrenom.addEventListener('input', function () {
            updateCharCount('inputPrenom');
        });
    }

    const inputAdresse = document.getElementById('inputAdresse');
    if (inputAdresse) {
        inputAdresse.addEventListener('input', function () {
            updateCharCount('inputAdresse');
        });
    }
    const inputDate = document.getElementById('inputDate');
    if (inputDate) {
        inputDate.addEventListener('input', function () {
            updateCharCount('inputDate');
        });
    }

    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            // If the form is valid, add the contact to the contactStore
            const nom = document.getElementById('inputNom').value;
            const prenom = document.getElementById('inputPrenom').value;
            const adresse = document.getElementById('inputAdresse').value;
            const email = document.getElementById('inputEmail3').value;
            const dateNaissance = document.getElementById('inputDate').value;

            // Call the method to add contact to the contactStore
            contactStore.add(nom, prenom, dateNaissance, adresse, email);
            document.getElementById('myForm').reset();
            // getLocation();

        }
    });
    document.getElementById('gpsButton').addEventListener('click', function () {
        getLocation();
    });

    function validateForm() {

        // Récupérer les valeurs des champs
        const nom = document.getElementById('inputNom').value;
        const prenom = document.getElementById('inputPrenom').value;
        const adresse = document.getElementById('inputAdresse').value;
        const email = document.getElementById('inputEmail3').value;
        const dateNaissance = document.getElementById('inputDate').value;

        if (nom === '' || prenom === '' || adresse === '' || email === '' || dateNaissance === '') {
            // Si l'un des champs est vide, afficher le modal
            var myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();
            return false;
        }

        // longueur des champs texte
        if (nom.length < 5 || prenom.length < 5 || adresse.length < 5) {
            alert("Les champs texte doivent avoir au moins 5 caractères.");
            return false;
        }

        // format de l'email
        if (!validateEmail(email)) {
            alert("Veuillez entrer une adresse email valide.");
            return false;
        }

        // si la date de naissance est dans le futur
        const birthdayDate = new Date(dateNaissance);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (birthdayTimestamp > nowTimestamp) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function getLocation() {
        var address = document.getElementById('inputAdresse').value;

        // Google Maps Geocoding API to convert address to coordinates
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK' && results.length > 0) {
                var location = results[0].geometry.location;
                var latlon = location.lat() + "," + location.lng();

                var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

                // Display the map image under the address
                document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;

            } else {
                console.error('Geocoding failed:', status);
            }
        });
    }


    function showPosition(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

        document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;

        //  update the addressLink 
        const addressLink = document.getElementById('addressLink');
        addressLink.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(latlon)}" target="_blank">${latlon}`;
    }

    function showError(error) {
        console.error("Geolocation error:", error.message);

    }


};