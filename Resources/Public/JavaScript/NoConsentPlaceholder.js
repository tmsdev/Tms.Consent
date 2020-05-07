function toggleNoConsentPlaceholders(consent, app) {
    if (app === undefined)
        return;

    var appName = app.name;
    var appConsent = consent;

    document.querySelectorAll('.tms-consent_no-consent-placeholder').forEach(item => {
        if (appName !== item.dataset.name)
            return;

        if (appConsent === false) {
            item.classList.add('consent-needed');
        } else {
            item.classList.remove('consent-needed');
        }
    });
}
document.addEventListener("DOMContentLoaded", toggleNoConsentPlaceholders);
