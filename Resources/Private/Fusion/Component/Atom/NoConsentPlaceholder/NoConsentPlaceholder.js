function getKlaroServiceTitles() {
    let services = klaro.getManager().config.services;
    document.querySelectorAll('[data-klaro-service-title]').forEach(item => {
        for (var i=0; i < services.length; i++) {
            if (services[i].name === item.getAttribute('data-klaro-service-title')) {
                item.innerHTML = services[i].title;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", getKlaroServiceTitles);

document.querySelectorAll('[data-consent-button]').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        let serviceName = item.getAttribute('data-name');
        if (serviceName) {
            let manager = klaro.getManager();
            manager.updateConsent(serviceName, true)
            manager.saveAndApplyConsents();
        }
    }, false);
});
