
const form = document.getElementById("application-form");

const companyName = document.getElementById("company-name");
const contactPerson = document.getElementById("contact-person");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const website = document.getElementById("website");

const country = document.getElementById("country");
const productType = document.getElementById("product-type");
const shipmentVolume = document.getElementById("shipment-volume");

const services = document.querySelectorAll('input[name="services"]');
const current3PL = document.querySelectorAll('input[name="current3PL"]');

const comments = document.getElementById("comments");
const privacy = document.getElementById("privacy");

const successMessage = document.getElementById("success-message");
const volumeWarning = document.getElementById("volume-warning");

const errors = {
    companyName: document.getElementById("company-name-error"),
    contactPerson: document.getElementById("contact-person-error"),
    email: document.getElementById("email-error"),
    phone: document.getElementById("phone-error"),
    website: document.getElementById("website-error"),
    country: document.getElementById("country-error"),
    productType: document.getElementById("product-type-error"),
    shipmentVolume: document.getElementById("shipment-volume-error"),
    services: document.getElementById("services-error"),
    current3PL: document.getElementById("current3PL-error"),
    comments: document.getElementById("comments-error"),
    privacy: document.getElementById("privacy-error")
};

// Mostrar errores
function showError(field, message) {
    errors[field].textContent = message;
}

// Limpiar errores
function clearErrors() {
    Object.values(errors).forEach(error => {
        error.textContent = "";
    });
}

// Validar nombre de empresa
function validateCompanyName() {
    if (companyName.value.trim().length < 2) {
        showError("companyName", "El nombre de la empresa debe tener al menos 2 caracteres");
        return false;
    }
    return true;
}

// Validar persona de contacto
function validateContactPerson() {
    const words = contactPerson.value.trim().split(/\s+/);

    if (words.length < 2 || words.some(word => word.length === 0)) {
        showError("contactPerson", "Ingresa nombre y apellido del contacto");
        return false;
    }
    return true;
}

// Validar email
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        showError("email", "Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)");
        return false;
    }
    return true;
}

// Validar teléfono
function validatePhone() {
    const phonePattern = /^\+\d{1,3}\s\d[\d\s-]{5,}$/;

    if (!phonePattern.test(phone.value.trim())) {
        showError("phone", "El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)");
        return false;
    }
    return true;
}

// Validar sitio web opcional
function validateWebsite() {
    if (website.value.trim() === "") {
        return true;
    }

    try {
        const url = new URL(website.value.trim());

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("URL inválida");
        }

        return true;
    } catch {
        showError("website", "Si incluyes sitio web, debe ser una URL válida");
        return false;
    }
}

// Validar país
function validateCountry() {
    if (country.value === "") {
        showError("country", "Selecciona el país de operación principal");
        return false;
    }
    return true;
}

// Validar producto
function validateProductType() {
    if (productType.value === "") {
        showError("productType", "Selecciona el tipo de producto que manejas");
        return false;
    }
    return true;
}

// Validar volumen
function validateShipmentVolume() {
    if (shipmentVolume.value === "") {
        showError("shipmentVolume", "Selecciona el volumen mensual estimado");
        return false;
    }
    return true;
}

// Mostrar advertencia de volumen
function updateVolumeWarning() {
    volumeWarning.classList.toggle(
        "hidden",
        shipmentVolume.value !== "0-100"
    );
}

// Validar servicios
function validateServices() {
    const selectedServices = Array.from(services).some(service => service.checked);

    if (!selectedServices) {
        showError("services", "Selecciona al menos un servicio de interés");
        return false;
    }
    return true;
}

// Validar proveedor 3PL
function validateCurrent3PL() {
    const selected = Array.from(current3PL).some(option => option.checked);

    if (!selected) {
        showError("current3PL", "Indica si actualmente trabajas con otro proveedor logístico");
        return false;
    }
    return true;
}

// Validar comentarios
function validateComments() {
    if (comments.value.length > 500) {
        showError("comments", `Los comentarios no pueden exceder 500 caracteres (quedan ${500 - comments.value.length})`);
        return false;
    }
    return true;
}

// Validar privacidad
function validatePrivacy() {
    if (!privacy.checked) {
        showError("privacy", "Debes aceptar la política de privacidad para continuar");
        return false;
    }
    return true;
}

// Actualizar contador de comentarios
function updateCommentsCounter() {
    document.getElementById("comments-counter").textContent =
        `${comments.value.length} / 500`;
}

// Validar todo el formulario
function validateForm() {
    clearErrors();

    const results = [
        validateCompanyName(),
        validateContactPerson(),
        validateEmail(),
        validatePhone(),
        validateWebsite(),
        validateCountry(),
        validateProductType(),
        validateShipmentVolume(),
        validateServices(),
        validateCurrent3PL(),
        validateComments(),
        validatePrivacy()
    ];

    return results.every(result => result);
}

// Validación en tiempo real
companyName.addEventListener("input", validateCompanyName);
contactPerson.addEventListener("input", validateContactPerson);
email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
website.addEventListener("input", validateWebsite);

country.addEventListener("change", validateCountry);
productType.addEventListener("change", validateProductType);

shipmentVolume.addEventListener("change", () => {
    updateVolumeWarning();
    validateShipmentVolume();
});

services.forEach(service => {
    service.addEventListener("change", validateServices);
});

current3PL.forEach(option => {
    option.addEventListener("change", validateCurrent3PL);
});

comments.addEventListener("input", () => {
    updateCommentsCounter();
    validateComments();
});

privacy.addEventListener("change", validatePrivacy);

// Envío del formulario
form.addEventListener("submit", event => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
        form.classList.add("hidden");
        successMessage.classList.remove("hidden");
        successMessage.focus();
    }
});

// Limpiar formulario
form.addEventListener("reset", () => {
    setTimeout(() => {
        clearErrors();
        updateCommentsCounter();
        volumeWarning.classList.add("hidden");
        successMessage.classList.add("hidden");
        form.classList.remove("hidden");
    }, 0);
});
