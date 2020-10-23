# Consent Manager for Neos CMS

Simple, lightweight and customizable consent manager for [Neos CMS](https://www.neos.io/) based on [Klaro!](https://github.com/KIProtect/klaro)

Let your users decide, which scripts should be loaded and executed while visiting your website.

---

**IMPORTANT: We are developers, no lawyers. Using this package without further adaptation will most likely NOT result in GDPR, ePrivacy nor CCPA compliance!**

---

## Install

```bash
composer require tms/consent
```

## What's included?

* Klaro Script + opinionated Klaro Config (override or use your own anytime)
* Klaro Config editing via `Settings.yaml` & predefined services
* Klaro default styles & themes [`/Resources/Private/Styles/Theme`](https://github.com/tmsdev/Tms.Consent/tree/master/Resources/Private/Styles/Theme)
* Placeholder for blocked content elements (Fusion Component + JS)
* Consent settings button (Fusion Component + JS)
* Overrides for common Neos packages [`/Resources/Private/Fusion/PresetPackages`](https://github.com/tmsdev/Tms.Consent/tree/master/Resources/Private/Fusion/PresetPackages)

## Usage

### Step 1: Service configuration via `YAML` settings

This package includes default consent management settings for the following services. Enable them in your `Settings.yaml` or add your own services.

* Cloudflare
* Matomo
* Google Analytics
* Google Maps
* Youtube

```yaml
# Example Tms.Consent configuration
Tms:
  Consent:
    config:
      # The privacy policy uri can be specified by node type, path, identifier or simply an absolute/relative link
      privacyPolicy: '#4999814e-61c2-4ce1-ab46-c1145f2285d7'
      
      # Enable the services you need consent management for
      services:
        matomo:
          enabled: true
          # Use the position key to render services in your favorite order
          position: 100
        youtube:
          enabled: true
          position: 200
```

#### Extend your services

Simply extend the `YAML` settings within your Neos package.

```yaml
Tms:
  Consent:
    config:
      services:
        yourServiceName:
          enabled: true

          # -----------------------------------------------------------------
          # Klaro! Config
          # -----------------------------------------------------------------
          klaro:
            name: yourServiceName
            title: 'Your Service Title'
            description: 'Short description, why your website use this service...'
            purposes: ['functionality']
```

Think your service configuration is useful for others too?
Don't hesitate to submit a PR. All the service related configuration should be combined in one settings
file named like `Settings.Consent.YourServiceName.yaml`.

### Step 2: Modify HTML

In order to control your configured services (e.g. to stop loading and/or execution without consent) it is necessary to
modify the resulting HTML of your webpages.

This can be achieved by simply replacing some attributes - see https://github.com/KIProtect/klaro#managing-third-party-appstrackers

We try to provide preconfigured solutions for some common Neos packages, please have a look at [`/Resources/Private/Fusion/PresetPackages`](https://github.com/tmsdev/Tms.Consent/tree/master/Resources/Private/Fusion/PresetPackages)
what we've already covered. Your package is missing? Submit a PR, if you think the service configuration could be useful for others.

### Step 3: Verify

Check your site - have you blocked all your critical services?

* by using the dev tools of your favorite browser
* or simply run a check on https://webbkoll.dataskydd.net/

### (Optional) Step 4: Better UX for blocked content elements

This is an example how to use the Fusion Component for a Youtube + Bootstrap markup.

```
prototype(Your.Package:Component.Atom.Youtube) < prototype(Neos.Fusion:Component) {
    renderer = afx`
        <div class="embed-responsive embed-responsive-16by9">
            <Tms.Consent:Component.Atom.NoConsentPlaceholder serviceName="youtube" imageUri="" />
            <iframe src="about:blank" data-name="youtube" data-src="https://www.youtube-nocookie.com/embed/4DVD03IlXIs?wmode=transparent&amp;autoplay=&amp;controls=1&amp;rel=&amp;showinfo=" class="embed-responsive-item" loading="lazy" allowfullscreen="1"></iframe>
        </div>
    `
}
```

## Wishlist

* Add multi-site support
* Backend module with some basic statistics on acceptance rate
* User location based configurations

Any feedback, pull request or other contribution is very welcome!

## Acknowledgments

Development sponsored by [tms.development - Online Marketing and Neos CMS Agency](https://www.tms-development.de/)

Webpack config inspired by https://github.com/neos/redirecthandler-ui
