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

### Step 1: App configuration via `YAML` settings

This package includes default consent management settings for these apps

* Cloudflare
* Matomo
* Google Analytics
* Google Maps
* Youtube

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

#### Extend your apps

Simply extend the `YAML` settings within your Neos package.

```yaml
Tms:
  Consent:
    config:
      apps:
        yourAppName:
          enabled: true

          # -----------------------------------------------------------------
          # Klaro! Config
          # -----------------------------------------------------------------
          klaro:
            name: yourAppName
            title: 'Your App Title'
            description: 'Short description, why your website use the app...'
            purposes: ['functionality']
```

Think your app configuration is useful for others too?
Don't hesitate to submit a PR. All the app related configuration should be combined in one settings
file named like `Settings.Consent.YourAppName.yaml`.

### Step 2: Modify HTML

In order to control your configured apps (e.g. to stop loading and/or execution without consent) it is necessary to
modify the resulting HTML of your webpages.

This can be achieved by simply replacing some attributes - see https://github.com/KIProtect/klaro#managing-third-party-appstrackers

We try to provide preconfigured solutions for some common Neos packages, please have a look at [`/Resources/Private/Fusion/PresetPackages`](https://github.com/tmsdev/Tms.Consent/tree/master/Resources/Private/Fusion/PresetPackages)
what we've already covered. Your package is missing? Submit a PR, if you think the app configuration could be useful for others.

### Step 3: Verify

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

Development sponsored by [tms.development - Online Marketing and Neos CMS Agency](https://www.tms-development.de/)

Webpack config inspired by https://github.com/neos/redirecthandler-ui
