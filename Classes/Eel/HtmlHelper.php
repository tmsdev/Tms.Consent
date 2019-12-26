<?php
namespace Tms\Consent\Eel;

use Neos\Eel\ProtectedContextAwareInterface;

class HtmlHelper implements ProtectedContextAwareInterface
{
    /**
     * Modify the given HTML to itercept loading and/or execution of configured apps
     *
     * @param string $html
     * @param array $apps
     * @return string
     */
    public function modify(string $html, array $apps = []) {
        $patterns = [];
        $replacements = [];
        foreach ($apps as $app) {
            if ($app['enabled'] !== true)
                continue;
            if (!isset($app['modifyHtml']))
                continue;
            foreach ($app['modifyHtml'] as $modify) {
                $patterns[] = $modify['pattern'];
                $replacements[] = $modify['replacement'];
            }
        }
        if (!empty($patterns)) {
            ksort($patterns);
            ksort($replacements);
            $html = preg_replace($patterns, $replacements, $html);
        }
        return $html;
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
