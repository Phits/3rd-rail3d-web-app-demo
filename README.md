Grunt-Testing
URL

##Deployment
This site uses Grunt to run locally and deploy remotely.

 Grunt uses nodejs which can be downloaded at http://www.nodejs.org which comes with npm. Go to http://gruntjs.com/getting-started and follow the instruction to install the CLI for Grunt. Once Grunt and, node.js and CLI for Grunt are installed, navigate to the root directory of this repository and run "npm install" to install ALL dependencies.

 When all the dependencies are installed, you can type "grunt" in the command line to run the site locally.

 Only edit the files in the static folder. Index.html pulls in the css and js files so that you should be able to run the site locally.

 ##Customizing the Grunt Process
 There are 3  lines in the Gruntfile.js that you will need to be updated as the site grows. They are:
 ```
 ftpDirectory: "/3rd-rail/"

 js: {
    src: [['static/js/bootscrap.js','static/js/main.js']],

css: {
    src: [['static/css/reset.css','static/css/main.css']],
 ```

 The **ftpDirectory** is the base path on the server where we will be hosting the static assets for the site.

 The **js:src** should list all the Javascript files that we are using on this site.

 The **css:src** should list all the stylesheet files that we are using on this site.

 To FTP the assets you will need to save example.ftppass as .ftppass and include the proper username and password.

 When you are ready to deploy the site, type "grunt build". This will concatanate and minify the css and js files.

 If you have ftp problems, you can use "grunt build-local" instead. This will create the build folder the same as "grunt build", but it will not ftp the assets, so you will have to ftp manually.

 For every build that you create, a git tag is created, with the time stamp in the title, and pushed to the repo so that if you ever need to return to a previous version of the page, it will be available. 
