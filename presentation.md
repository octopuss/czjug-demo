<!-- .slide: data-background="#fff" -->
![logo](img/czjug.jpg)
#CZJUG
##Hradec Králové
21.10.2015

---

## Outline
-   Spring Boot MVC
-   Pitfalls of web development
-   Webpack
-   Pitfalls of web development no.2
-   React.js + Flux
-   Spring + Webpack + React
-   JsxViewResolver

Note:
Introduce yourself :)

---

##Spring Boot MVC
-   Takes an opinionated view of building production-ready Spring applications.
-   Quick application kick-off using [Starters](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-starters)
-   Easy configuration via [properties file](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html)

Note:
describe spring boot and show on what it is dependent, list through starters and pick the most used

--

### Add pom.xml fragments
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.2.6.RELEASE</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

Note: main class should be added to properties
InteliJ Idea has support for Spring boot projects
--

### Create simple java class
```java
    package hello;
    import org.springframework.boot.*;
    import org.springframework.boot.autoconfigure.*;
    import org.springframework.stereotype.*;
    import org.springframework.web.bind.annotation.*;
         
    @Controller
    @EnableAutoConfiguration
    public class SampleController {
        
        @RequestMapping("/")
        @ResponseBody
        String home() {
            return "Hello World!";
        }
        
        public static void main(String[] args) throws Exception {
            SpringApplication.run(SampleController.class, args);
        }
    }
```
Note: show application in prepared project
https://github.com/octopuss/czjug-demo/blob/master/src/main/java/cz/morosystems/czjug/Application.java
if possible say why is it in base package :)

---

##Pitfalls of web development
-   Code duplicities and unused code (css)
-   Tons of request to the server

Note:on next slide duplicity - font awesome css

--

![Scripts+unused](img/ac-head.jpg)

--

![Timeline](img/timeline.jpg)

Note: 2.9 MB in scripts and styles , 55 requests
--

![Scripts everywhere](http://zlml.cz/uploads/e80e305e-8431-4c0e-9c79-5db761c22608/199aff3.jpg)

---

##Webpack
![Webpack](http://webpack.github.io/assets/what-is-webpack.png)

--

##Webpack
-   Node.js module bundlerer for web
-   Other filetypes accessible using loaders
-   Capable of multiple entry points
-   Sync and Async loading "code-splitting"
-   extensible using plugins

Note: Other options are Browserify (compare table https://webpack.github.io/docs/comparison.html)
--

#webpack.config.js
```sh
npm i webpack -g
```
```javascript
var webpack = require('webpack');
module.exports = {
    entry: ['./slides-loader.js'],
    output: {
        path: __dirname + '/build',
        filename: 'slides-loader.js',
        publicPath: 'build/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css"},
            {test: /\.((svg)|(woff)|(woff)|(ttf)|(eot))$/, loader: 'file-loader', query: {name: '[name]\.[ext]'}} 
        ]
    }    
};

```

Note: plugins will be shown in demo application

--

###Output
```html    
<script src="build/slides-loader.js" charset="UTF-8"></ script>
```        
![Excelent](http://aintnogod.com/ipb/uploads/gallery/album_17/gallery_298_17_1836.gif)

Note: one script that loads e.g. css asynchronously by adding resource link tag into head

---

##Pitfalls of web layer development no.2
-   Direct DOM manipulation
-   GUI elements cross dependencies
-   missing data layer for GUI
-   overuse of plugins (JQuery)

--

###Direct DOM manipulation
```javascript
$.post('/login', credentials, function( user ) {
    // Modify the DOM here
    $('header .name').text( user.name );
    ...
});
```
Note: dom can be manipulated easily by anyone from everywhere

--

###GUI elements cross dependencies 
![Field dependencies](img/fld_dependencies.png)
Note: even simple application form can have multiple dependencies between fields. Fields usually need to know the reference to each other

--

###Missing single source of truth
-   multiple places for displaying same data
-   displayed data dependent on complex conditions
-   two way databinding / watchers
![Hide and seek](http://i.imgur.com/h3ETWQN.jpg)

--

###Overuse of plugins
![Field dependencies](img/ac-plugins.png)

Note: for each "fancy" functionality you have plugin, script and css - added functionality is in separate file not clearly bind to its usage.

---

##React.js
-   It is only a view layer
-   gives you a template language and some function hooks to essentially render HTML
-   you can always tell how your component/GUI will be rendered by **looking at one file**
-   you cannot build a fully functional dynamic application with [React](http://facebook.github.io/react/) alone

--

###What it does not give you
-   build in event system
-   Ajax and callback handling (no Promises)
-   data layer
-   hint how to implement the above

Note: you can use any other frameworks, libraries if you want

--

###Component example
```javascript
var Header = React.createClass({
  ...
  render: function() {
    return <header>
            { this.state.name ?
                this.state.name :
                <span>Not Logged In</span> }
        </header>;
  }
  ...
});
```
Note: more complex component will be shown in application
https://github.com/octopuss/czjug-demo/blob/master/src/main/webapp/WEB-INF/components/Table.jsx

---

##Flux
-   more of a pattern than a framework
-   unidirectional data flow
-   the dispatcher, the stores, and the views
-   similar to pub-sub architecture

--

###Flux
![Flux](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

---

##Spring + Webpack + React Example
-   Spring for backend
-   Webpack for resource management
-   React + Flux for view layer

--

###Spring boot application
-   MVC, JPA, data starters, Jetty, Hsql
-   InternalResourceViewResolver + Jstl
-   Crud Operations on "Partner" entity
-   assembled by Maven

--

##Webpack
-   Commons (*CSS and js*), Uglify(*in production*), ExtractText plugins
-   Entrypoint generated for each view
-   run manually or using maven profile
-   CSS for each module

--

##View Layer
-   React components (*react-bootstrap*) + custom made
-   Validation functions and binding in separate files
-   localStorage, promise, Jquery (just for Ajax <span style="font-family:FontAwesome">&#xf118;</span>)


---

##JsxViewResolver
-   render React components using Java
-   Noexistent window,console...
-   just POC for Java 7, so why?

---

#Questions?
![I Robot](http://s2.quickmeme.com/img/c0/c05d29c5606217bc394a2f79dd229434dafe0d299985130697b78f38e98c56c2.jpg)

