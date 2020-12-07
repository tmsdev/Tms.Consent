function toggleNoConsentPlaceholders(consent, service) {
    if (service === undefined)
        return;

    var serviceName = service.name;
    var serviceConsent = consent;

    let noConsentPlaceholders = document.querySelectorAll('.tms-consent_no-consent-placeholder');
    Array.prototype.forEach.call(noConsentPlaceholders, function (noConsentPlaceholder) {
        if (serviceName !== noConsentPlaceholder.dataset.name)
            return;

        if (serviceConsent === false) {
            noConsentPlaceholder.classList.add('consent-needed');
        } else {
            noConsentPlaceholder.classList.remove('consent-needed');
        }
    });
}
document.addEventListener("DOMContentLoaded", toggleNoConsentPlaceholders);
