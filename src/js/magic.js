
//STUDENTS
$('#studentBtn').click(function()
	{

		//console.log("Submit Form");

		var formData = {
			'specialSelect' : $specialSelect, //default value on page load is 'viewStudents'
			'rNumber'     : $('input[name=rNumber]').val(),
			'firstName'   : $('input[name=firstName]').val(),
			'lastName'    : $('input[name=lastName]').val(),
			'currentLab'  : $('select[name=currentLab]').val(),
			'email'       : $('input[name=email]').val(),
			'searchType'  : $('#viewStudents').val()
		};
		
		//console.log(formData);	
		
		$.ajax(
		{
			url      : './php/process.php',
			type     : 'POST',
			//data     : JSON.stringify(formData),
			data     : formData,
			//contentType: "application/json; charset=utf-8",
			dataType :  'json'
			//encode   : true
		})
			.done(function(data) {
				
				//rNumber, firstName, lastName, currentLab, email

				//console.dir(data);

				if ($specialSelect == 'addStudent'){

					//console.dir('Student added called.')
				}
				
			if ($specialSelect == 'viewStudents'){$('#studentResult').empty();}


			if (data.data.success){
				//SUCCESS
				$('div[id=studentSuccess]').hide();
				
					if ($specialSelect == 'viewStudents'){

						//Warning for zero results
						if (data.json == undefined || data.json == null || data.json.length == 0){
							$('div[id=studentSuccess]').removeClass("alert-danger").removeClass("alert-success").addClass("alert-warning").fadeIn(600);
							successmsg = '<strong>Message: </strong> ' + 'Zero results found.';
						}

						else{
								$.each(data.json, function(index, element){
									if (Object.keys(data.json)){
										templength = Object.keys(data.json).length;
										//Success and show number of results found
										$('div[id=studentSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
										successmsg = '<strong>Success: </strong> ' + templength + ' result(s) found!';	
									}
								});
							}


						//Show results 
						$.each(data.json, function(index, element){
								$('#studentResult').append( 
									'<tr>' + 
									'<td>' + element.rNumber + '</td>' +
									'<td>' + element.firstName + '</td>' +
									'<td>' + element.lastName + '</td>' +
									'<td>' + element.currentLab + '</td>' +
									//'<td>' + element.email + '</td>' +
									'</tr>');
						});

					}
					else if ($specialSelect == 'addStudent'){
							//success new lab
							$('div[id=studentSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
							successmsg = '<strong>Success: </strong> '+'New student created!';
					}	
					$('div[id=studentSuccess]').html(successmsg);	
					
				}
				else {
					//ERROR
					$('div[id=studentSuccess]').hide();
					$('div[id=studentSuccess]').removeClass("alert-success").removeClass("alert-warning").addClass("alert-danger").fadeIn(600);
					$.each(data.data.errors, function(index, element){
						errormsg = '<strong>Error: </strong> ' + element;
					}); 
					//console.log(errormsg);
					$('div[id=studentSuccess]').html(errormsg);
					errormsg = '<strong>Error:</strong>  Unknown error occured.';
					
				}
	
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
			
			});

});	

//STUDENT BUTTONS

$("button[name='Create Student']").click(function(){

	$("button[name='Create Student']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='View Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Edit Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Delete Student']").attr('class', 'btn btn-default btn-block btn-lg');

	$("div[name='searchstudentByDiv']").hide();
	$("div[name='currentLabDiv']").show();
	$('#studentBtn').html("Add Student");
	$specialSelect = 'addStudent';

});

$("button[name='View Student']").click(function(){

	$("button[name='Create Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='View Student']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Edit Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Delete Student']").attr('class', 'btn btn-default btn-block btn-lg');

	$("div[name='searchstudentByDiv']").show();
	//$("div[name='currentLabDiv']").hide();
	$('#studentBtn').html("Search");
	$specialSelect = 'viewStudents';

});

$("button[name='Edit Student']").click(function(){

	$("button[name='Create Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='View Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Edit Student']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Delete Student']").attr('class', 'btn btn-default btn-block btn-lg');
	alert("Edit Student is not yet functional.");
	$specialSelect = 'updateStudent';

});

$("button[name='Delete Student']").click(function(){

	$("button[name='Create Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='View Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Edit Student']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Delete Student']").attr('class', 'btn btn-info btn-block btn-lg active');
	alert("Delete Student is not yet functional.");
	$specialSelect = 'deleteStudent';

});

//LAB FUNCTION
$('#labBtn').click(function()
	{
		//$('div[id=labWarning]').fadeOut();
		//console.log("labBtn clicked");

		var formData = {
			'specialSelect' : $specialSelect,
			'courseNumber'     : $('input[name=courseNumber]').val(),
			'sectionNumber'   : $('input[name=sectionNumber]').val(),
			'semester'    : $('select[id=semester]').val(),
			'year'  : $('input[name=labyear]').val(),
			'professor'       : $('input[name=professor]').val(),
			'CRN'  : $('input[name=CRN]').val(),
			'searchType'  : $('#viewLabs').val()
		};

		//console.log(formData);	
		
		$.ajax(
		{
			url      : './points-includes/process.php',
			type     : 'POST',
			//data     : JSON.stringify(formData),
			data     : formData,
			//contentType: "application/json; charset=utf-8",
			dataType :  'json'
			//encode   : true
		})
			.done(function(data) {
				

				//console.dir(data);
				

				if ($specialSelect == 'viewLabs'){

					$('#labResult').empty();
					$.each(data.json, function(index, element){

							$('#labResult').append(
								'<tr>' + 
								'<td>' + element.CRN + '</td>' +
								'<td>' + element.courseNumber + '</td>' +
								'<td>' + element.sectionNumber + '</td>' +
								'<td>' + element.semester + '</td>' +
								'<td>' + element.year + '</td>' +
								'<td>' + element.professor + '</td>' +
								'</tr>');
					});
					
				}

			if (data.data.success){
				//SUCCESS
				$('div[id=labSuccess]').hide();
				
				if ($specialSelect == 'viewLabs'){

					//Warning for zero results
					if (data.json == undefined || data.json == null || data.json.length == 0){
						//console.log('got here else');
						$('div[id=labSuccess]').removeClass("alert-danger").removeClass("alert-success").addClass("alert-warning").fadeIn(600);
						successmsg = '<strong>Message: </strong> ' + 'Zero results found.';
					}

					else{
							$.each(data.json, function(index, element){
								if (Object.keys(data.json)){
									templength = Object.keys(data.json).length;
									//Success and show number of results found
									$('div[id=labSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
									successmsg = '<strong>Success: </strong> ' + templength + ' result(s) found!';	
								}
							});
						}
				}
				else if ($specialSelect == 'addLab'){
						//success new lab
						$('div[id=labSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
						successmsg = '<strong>Success: </strong> '+'New lab created!';
				}	
				$('div[id=labSuccess]').html(successmsg);	
				
			}
			else {
				//ERROR
				$('div[id=labSuccess]').hide();
				$('div[id=labSuccess]').removeClass("alert-success").removeClass("alert-warning").addClass("alert-danger").fadeIn(600);
				$.each(data.data.errors, function(index, element){
					errormsg = '<strong>Error: </strong> ' + element;
				}); 
				//console.log(errormsg);
				$('div[id=labSuccess]').html(errormsg);
				errormsg = '<strong>Error:</strong>  Unknown error occured.';
				
			}

				
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
				//$('div[id=labWarning]').fadeIn();
			
			});

		//used to update student lab options
		if ($specialSelect == 'addLab'){
			clearLabs();
			showAllLabs();
			//console.log('clearlabs refresh called.')
		}

});	

//LAB BUTTONS

$("button[name='View Labs']").click(function(){

	$("button[name='View Labs']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Create Labs']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Delete Labs']").attr('class', 'btn btn-default btn-block btn-lg');

	$("div[name='sectionNumberDiv']").hide();
	$("div[name='yearlabDiv']").show();
	$("div[name='professorDiv']").hide();
	$("div[name='searchlabByDiv']").show();
	$('#labBtn').html("View");
	$specialSelect = 'viewLabs';

});

$("button[name='Create Labs']").click(function(){

	$("button[name='View Labs']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Create Labs']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Delete Labs']").attr('class', 'btn btn-default btn-block btn-lg');

	$("div[name='searchlabByDiv']").hide();
	$("div[name='yearlabDiv']").show();
	$("div[name='professorDiv']").show();
	$("div[name='sectionNumberDiv']").show();
	$('#labBtn').html("Create");
	$specialSelect = 'addLab';

});

$("button[name='Delete Labs']").click(function(){



	$("button[name='View Labs']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Create Labs']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Delete Labs']").attr('class', 'btn btn-info btn-block btn-lg active');

	$("div[name='']").hide();
	$("div[name='']").show();
	$('#labBtn').html("Delete");
	$specialSelect = 'deleteLab';

	alert("Delete Lab is not yet functional.");

});

//EVENT FUNCTION
$('#eventBtn').click(function()
	{

		//console.log("eventBtn clicked");

		var formData = {
			'specialSelect' : $specialSelect,
			'eventName'     : $('input[name=eventName]').val(),
			'semester'    : $('select[id=semesterEvent]').val(),
			'year'  : $('input[name=eventyear]').val(),
			'searchType'  : $('#viewEvents').val()
		};
		
		//console.log(formData);	
		
		$.ajax(
		{
			url      : './points-includes/process.php',
			type     : 'POST',
			//data     : JSON.stringify(formData),
			data     : formData,
			//contentType: "application/json; charset=utf-8",
			dataType :  'json'
			//encode   : true
		})
			.done(function(data) {
				

				//console.dir(data);


				

				if ($specialSelect == 'viewEvents'){

					$('#eventResult').empty();
					$.each(data.json, function(index, element){

							$('#eventResult').append(
								'<tr>' + 
								'<td>' + element.eventName + '</td>' +
								'<td>' + element.semester + '</td>' +
								'<td>' + element.year + '</td>' +
								'<td>' + element.dateCreated + '</td>' +
								'</tr>');
					});
					
				}

			if (data.data.success){
				//SUCCESS
				$('div[id=eventSuccess]').hide();
				
				if ($specialSelect == 'viewEvents'){

					//Warning for zero results
					if (data.json == undefined || data.json == null || data.json.length == 0){
						//console.log('got here else');
						$('div[id=eventSuccess]').removeClass("alert-danger").removeClass("alert-success").addClass("alert-warning").fadeIn(600);
						successmsg = '<strong>Message: </strong> ' + 'Zero results found.';
					}

					else{
							$.each(data.json, function(index, element){
								if (Object.keys(data.json)){
									templength = Object.keys(data.json).length;
									//Success and show number of results found
									$('div[id=eventSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
									successmsg = '<strong>Success: </strong> ' + templength + ' result(s) found!';	
								}
							});
						}
				}
				else if ($specialSelect == 'addEvent'){
						//success new lab
						$('div[id=eventSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
						successmsg = '<strong>Success: </strong> '+'New event created!';
				}	
				$('div[id=eventSuccess]').html(successmsg);	
				
			}
			else {
				//ERROR
				$('div[id=eventSuccess]').hide();
				$('div[id=eventSuccess]').removeClass("alert-success").removeClass("alert-warning").addClass("alert-danger").fadeIn(600);
				$.each(data.data.errors, function(index, element){
					errormsg = '<strong>Error: </strong> ' + element;
				}); 
				//console.log(errormsg);
				$('div[id=eventSuccess]').html(errormsg);
				errormsg = '<strong>Error:</strong>  Unknown error occured.';
				
			}
				
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
			
			});

		//used for updated award points event options
		if($specialSelect == 'addEvent'){
			clearEvents();
			showAllEvents();
			console.log('addEvent clear and showall called');
		}

});	

//EVENT BUTTONS

$("button[name='View Events']").click(function(){

	$("button[name='View Events']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Create Event']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Update Event']").attr('class', 'btn btn-default btn-block btn-lg');

	$('div[name=searcheventByDiv]').show();
	$('#eventBtn').html("View");
	$specialSelect = 'viewEvents';

});

$("button[name='Create Event']").click(function(){

	$("button[name='View Events']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Create Event']").attr('class', 'btn btn-info btn-block btn-lg active');
	$("button[name='Update Event']").attr('class', 'btn btn-default btn-block btn-lg');

	$('div[name=searcheventByDiv]').hide();
	$('#eventBtn').html("Create");
	$specialSelect = 'addEvent';

});

$("button[name='Update Event']").click(function(){

	$("button[name='View Events']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Create Event']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Update Event']").attr('class', 'btn btn-info btn-block btn-lg active');

	$('#eventBtn').html("Update");
	$specialSelect = 'updateEvent';

	alert("Update Event is not yet functional.");

});

		$(document).ajaxStart(function () {
            $('#pointsBtn').addClass("disabled");
        });
        $(document).ajaxComplete(function () {
            $('#pointsBtn').removeClass("disabled");
        });

//POINTS FUNCTION
$('#pointsBtn').click(function()
	{
		//$('div[id=pointSuccess]').hide();
		//$('div[id=pointWarning]').hide();

		console.log("pointsBtn clicked");
		//$('#pointsBtn').addClass("disabled");

		var formData = {
			'specialSelect' : $specialSelect,
			'rNumber'     : $('input[name=rNumberAward]').val(),
			'eventID'    : $('select[id=pointsEvent]').val(),
			'pointsAwarded'  : $('input[name=pointsAwarded]').val(),
			'awardedByRnumber'  : $('input[name=awardedByRnumber]').val(),
		};
		
		//console.log(formData);
		$('#pointsResult').empty(); //clear table before showing results

		
		$.ajax(
		{
			url      : './points-includes/process.php',
			type     : 'POST',
			//data     : JSON.stringify(formData),
			data     : formData,
			//contentType: "application/json; charset=utf-8",
			dataType :  'json'
			//encode   : true
		})
			.done(function(data) {
				

				console.dir(data);
				

				if ($specialSelect == 'viewPoints'){

					
					pointsTotal = 0;
					$.each(data.json, function(index, element){

						//Get Event Name								
						//$eventName;

							var eventData = {
								'specialSelect' : 'viewEvents',
								'eventID'     : element.eventID,
								'searchType'  : 'byID'
							};
							console.log(eventData);	
							
							//New Query to retrieve Event Name based off event ID from previous query
							$.ajax(
							{
								url      : './points-includes/process.php',
								type     : 'POST',
								//data     : JSON.stringify(formData),
								data     : eventData,
								//contentType: "application/json; charset=utf-8",
								dataType :  'json'
								//encode   : true
							})
								.done(function(data) {

									console.dir(data);
									$.each(data.json, function(index, element){
											tempeventName = element.eventName;
											//console.log('event name in loop is '+ tempeventName);
											domore();
										
									});

									if (data.data.success){
										$('div[id=pointSuccess]').show();
									}
									else {$('div[id=pointWarning]').show();}


								}) //close done
								.fail(function(data){
									console.log('Failed!');
									console.dir(data);
									$('div[id=pointWarning]').show();
								
								});

							//wait for asynchronous function above to finish
							function domore(){
								//console.log('event name outside is '+ tempeventName);
								$('#pointsResult').append(
									'<tr>' + 
									'<td>' + tempeventName + '</td>' +
									'<td>' + element.pointsAwarded + '</td>' +
									'</tr>'
								);
								//console.log ('points total before is ' + pointsTotal);
								pointsTotal += parseInt(element.pointsAwarded);
								//console.log ('points total after is ' + pointsTotal);
							}


					});
					
				//$('#pointsBtn').removeClass("disabled");
				}

			if (data.data.success){
				//SUCCESS
				$('div[id=pointSuccess]').hide();
				
				if ($specialSelect == 'viewPoints'){

					//Warning for zero results
					if (data.json == undefined || data.json == null || data.json.length == 0){
						//console.log('got here else');
						$('div[id=pointSuccess]').removeClass("alert-danger").removeClass("alert-success").addClass("alert-warning").fadeIn(600);
						successmsg = '<strong>Message: </strong> ' + 'Zero results found.';
					}

					else{
							$.each(data.json, function(index, element){
								if (Object.keys(data.json)){
									templength = Object.keys(data.json).length;
									//Success and show number of results found
									$('div[id=pointSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
									successmsg = '<strong>Success: </strong> ' + templength + ' result(s) found!';	
								}
							});
						}
				}
				else if ($specialSelect == 'awardPoints'){
						//success new points
						$('div[id=pointSuccess]').removeClass("alert-warning").removeClass("alert-danger").addClass("alert-success").fadeIn(600);
						successmsg = '<strong>Success: </strong> '+'Points awarded!';
				}	
				$('div[id=pointSuccess]').html(successmsg);	
				
			}
			else {
				//ERROR
				$('div[id=pointSuccess]').hide();
				$('div[id=pointSuccess]').removeClass("alert-success").removeClass("alert-warning").addClass("alert-danger").fadeIn(600);
				$.each(data.data.errors, function(index, element){
					errormsg = '<strong>Error: </strong> ' + element;
				}); 
				//console.log(errormsg);
				$('div[id=pointSuccess]').html(errormsg);
				errormsg = '<strong>Error:</strong>  Unknown error occured.';
				
			}

				
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
				//$('#pointsBtn').removeClass("disabled");
			
			});

			$(document).ajaxStop(function() {
			  // place code to be executed on completion of last outstanding ajax call here
			  	//console.log ('points total complete is ' + pointsTotal);
			  		$('#pointsTotalRow').remove();
					$('#pointsResult').append(
						'<tr id="pointsTotalRow">' + 
						'<td>' + '<strong>Total Points:</strong> ' + '</td>' +
						'<td>' + '<strong>'+pointsTotal+ '</strong>'+ '</td>' +
						'</tr>'
					);

			});
			

			

});	



//POINTS BUTTONS

$("button[name='Award Points']").click(function(){

	$("button[name='Award Points']").attr('class', 'btn btn-info active btn-block btn-lg');
	$("button[name='Edit Points']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='View Points']").attr('class', 'btn btn-default btn-block btn-lg');

	$('div[name=pointsEventDiv]').show();
	$('div[name=pointsAwardedDiv]').show();
	$('div[name=awardedByRnumberDiv]').show();
	$('#pointsBtn').html("Award");
	$specialSelect = 'awardPoints';

});

$("button[name='Edit Points']").click(function(){

	$("button[name='Award Points']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Edit Points']").attr('class', 'btn btn-info active btn-block btn-lg');
	$("button[name='View Points']").attr('class', 'btn btn-default btn-block btn-lg');
	alert('Edit Points is not yet functional.');

	$('#pointsBtn').html("Submit");
	$specialSelect = 'updatePoints';

});

$("button[name='View Points']").click(function(){

	$("button[name='Award Points']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='Edit Points']").attr('class', 'btn btn-default btn-block btn-lg');
	$("button[name='View Points']").attr('class', 'btn btn-info active btn-block btn-lg');

	$('div[name=pointsEventDiv]').hide();
	$('div[name=pointsAwardedDiv]').hide();
	$('div[name=awardedByRnumberDiv]').hide();

	$('#pointsBtn').html("View");
	$specialSelect = 'viewPoints';


});


// NAV TABS

$("li[name='homeTab']").click(function(){
	$("li[name='homeTab']").attr('class', 'active');
	$("li[name='pointsTab']").attr('class', 'empty');
	$("li[name='studentsTab']").attr('class', 'empty');
	$("li[name='eventsTab']").attr('class', 'empty');
	$("li[name='labsTab']").attr('class', 'empty');
	$('#pointsTab').hide();
	$('#studentsTab').hide();
	$('#eventsTab').hide();
	$('#labsTab').hide();
	$('#mainBody').hide();
	$('#homeTab').show();

	//console.log('homeTab clicked!');
});

$("li[name='pointsTab']").click(function(){
	$("li[name='pointsTab']").attr('class', 'active');
	$("li[name='homeTab']").attr('class', 'empty');
	$("li[name='studentsTab']").attr('class', 'empty');
	$("li[name='eventsTab']").attr('class', 'empty');
	$("li[name='labsTab']").attr('class', 'empty');
	$('#homeTab').hide();
	$('#studentsTab').hide();
	$('#eventsTab').hide();
	$('#labsTab').hide();
	$('#mainBody').show();
	$('#pointsTab').show();
	$specialSelect = 'awardPoints';
	//console.log('pointsTab clicked!');
});
	
$("li[name='studentsTab']").click(function(){
	$("li[name='homeTab']").attr('class', 'empty');
	$("li[name='pointsTab']").attr('class', 'empty');
	$("li[name='studentsTab']").attr('class', 'active');
	$("li[name='eventsTab']").attr('class', 'empty');
	$("li[name='labsTab']").attr('class', 'empty');
	$('#homeTab').hide();
	$('#pointsTab').hide();
	$('#eventsTab').hide();
	$('#labsTab').hide();
	$('#mainBody').show();
	$('#studentsTab').show();
	$specialSelect = 'viewStudents';
	//console.log('studentsTab clicked!');
});

$("li[name='eventsTab']").click(function(){
	$("li[name='homeTab']").attr('class', 'empty');
	$("li[name='pointsTab']").attr('class', 'empty');
	$("li[name='studentsTab']").attr('class', 'empty');
	$("li[name='eventsTab']").attr('class', 'active');
	$("li[name='labsTab']").attr('class', 'empty');
	$('#homeTab').hide();
	$('#pointsTab').hide();
	$('#studentsTab').hide();
	$('#labsTab').hide();
	$('#mainBody').show();
	$('#eventsTab').show();
	$specialSelect = 'viewEvents';
	//console.log('eventsTab clicked!');
});

$("li[name='labsTab']").click(function(){
	$("li[name='homeTab']").attr('class', 'empty');
	$("li[name='pointsTab']").attr('class', 'empty');
	$("li[name='studentsTab']").attr('class', 'empty');
	$("li[name='eventsTab']").attr('class', 'empty');
	$("li[name='labsTab']").attr('class', 'active');
	$('#homeTab').hide();
	$('#pointsTab').hide();
	$('#studentsTab').hide();
	$('#eventsTab').hide();
	$('#labsTab').show();
	$('#mainBody').show();
	$specialSelect = 'viewLabs';
	//console.log('labsTab clicked!');
});

$(document).ready(function(){

	showAllLabs();
	showAllEvents();

	});

function showAllLabs(){

	//console.log('show all labs called');

	var formData = {
		'specialSelect' : 'viewLabs',
		'searchType' : 'showAll'
	}

	//console.log(formData);	

	$.ajax(
		{
			url      : './points-includes/process.php',
			type     : 'POST',
			data     : formData,
			dataType :  'json'
		})
			.done(function(data) {
				
				//console.dir(data);

					//clearLabs();
					$.each(data.json, function(index, element){

							$('select[name="currentLab"]').append(
								'<option' + ' value=' + element.CRN+'>' + 'ECE ' + element.courseNumber + '-' + element.sectionNumber +'</option>'
							);
					});
				
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
			
			});

}

function showAllEvents(){

	//console.log('show all events executed');

	var formData = {
		'specialSelect' : 'viewEvents',
		'searchType' : 'showAll'
	}

	//console.log(formData);	

	$.ajax(
		{
			url      : './points-includes/process.php',
			type     : 'POST',
			data     : formData,
			dataType :  'json'
		})
			.done(function(data) {
				
				//console.dir(data);

					//clearEvents();
					$.each(data.json, function(index, element){

							$('select[id="pointsEvent"]').append(
								'<option' + ' value=' + element.eventID+'>' + element.eventName+ ' - ' + element.semester + ' '+ element.year + '</option>'
							);
					});
					var sortedEvents = $('#pointsEvent option');
					//console.dir(sortedEvents);
					sortedEvents.sort(function(a,b){
						a = a.text.toUpperCase().split(" - ");
						b = b.text.toUpperCase().split(" - ");
						//return a[0]-b[0];
						return a[0] < b[0] ? -1 : 1;
					});
					$('#pointsEvent').html(sortedEvents);
				
			}) //close done
			.fail(function(data){
				console.log('Failed!');
				console.dir(data);
			
			});

}

function clearEvents(){
	//console.log('clearevents refresh executed.')
	$('select[id="pointsEvent"]').empty();
}

function clearLabs(){
	//console.log('clearlabs refresh executed.')
	$('select[name="currentLab"]').empty();
}

function pointTotal(){
	//console.log('points total called');
	$('#pointsResult').append(
	'<tr>' + 
	'<td>' + '<b>'+ 'Total Points:' + '</b>' + '</td>' +
	'<td>' + '<b>'+ pointsTotal + '</b>'+ '</td>' +
	'</tr>');	
}
