---
h1: Creating a default post file (single page)
tags: ['dev', 'hugo', 'to-start', 'single', 'default']
---

All internal pages in hugo are of type single and by default use the **single** template from the **_default** folder. Read more about [template hierarchy](#) and [how to override the default template](#) for a specific page type.

## What content is displayed on pages of type single?

All markdown files that are named and stored in the content folder or subfolders will be of type single.

For example, this article is located in the *dev* folder and is named **single-page-setup.md**, so it will pull the **_default/single** template. You can read about other content types [here](#).

## Initializing the default template

To make the template work you need to perform 2 steps:

1. Create a **single.html** file in the **layouts/_default** folder.
2. Fill it with *any* content

Typically, such a template is filled with html layout, and shortcodes. If you use the baseof file, don't forget to initialize it in the template using **{{ define "main" }}**, if you don't, you'll probably need to plug in the **header** and **footer** modules. As an example, here is the code for the current page:


````
{{ define "main" }}
<main class="has_sidebar">
	<div class="container">
		<h1>{{.Params.h1}}</h1>
		{{.Content}}	
	</div>
	{{partial "sidebar.html" . }}
</main>
{{end}}

````



- Method **Params.KEY** - calls a special parameter from the macrdown file. Read more about [macrodownfile structure here](#).
- The **Content** method pulls all other content from the file.
- **{{partial "sidebar.html" . }}** - connects the sidebar. Since a sidebar is not planned on every page type, I only call this in the **single.html** file.


All styles and scripts for this project are specified in the site config, more details [here](/devs/how-startup-hugo-site/#connect-styles-and-scripts):

![connect-scripts-and-styles](/images/devs/single-page-setup/style-setup.png)

## Display article title


Hugo provides automatic generation of article content, the so-called **table of content**, more details [here](https://gohugo.io/content-management/toc/). 

To connect content to the project use the following code

````
{{ .TableOfContents }}
````

You can customize and customize the content. This is done through a config file. Example customization code:

````
[markup]
  [markup.tableOfContents]
    endLevel = 3
    ordered = true
    startLevel = 2
````


- **startLevel** - specifies from which header level the content will be started. The default setting is 1 - h1 header. 
- **endLevel** - specifies at what level of nesting of headers the rendering of the content should be stopped. For example, if the value 3 is specified, then headings of the level below (h4, h5, h6) will not be included in the content. 
- **ordered** - if *true* is specified, the list will be numbered, otherwise it will be labeled (default value).

> Link to original - [here](https://gohugo.io/getting-started/configuration-markup/#table-of-contents).