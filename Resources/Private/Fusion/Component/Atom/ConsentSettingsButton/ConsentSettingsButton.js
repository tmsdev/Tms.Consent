function toggleConsentSettingsButton() {
    if (klaro.getManager().confirmed) {
        var klaroBtn = document.getElementById('tms-consent_settings-button');
        klaroBtn.classList.remove('d-none');
    }
}
document.onclick = toggleConsentSettingsButton;
document.addEventListener("DOMContentLoaded", toggleConsentSettingsButton);
