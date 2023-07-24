---
h1: How to start a multilang
tags: ['dev', 'hugo', 'to-start']
---

To deploy a multilang site you need:  

## In the config. 

1. Specify the default language of the site

````
defaultContentLanguage = "SLAG"
````

2. Create a **languages** section and add as many languages as you want there

````
[languages]
[languages.en]
contentDir = "content/en"
languageName = "en"
[languages.ru]
contentDir = "content/en"
languageName = "ru"
[languages.ua]
contentDir = "content/ua"
languageName = "ua"
````
- **languageName** - language slug
- **contentDir** - path to the folder with language content



## Translating fields through i18n

1. Create **i18n** folder in the project root.
2. Add to it **yaml** file named by language slang: *LANG.yaml 
3. Throw in all fields needed for translation according to the key-value scheme.

````
- id: "KEY_IN_VERSION"
  translation: "TRANSLATION"
````

### Content

1. In the **content** folder, create the desired number of folders by the name of the language syllable
2. Add translated content there

### Language menu

1. Design the language menu
2. wrap it in a hugo loop

> Pages with no translations in the folders will not be displayed in the language menu.

You can use [clean theme](https://github.com/1cats/hugo-clean-template) to run a multi-language site. 