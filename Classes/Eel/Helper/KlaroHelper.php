<?php
namespace Tms\Consent\Eel\Helper;

use Neos\Flow\Annotations as Flow;
use Neos\Eel\ProtectedContextAwareInterface;

class KlaroHelper implements ProtectedContextAwareInterface
{
    /**
     * Build services config
     *
     * @param array $apps
     * @return array
     */
    public function buildServicesConfig(array $services) {

        // Remove disabled apps and set default position
        $servicesConfig = [];
        foreach ($services as $serviceName => $serviceSettings) {
            if (isset($serviceSettings['enabled']) && $serviceSettings['enabled'] === true) {
                $serviceSettings['klaro']['position'] = isset($serviceSettings['position']) ? $serviceSettings['position'] : 0;
                $servicesConfig[] = $serviceSettings['klaro'];
            }
        }

        // Sort by position key
        usort($servicesConfig, function ($service1, $service2) {
            return $service1['position'] <=> $service2['position'];
        });

        return $servicesConfig;
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
