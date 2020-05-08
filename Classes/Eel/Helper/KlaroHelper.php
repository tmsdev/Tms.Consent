<?php
namespace Tms\Consent\Eel\Helper;

use Neos\Flow\Annotations as Flow;
use Neos\Eel\ProtectedContextAwareInterface;

class KlaroHelper implements ProtectedContextAwareInterface
{
    /**
     * Build apps config
     *
     * @param array $apps
     * @return array
     */
    public function buildAppsConfig(array $apps) {

        // Remove disabled apps and set default position
        $appsConfig = [];
        foreach ($apps as $appName => $appSettings) {
            if (isset($appSettings['enabled']) && $appSettings['enabled'] === true) {
                $appSettings['klaro']['position'] = isset($appSettings['position']) ? $appSettings['position'] : 0;
                $appsConfig[] = $appSettings['klaro'];
            }
        }

        // Sort by position key
        usort($appsConfig, function ($app1, $app2) {
            return $app1['position'] <=> $app2['position'];
        });

        return $appsConfig;
    }

    /**
     * All methods are considered safe, i.e. can be executed from within Eel
     *
     * @param string $methodName
     * @return boolean
     */
    public function allowsCallOfMethod($methodName) {
        return true;
    }
}
