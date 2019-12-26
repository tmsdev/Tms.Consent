# Consent Manager for Neos CMS

Simple, lightweight and customizable consent manager for [Neos CMS](https://www.neos.io/) based on [Klaro!](https://github.com/KIProtect/klaro)

Let your users decide, which scripts should be loaded and executed while visiting your website.

---

**!!! This is currently experimental code, please do not rely on any parts yet.**

**IMPORTANT: We are developers, no lawyers. Using this package without further adaptation will most likely NOT result in GDPR, ePrivacy nor CCPA compliance!**

---

## Install

```bash
composer require tms/consent
```

## Usage

This package includes default consent management settings for these apps

* Matomo
* Youtube
* Google Maps

```yaml
# Example configuration
Tms:
  Consent:
    config:
      # The privacy policy uri can be specified by node type, path, identifier or simply an absolute/relative link
      privacyPolicy: '#4999814e-61c2-4ce1-ab46-c1145f2285d7'
      
      # Enable the apps you need consent management for
      apps:
        matomo:
          enabled: true
        youtube:
          enabled: true
```

## Extend apps

Add your own apps as needed

```yaml
Tms:
  Consent:
    config:
      apps:
        yourThirdParty:
          enabled: true

          # -----------------------------------------------------------------
          # Klaro! Config
          # -----------------------------------------------------------------
          klaro:
            name: yourThirdPartyApp
            title: 'Your Third Party App'
            description: 'Short description, why this app is needed...'
            purposes: ['functionality']
```

Think your app configuration is useful for others too?
Don't hesitate to submit a PR. All the app related configuration should be combined in one settings
file named like `Settings.Apps.YourThirdPartyApp.yaml`.

## Modify HTML

In order to control your configured apps (e.g. to stop loading and/or execution without consent) it is necessary to
modify the resulting HTML of your webpages.

**1. Option: Adjust HTML attributes manually**

see https://github.com/KIProtect/klaro#managing-third-party-appstrackers

**2. Option: Replace HTML attributes automatically by patterns** 

We added a processor to `Neos.Neos:Page` that will search and replace the given HTML by app patterns.

```yaml
# Youtube example
Tms:
  Consent:
    config:
      apps:
        youtube:

          # Search & replace the resulting HTML by these patterns
          modifyHtml:
            - pattern: '/<iframe(.*?)src="(.*?)youtube.com\/embed\/(.*?)"(.*?)>/'
              # Force use of youtube-nocookie.com by default
              replacement: '<iframe$1data-name="youtube" data-src="$2youtube-nocookie.com/embed/$3"$4>'
            - pattern: '/<iframe(.*?)src="(.*?)youtube-nocookie.com\/embed\/(.*?)"(.*?)>/'
              replacement: '<iframe$1data-name="youtube" data-src="$2youtube-nocookie.com/embed/$3"$4>'
```

## Verify

Check your site - have you blocked all your critical apps?

* by using the dev tools of your favorite browser
* or simply run a check on https://webbkoll.dataskydd.net/

## Wishlist

* Add multi-site support
* Make it work with lazyloaded elements
* Make apps sortable
* Placeholder for blocked content elements (like Youtube, Maps, etc.)
* Support more apps by default
* Backend module with some basic statistics on acceptance rate
* User location based configurations
* Additional layouts & styles

Any feedback, pull request or other contribution is very welcome!

## Acknowledgments

Development sponsored by [tms.development - online marketing agency](https://www.tms-development.de/)

Webpack config inspired by https://github.com/neos/redirecthandler-ui
