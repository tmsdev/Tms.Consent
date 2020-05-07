// Handle no-consent placeholders
// TODO: needs better implementation / to prevent names this function is separated from the bundle and copied to Resources/Public/JavaScript/NoConsentPlaceholder.js
// function toggleNoConsentPlaceholders(consent, app) {
//     if (app === undefined)
//         return;
//
//     var appName = app.name;
//     var appConsent = consent;
//
//     document.querySelectorAll('.tms-consent_no-consent-placeholder').forEach(item => {
//         if (appName !== item.dataset.name)
//             return;
//
//         if (appConsent === false) {
//             item.classList.add('consent-needed');
//         } else {
//             item.classList.remove('consent-needed');
//         }
//     });
// }
// document.addEventListener("DOMContentLoaded", toggleNoConsentPlaceholders);

function getKlaroAppTitles() {
    var apps = klaro.getManager().config.apps;

    document.querySelectorAll('[data-klaro-app-title]').forEach(item => {
        for (var i=0; i < apps.length; i++) {
            if (apps[i].name === item.getAttribute('data-klaro-app-title')) {
                item.innerHTML = apps[i].title;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", getKlaroAppTitles);
