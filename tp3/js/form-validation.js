window.onload = function () {
    console.log("DOM ready!");

    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            // this.submit();
            displayWelcomeModal();
        }
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

    function displayWelcomeModal() {
        const prenom = document.getElementById('inputPrenom').value;
        const dateNaissance = document.getElementById('inputDate').value;
        const adresse = document.getElementById('inputAdresse').value;

        const welcomeTitle = document.getElementById('welcomeTitle');
        const birthDate = document.getElementById('birthDate');
        const staticMap = document.getElementById('staticMap');
        const googleMapsLink = document.getElementById('googleMapsLink');


        // Change the date format to day/month/year
        const formattedDate = new Date(dateNaissance).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });

        welcomeTitle.textContent = `Bienvenue ${prenom}`;
        birthDate.textContent = `Vous êtes nés le ${formattedDate} et vous habitez:`;

        // Fetch Google Static Maps API image
        const apiKey = 'AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg';
        const staticMapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(adresse)}&zoom=15&size=400x400&key=${apiKey}`;
        const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;

        const addressLink = document.getElementById('addressLink');
        addressLink.innerHTML = `<a href="${googleMapsURL}" target="_blank">${adresse}</a>`;

        staticMap.src = staticMapURL;
        googleMapsLink.href = googleMapsURL;

        var myModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        myModal.show();
    }


};