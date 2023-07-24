---
h1: "Creating a Project on the Hogo."
tags: ['dev', 'hugo', 'to-start', 'config', 'baseof']
---

In this article we will consider how to create a hugo site from scratch, as well as understand the basic steps in creating a standard theme.

> It is important to understand that themes are always created for different projects and needs, so some of the steps in these instructions may be optional, before creating a project you should always carefully read the ToR and discuss all questions and controversial issues with your team leader.

## Deploy the project

After [install-hugo](/devs/install-hugo/) open terminal and execute the following command:

````
hugo new site SITE NAME
````

In the **SITE_NAME** field specify the name of your project

![project initialization](/images/devs/how-startup-hugo-site/build-bolerplate.png) 

After successful initialization, you will receive a notification that your site has been created.

Go into the folder and see the following [structure](/devs/hugo-project-structure/):

![project-structure](/images/devs/how-startup-hugo-site/hugo-structure.png) 

## Basic structure

When creating a theme, we will be working in the **layuots** folder. 

1. Create a **_default** folder in the root **layuots**, these will be the basic templates of our project. You can learn more about [template hierarchy](#) here.
2. In **_default** create templates for the **list.html** and **single.html** directory 

> Be sure to write something (you can just put a symbol or write hello world, we will start template layout later) in html files, otherwise the template will not be readable. 

3. Create a file **baseof.html**. As a result, we get the following structure:

![default-folder-structure](/images/devs/how-startup-hugo-site/default-folder-structure.png) 


## Working with the baseof file

In the **baseof.html** file, expand the base structure of the html document

![baseof base structure](/images/devs/how-startup-hugo-site/baseof-main.png)

Making the structure dynamic:

- In the *html* tag, in the *lang* attribute, enter the hugo code **{{{.Language.Lang }}**

- Cut the content from the **head** tag and transfer it to a new file

- Save the new file under the path *layouts/partials/head* (we create folders by ourselves), we can name it arbitrarily, I will choose **main.html**.

- In the **baseof.html** file, in the **head** tag, call the created file. Use the following code **{{{{- partial "head/main.html" . }}**

> **partial** is the keyword for calling modules from the *partials* folder, after it we specify the path to the module in quotes, then we need to put the **.** sign - more about passing the scope [here](#). The **-** sign at the beginning of the code allows us an extra line break, it is optional.

- In you *body* we write **{{ block "main" . }}{{{ end }}**. This will allow us to pull in content from other templates such as *single* and *list*.

We get the following code:

![baseof-structure baseof](/images/devs/how-startup-hugo-site/baseof-result.png)


## Customize the parshal in the head

Let's edit the *layouts/partials/head/main.html* file. 

1. Plug in the **autometa** file before the *title* tag, it will help us to fill in the meta if it is not spelled out explicitly on the page. You can learn more about auto-meta at [link](#).
	- In the **partials/head** folder, create the **autometa.html** file.
	- In the **main.html** file, connect it using the following code **{{partial "head/autometa.html"}}**
2. Connect the **alternate site links** file. You can learn more about alternate links and how to connect them at [link](#). The connection algorithm is the same as in *item 1*.
3. Connect the **seo** file containing the main seo content. You can learn more about the seo file at [link](#). The connection algorithm is the same as in *item 1*.
4. Connect the **schema** file containing the main json scripts for the *schema.org* meta. You can learn more about the schema file at [link](#). The connection algorithm is the same as in *paragraph 1*.
5. Connect **favicons**. You can learn more about connecting them at [link](#). The connection algorithm is the same as in *item 1*.
6. In the **title** tag, call the global variable **$.Scratch.Get "title "**. If your project does not require an autotitle, you can make a dynamic title using the following code **{{.Title}}**

We get the following structure:

![head meta](/images/devs/how-startup-hugo-site/head-meta.png)

### Meta for pagination pages

Many projects need to embed navigation links for pagination pages in the head. To do this we use the following code:

````
{{- if .Paginator -}}
{{- if .Paginator.HasPrev -}}}
<link rel="prev" href="{{ .Paginator.Prev.URL | absURL }}">
{{- end -}}
{{- if .Paginator.HasNext -}}
<link rel="next" href="{{ .Paginator.Next.URL | absURL }}">
{{- end -}}
{{- end -}}
````

You can learn more about how this code works [here](#).

### Add the option to close from indexing

Use the following code:

````
{{$paginate := false}}
{{- with .Paginator -}} 
{{- $paginate = ne .PageNumber 1 -}}
{{- end -}}
{{- if or (or .Page.Params.noindex $.Site.Params.noindex) ($paginate) -}}
<meta name='robots' content='noindex, nofollow' />
{{- else -}}
<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
{{- end -}}
````

You can learn more about how it works [here](#) 

### Connect styles and fonts

There are 2 ways to connect directly in head and through site config. 

#### Connecting directly in head

To **connect directly** use the following code:

````  
 <link rel="stylesheet" href="{{{`Path_to_file` | absURL}}">
````

- In the **Path_to_file** field, type the *relative* path to the css stylesheet file, starting from the root *static* path
- The **absURL** pip allows you to output this path absolutely taking into account the domain name, which can be specified later.

#### Where do I put static content?

All images, font files, scripts and styles are placed in the **static** folder in the root of the project. Let's look at an example:

I need to plug in the *main.css* file. For better support of the project structure in the future, we will observe the file system hierarchy.

- In the **static** folder create the **css** folder, this is where our styles will be located.
- Put the *main.css* file into the created folder.
- In the parshall **head/main.html** connect the file **<link rel="stylesheet" href="{{`/css/main.css` | absURL}}">**

Note that you **don't** need** to include the **static** papac in the relative file path.

Using the direct half-connection in the head, you will need to prescribe each new file as you would with a normal static layout, handling its path as described above. Here's an example of this approach at work:

![plug styles directly into head](/images/devs/how-startup-hugo-site/infile-link-connection.png)

A more universal way would be to use a loop and a configuration file. Let's consider this method below:

#### Connection via site config

Use the following code:

````
{{range .Site.Params.styles}}
<link rel="stylesheet" href="{{ . | absURL}}">
{{end}}
````

Then in the config file we will connect the styles in an array, and they will be pulled into the layout automatically. Read more about configuring the config file below.

> If you have several different types of data being connected in the head, you will need to duplicate the loop by replacing the tag inside with the actual tag, and setting a new key for the config parameter. 

As an example, let's create a font connection:

````
{{range .Site.Params.fonts}}
<link rel="preload" href="{{ . | absURL}}" as="font" crossorigin="anonymous">
{{end}}
````

The result is the following:

![connect fonts and styles in config](/images/devs/how-startup-hugo-site/fonts.png)


## Customize footer

In the **_default/baseof.html** file, we connect the footer. The algorithm is exactly the same as described above. Example of my connection:

![footer connection](/images/devs/how-startup-hugo-site/footer-connection.png)

I didn't create a separate folder for the footer files, since I don't plan to connect much there, so I created the **footer.html** file right in the **partials** folder. 

In the *footer* file the footer itself will be built later, for now I'll leave it empty, only connect scripts by analogy with styles in the head:

![connect scripts in footer](/images/devs/how-startup-hugo-site/scripts.png)


## Call baseof in theme files

For the backbone of the site to be adequately rendered in the theme files, it needs to be called. Let's connect the baseof structure to the base templates **list** and **single**. To do this, use the following code in both files:

````
{{ define "main" }}
{{ HERE_WILL_BE_VERSE
{{ end}}
````

Instead of the **THERE_WILL BE_VERSION** marker, put any html code according to your task.

## Configure the config

One last thing worth mentioning is basic config customization. The config is configured in the **config.toml** file in the root of the project. By default we have the following structure created:

![connect scripts in footer](/images/devs/how-startup-hugo-site/config-base.png)

Let's implement a few basic elements


### baseURL 

This parameter is responsible for the domain name of your site. put it there if you know it. If you plan to release to a test domain, specify it. 

> Be sure to use the https protocol and a closing slash at the end to avoid unnecessary redirects.

### languageCode

Specify the language version of the site

#### title

This is the default title for the entire site. If you use this code in the head, write a common title for all pages (if you don't know, you can just leave empty quotation marks).

````
<title>{{.Title}}</title>
````

If you use a parshal with a default meta and the global variable **$.Scratch.Get "title "**, you can delete this line and customize the default title according to the instructions [here](#)

### defaultContentLanguage 

Add parameter **defaultContentLanguage** for multi-language sites, specify the main language of the site in it. Example:

````  
defaultContentLanguage = "ru"
````

### disableHugoGeneratorInject 

Disables the string indicating what the site was created on. **Add mandatory**, set param to *true*:

````
disableHugoGeneratorInject = true
````

### canonifyURLs 

Allows to make all urls absolute, enable this parameter:

````
canonifyURLs = true
````

## Language Options

Add the following code:

````
[languages]
    [languages.ru]
        contentDir = "content"
        languageName = "ru"
        weight = 1
```` 

- **languageName** - will be displayed in the html tag, in the lang attribute
- **contentDir** - specify the path to the content of the corresponding language version, if the language is the same, then specify the path to the content folder.
- **weight** - language priority, may be required in a number of cases described in [article](#) about creating language versions.


## Lock the site from the index

During development on the test site it is necessary to close the site from nindexing, the code implemented above allows you to do this. To close the site globally, in the config we write the following:

````
[params]

noindex = true
````

We get the following basic config file:

![minimum config settings](/images/devs/how-startup-hugo-site/config-minimum.png)

In the course of work with the site you will add more and more new elements, expanding both the config file and the structure of templates. For further work it is recommended to familiarize yourself with the following articles:

- [Creating and customizing the home page file - index.html](#)
- [Creating and customizing the default directory file - list.html](#)
- [Create and customize default post file - single.html](#)
- [Content and work with it](#)



> You can also find [the code for this project](https://github.com/1cats/wiki) on the github repositories.