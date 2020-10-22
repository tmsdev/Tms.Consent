function toggleNoConsentPlaceholders(consent, service) {
    if (service === undefined)
        return;

    var serviceName = service.name;
    var serviceConsent = consent;

    document.querySelectorAll('.tms-consent_no-consent-placeholder').forEach(item => {
        if (serviceName !== item.dataset.name)
            return;

        if (serviceConsent === false) {
            item.classList.add('consent-needed');
        } else {
            item.classList.remove('consent-needed');
        }
    });
}
document.addEventListener("DOMContentLoaded", toggleNoConsentPlaceholders);
