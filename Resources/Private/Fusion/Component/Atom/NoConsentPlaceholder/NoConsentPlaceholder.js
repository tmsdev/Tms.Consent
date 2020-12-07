function getKlaroServiceTitles() {
    let services = klaro.getManager().config.services;
    let serviceTitlePlaceholders = document.querySelectorAll('[data-klaro-service-title]');
    Array.prototype.forEach.call(serviceTitlePlaceholders, function (serviceTitlePlaceholder) {
        for (var i=0; i < services.length; i++) {
            if (services[i].name === serviceTitlePlaceholder.getAttribute('data-klaro-service-title')) {
                serviceTitlePlaceholder.innerHTML = services[i].title;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", getKlaroServiceTitles);

let tmsConsentButtons = document.querySelectorAll('[data-consent-button]');
Array.prototype.forEach.call(tmsConsentButtons, function (tmsConsentButton) {
    tmsConsentButton.addEventListener('click', event => {
        event.preventDefault();
        let serviceName = tmsConsentButton.getAttribute('data-name');
        if (serviceName) {
            let manager = klaro.getManager();
            manager.updateConsent(serviceName, true)
            manager.saveAndApplyConsents();
        }
    }, false);
});
