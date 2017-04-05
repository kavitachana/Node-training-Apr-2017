# Chapter 7 Exercise 2: Templating With Data
## Objectives:
* Install Pug and use Pug to render views.
* Pass data (locals) to rendered templates

## Steps
1. You need to navigate to the directory `Labs/Ch07-UsingExpress/Exercise02-TemplateWithData/Begin/code`
1. Install Pug with `npm install --save pug`
1. Edit server.js
    - Use require to define a path
    - Use the `app.set()` method with the following arguments: [app.set is for configuring Express options]
	    - The string "views", which indicates the setting to configure
	    - The result of calling the `path.join()` method with the following arguments: [this combines two or more path segments into a single path]
		    - `__dirname`, which is a special variable, that contains the path of the folder that the script it's used in exists in - so, in this case, the folder that contains `server.js`
		    - The string "views", which is the name of the folder where we're storing the view
    - Call the `app.set()` method to set the view engine to pug
1. Open the index.js routing file for editing
    - Change the route to`res.render` instead of calling `res.send` 
	- Pass the string "index", which is the filename (without extension) of the view that we want to render
## Steps to add template data:
1. Install Moment.js: `npm install --save moment`
// Create class
1. Edit the file routes/index.js
    - Require the `moment` library as a `const` named `moment`
    - Define the following data as sample data:
    ```javascript
		let students = [{
			nameFirst: "Devin",
			nameLast: "Durgan",
			email: "Devin.Durgan@gmail.com",
			hireDate: moment("01/19/2015", "MM/DD/YYYY")
		}, {
			nameFirst: "Cristal",
			nameLast: "Adams",
			email: "Cristal.Adams@live.com",
			hireDate: moment("07/29/2016", "MM/DD/YYYY")
		}, {
			nameFirst: "Nettie",
			nameLast: "McGlynn",
			email: "Nettie.McGlynn@gmail.com",
			hireDate: moment("08/29/2015", "MM/DD/YYYY")
		}];
    ```  
1. Also add to routes/index.js
     - Modify the `res.render()` call in the `/` route, to pass in a second argument - an object that contains the `students` variable as the `students` property [these are the locals passed to the template]
     - Create a new route for the "/class" path that renders the "class" template, passing in a similar object containing the `students`
     - Create a new route for the "/about" path that renders the "about" template

## Template creation steps:
1. Create “views” directory
1. In the views directory make new files “layout.pug” and “index.pug”
1. Add code to layout and index files to render html pages
1. Layout.pug will contain the basic html, head and body elements and information
	```pug
	doctype html
	html
		head
			meta(charset='utf-8')
			meta(http-equiv='X-UA-Compatible', content='IE=edge')
			meta(name='viewport', content='width=device-width, initial-scale=1')
			title Class Management App
	
			link(rel='stylesheet', href='/css/bootstrap.min.css')
			link(rel='stylesheet', href='/css/custom.css')
		body
			nav.navbar.navbar-default.navbar-static-top
				.container-fluid
					.navbar-header
						button.navbar-toggle.collapsed(type="button", data-toggle="collapse", data-target="#navbar", aria-expanded="false", aria-controls="navbar")
							span.sr-only Toggle navigation
							span.icon-bar
							span.icon-bar
							span.icon-bar
						a.navbar-brand(href="/") Class Management App
					#navbar.navbar-collapse.collapse
						ul.nav.navbar-nav.navbar-right
							li
								a(href="/") Students
							li
								a(href="/class") Tools
							li
								a(href="/about") About
	
			.container.content
				block content
	
			include foot
	```
1. Index.pug and any other file extend layout and will contain the content for each page
	```pug
	extends layout
    
    block content
    	header.page-header
    		h1 Student Manager Application
    
    	.search.container-fluid(style="text-align: center;")
    		.col-md-3
    		form.col-md-6
    			input.form-control#inputSearch(type="text", onkeyup="filter()", placeholder="Search (name, email or hire date)")
    		.col-md-3
    
    	.col-md-2
    
    	.students.col-md-8
    		table.table#studentList
    			thead
    				th Name
    				th Email
    				th Hire Date
    			each student in students
    				tr
    					td #{student.nameFirst} #{student.nameLast}
    					td #{student.email}
    					td #{student.hireDate.format("MM/DD/YYYY")}
    
    	.col-md-2
	```
1. Create class view
	```pug
	extends layout
    
    block content
    	header.page-header
    		h1 Classroom Tools
    
    	// TODO: Debug/Update - Add time instead of set
    	.container-fluid
    		.col-md-3
    		.break-timer.col-md-6
    			h2 Break Timer (Debugging)
    			div
    				button.btn.btn-default(onclick="startTimer(1)") 1 Min
    				button.btn.btn-default(onclick="startTimer(5)") 5 Min
    				button.btn.btn-default(onclick="startTimer(10)") 10 Min
    				button.btn.btn-default(onclick="startTimer(0)") Clear
    			#clockdiv
    				div
    					span.timer 00 : 00
    		.col-md-3
    
    	.container-fluid
    		.col-md-3
    		.random-student.col-md-6
    			h2 Student Selector
    			h4#student
    			button.btn.btn-success(onclick="selectStudent()") Select Student
    			if (!students)
    				span#student  No students loaded
    		.col-md-3
    
    	script(src='/js/timer.js')
    	if (students)
    		script.
    			// Pull student data from express into variable for script
    			var data = !{JSON.stringify(students)};
    			function selectStudent() {
    				var i, names = [];
    
    				for (i = 0; i < data.length; i++) {
    					names.push(data[i].nameFirst);
    				}
    
    				var setStudent = names[Math.floor(Math.random() * names.length)];
    
    				$("#student").html(setStudent);
    			}

	```
1. Create about view
	```pug
	extends layout
    
    block content
    	header.page-header
    		h1 About
    
    		h2 Student Manager Application
    	.about
    		strong Student Manager Application
    		p This is a demo application used in the Intro to Node Development course
    		p
    			| For more information, please contact
    			a(href='mailto:judy@karmoxie.com') Judy Lipinski
    			| from
    			a(href='http://www.karmoxie.com') Karmoxie Consulting
	```
## Run the application
1. Install Node dependencies `npm install`
1. Run the server `nodemon server.js`
1. Point a browser at the URL `http://localhost:3000`
1. You should see the output from the server. If not fix any problems