window.onload = function () {
    console.log("DOM ready!");
    displayContactList();
    // Add character count and validation on keyup event
    document.addEventListener("keyup", function () {
        updateCharCount("inputNom", "count1");
        updateCharCount("inputPrenom", "count2");
        updateCharCount("inputDate", "count3");
        updateCharCount("inputAdresse", "count4");
        updateCharCount("inputEmail3", "count5");

        // Validation process
        var valid = true;
        valid = validateField("inputNom", 5) && valid;
        valid = validateField("inputPrenom", 5) && valid;
        valid = validateField("inputDate", 5) && valid;
        valid = validateField("inputAdresse", 5) && valid;
        valid = validateField("inputEmail3", 5) && valid;

        return valid;
    });

    // Add submit event listener for form submission
    document.getElementById("envoie").addEventListener("click", function (event) {
        event.preventDefault();
        if (validateForm()) {
            storeFormData();
            // Explicitly set an empty array in localStorage
            localStorage.setItem('contactList', JSON.stringify([]));

            displayContactList();


        }
    });
    document.getElementById("Reset").addEventListener("click", function (event) {
        event.preventDefault();
        contactStore.reset();
        displayContactList();

    });
    // Function to update character count
    function updateCharCount(inputId, countId) {
        var inputField = document.getElementById(inputId);
        var charCountSpan = document.getElementById(countId);
        var charCount = inputField.value.length;
        charCountSpan.textContent = `${charCount} Car.`;
    }

    // Function to validate a field based on minimum length
    function validateField(inputId, minLength) {
        var inputField = document.getElementById(inputId);

        if (inputField.value.length < minLength) {
            inputField.style.borderColor = "#ff0000";
            return false;
        } else {
            inputField.style.borderColor = "#48DE14";
            return true;
        }
    }
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


    // Function to store form data in localStorage
    function storeFormData() {
        var inputNom = document.getElementById("inputNom");
        var inputPrenom = document.getElementById("inputPrenom");
        var inputDate = document.getElementById("inputDate");
        var inputAdresse = document.getElementById("inputAdresse");
        var inputEmail = document.getElementById("inputEmail3");

        if (
            inputNom.value !== "" &&
            inputPrenom.value !== "" &&
            inputDate.value !== "" &&
            inputAdresse.value !== "" &&
            inputEmail.value !== ""
        ) {
            contactStore.add(
                inputNom.value,
                inputPrenom.value,
                inputDate.value,
                inputAdresse.value,
                inputEmail.value
            );

            // Display success message
            document.getElementById("success").classList.add("alert", "alert-success");
            document.getElementById("success").textContent = "Contact ajouté avec succès.";

            var tableRow = `<tr>
            <td>${inputNom.value}</td>
            <td>${inputPrenom.value}</td>
            <td>${inputDate.value}</td>
            <td><a href="https://maps.google.com/maps?q=${inputAdresse.value}">${inputAdresse.value}</a></td>
            <td><a href="mailto:${inputEmail.value}">${inputEmail.value}</a></td>
        </tr>`;

            document.querySelector("table tbody").innerHTML += tableRow;
            // Clear input fields
            inputNom.value = "";
            inputPrenom.value = "";
            inputDate.value = "";
            inputAdresse.value = "";
            inputEmail.value = "";

        }
    }
    function displayContactList() {
        const contactTableBody = document.querySelector("table tbody");

        // Retrieve existing HTML content of the table body
        const existingRows = contactTableBody.innerHTML;

        // Clear existing rows
        contactTableBody.innerHTML = existingRows;

        // Retrieve contactList from local storage
        getContactListFromLocalStorage(function (contactList) {
            for (const contact of contactList) {
                contactTableBody.innerHTML +=
                    `<tr>
                        <td>${contact.inputNom}</td>
                        <td>${contact.inputPrenom}</td>
                        <td>${contact.inputDate}</td>
                        <td ><a href="https://maps.google.com/maps?q=${contact.inputAdresse}">${contact.inputAdresse}</a></td>
                        <td ><a href="mailto:${contact.inputEmail}">${contact.inputEmail}</a></td>
                    </tr>`;
            }

            // Update the contactListTitle with the number of contacts
            const contactListTitle = document.getElementById('contactListTitle');
            const rowCount = document.querySelectorAll("table tbody tr").length;
            contactListTitle.textContent = `Liste des contacts (${rowCount})`;
        });
    }

    // Callback function to retrieve contactList from local storage
    function getContactListFromLocalStorage(callback) {
        const contactListString = localStorage.getItem('contactList');
        const contactList = contactListString ? JSON.parse(contactListString) : [];
        callback(contactList);
    }



};

