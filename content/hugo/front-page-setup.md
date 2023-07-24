---
h1: Creating a home page
tags: ['dev', 'hugo', 'to-start', 'main-page']
---

## Home page hierarchy

To create a unique layout for the homepage, you need to create a **index.html** file in the **layouts** folder. The layout from this file will be displayed on all homepages of all language versions.

In the absence of this file, the layout is taken from *layouts/_default/list.html*.

![](/images/devs/front-page-setup/layout-hierarchy.png)


## Layout 

If using the **baseof** template, you will need to initialize it first:

```` 
{{ define "main" }}

<-- HERE'S THE LAYOUT -->

{{end}}
````

If, however, you just output the header and footer into separate parshals, it will be necessary to call them in the template:

````
{{partial "header.html" . }}
{{partial "footer.html" . }}
````

> **Important!** Use one of the approaches described above, don't mix them.

### HTML in layout

Use modern layout standards. Read more about HTML5 [here](https://html.com/html5/).

### Hugo Go code in the layout

In the homepage template, as in any other template, you can use all [functions](https://gohugo.io/functions/) and [variables](https://gohugo.io/variables/) provided by hugo go. The most commonly used are:

- **Parshals**. Allow you to connect any element, such as a surdider or banner

````
{{partial "banner.html" . }}
 ````	

- **Local Fields**. Unique text for each page, e.g. header

````
{{.Params.h1}}
````

- **Global Fields**. A universal site-wide value that is set in the config file

````
{{.Site.Params.brandname}}
````

- **Static Fields**. Often there are labels or buttons on the site, the text of which is identical for each page, but must be translated, for this purpose [i18n](https://gohugo.io/functions/i18n/) is used.

````
{{i18n "btn_1"}} 
````

Sample code of the front page


![](/images/devs/front-page-setup/front-page.png)


## Useful links

- You can read more about creating the front page in the [official documentation](https://gohugo.io/templates/homepage/).
- You can also use the ready-made clean [hugo build](https://github.com/1cats/hugo-clean-template) to get started.

## Video on the topic


{{<youtube ut1xtRZ1QOA>}}
