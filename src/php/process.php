<?php
require_once('./connect.php'); //may need to change this depending on your file structures

//echo 'process.php started';

$errors      = array(); //server-side only array to hold validation errors
$data        = array(); //array to hold success and errors
$flux        = array(); //array with create/edit/delete message
$json        = array(); //array to hold json data
$passback    = array(); //array of arrays to pass back

//$Passback contains:
//1. data - array to hold success and errors
//2. flux - array with create/edit/delete messages
//3. json - query results

$specialSelect = $_POST['specialSelect'];


//echo '_POST is ' . print_r($_POST) . '<br>';
//echo 'specialSelect is ' . $specialSelect . '<br>';
//echo 'first name is ' . $firstName . '<br>';
//echo 'rNumber is ' . $rNumber . '<br>';

//addstudent

if ($specialSelect == 'addStudent'){

	//echo 'Made it inside addStudent' . '<br>';

	$firstName  = $_POST['firstName'];
	$lastName   = $_POST['lastName'];
	$rNumber    = $_POST['rNumber'];
	$currentLab = $_POST['currentLab'];
	//$email      = $_POST['email'];

	// validate the variables ======================================================
		// if any of these variables don't exist, add an error to our $errors array

	if (empty ($_POST['firstName']))
		$errors['firstName'] = 'First name is required.';
		
	if (empty ($_POST['lastName']))
		$errors['lastName'] = 'Last name is required.';
		
	if (empty ($_POST['rNumber']))
		$errors['rNumber'] = 'R Number is required.';
		
	if (empty ($_POST['currentLab']))
		$errors['currentLab'] = 'Current lab is required.';
		
	/*if (empty ($_POST['email']))
		$errors['email'] = 'Email is required.';*/
		
	// return a response ===========================================================

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';

		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		
		$sql = "INSERT INTO Students (rNumber, firstName, lastName, currentLab) 
		VALUES ('$rNumber', '$firstName', '$lastName', '$currentLab')";

		//$dupcheck = $dbhandle->query("SELECT * FROM Students WHERE rNumber = '{$rNumber}' OR email = '{$email}'");
		$dupcheck = $dbhandle->query("SELECT * FROM Students WHERE rNumber = '{$rNumber}'");
		$num_rows = mysqli_num_rows($dupcheck);

		if ($num_rows > 0){
			$data['success'] = false;
			$flux['create'] = 'failed';
			$errors['insertError'] = 'Unable to create student. Check for duplicate R-number.';
			$data['errors'] = $errors;

		}
		else if($dbhandle->query($sql) == TRUE) {

			$data['success'] = true;
			$data['message'] = 'Create student success!';
			$flux['create'] = 'ok';

		}
		$dbhandle->close();

		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable

		$flux['edit'] = 'none';
		$flux['delete'] = 'none';
		$passback['data'] = $data;
		$passback['flux'] = $flux;
	
	}

}

//echo 'skipped 1st if statement' . '<br>';

else if ($specialSelect == 'deleteStudent'){

}

else if ($specialSelect == 'updateStudent'){

}	

else if ($specialSelect == 'addLab'){
		//echo 'Made it inside viewStudent';

	$CRN            = $_POST['CRN'];
	$courseNumber   = $_POST['courseNumber'];
	$sectionNumber  = $_POST['sectionNumber'];
	$professor      = $_POST['professor'];
	$semester       = $_POST['semester'];
	$year           = $_POST['year'];
	date_default_timezone_set('America/Chicago');
	$dateCreated    = date('Y-m-d H:i:s');
	

	// validate the variables ======================================================
		// if any of these variables don't exist, add an error to our $errors array

	if (empty ($_POST['CRN']))
		$errors['CRN'] = 'CRN is required.';
		
	if (empty ($_POST['courseNumber']))
		$errors['courseNumber'] = 'Course number is required.';
		
	if (empty ($_POST['sectionNumber']))
		$errors['sectionNumber'] = 'Section number is required.';
		
	if (empty ($_POST['year']))
		$errors['year'] = 'Year is required.';

	if (!ctype_digit ($_POST['CRN']))
		$errors['CRN'] = 'CRN is invalid.';

	if (!ctype_digit ($_POST['courseNumber']))
		$errors['courseNumber'] = 'Course number is invalid.';

	if (!ctype_digit ($_POST['sectionNumber']))
		$errors['sectionNumber'] = 'Section number is invalid.';

	if (!ctype_digit ($_POST['year']))
		$errors['year'] = 'Year is invalid.';

	if (strlen ($_POST['year']) != 4)
		$errors['year'] = 'Year must be in format YYYY (i.e. 2020).';

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;

		$dbhandle->close();
	} else {
	
		$sql = "INSERT INTO Labs (CRN, courseNumber, sectionNumber, professor, semester, year, dateCreated) 
		VALUES ('$CRN', '$courseNumber', '$sectionNumber', '$professor', '$semester', '$year', '$dateCreated')";
		
		if($dbhandle->query($sql) == TRUE) {
			$data['success'] = true;
			$data['message'] = 'Add lab success!';
			$flux['create'] = 'ok';
		} else {
			$data['success'] = false;
			$flux['create'] = 'failed';
			$errors['insertError'] = 'Unable to create lab. Possible duplicate entry.';
			$data['errors'] = $errors;
			//$flux = 'Error adding ' $firstName . ' ' .$lastName . '.';
			//echo 'Error: ' .$sql . '<br>' . $dbhandle->error;
		}
		$dbhandle->close();
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable

		$flux['edit'] = 'none';
		$flux['delete'] = 'none';
		$passback['data'] = $data;
		$passback['flux'] = $flux;
	
	}

}	
else if ($specialSelect == 'deleteLab'){

}	
else if ($specialSelect == 'addEvent'){


	$eventName      = $_POST['eventName'];
	$semester       = $_POST['semester'];
	$year           = $_POST['year'];
	//$maxPoints    = $_POST['maxPoints'];
	date_default_timezone_set('America/Chicago');
	$dateCreated    = date('Y-m-d H:i:s');
	

	// validate the variables ======================================================
		// if any of these variables don't exist, add an error to our $errors array

	if (empty ($_POST['eventName']))
		$errors['eventName'] = 'Event name is required.';
		
	if (empty ($_POST['year']))
		$errors['year'] = 'Year is required.';
		
	if (!ctype_digit ($_POST['year']))
		$errors['year'] = 'Year is invalid.';

	if (strlen ($_POST['year']) != 4)
		$errors['year'] = 'Year must be in format YYYY (i.e. 2020).';
		

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		$sql = "INSERT INTO Events (eventName, year, semester, dateCreated) 
		VALUES ('$eventName', '$year', '$semester', '$dateCreated')";
		
		$dupcheck = $dbhandle->query("SELECT * FROM Events WHERE eventName = '{$eventName}' AND year = '{$year}' AND semester = '{$semester}'");
		$num_rows = mysqli_num_rows($dupcheck);

		if ($num_rows > 0){
			$data['success'] = false;
			$flux['create'] = 'failed';
			$errors['insertError'] = 'Unable to create event. Event with same name already exists.';
			$data['errors'] = $errors;

		}
		else if($dbhandle->query($sql) == TRUE) {

			$data['success'] = true;
			$data['message'] = 'Create event success!';
			$flux['create'] = 'ok';

		}
		$dbhandle->close();
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable

		$flux['edit'] = 'none';
		$flux['delete'] = 'none';
		$passback['data'] = $data;
		$passback['flux'] = $flux;
	
	}


}	
else if ($specialSelect == 'deleteEvent'){

}	
else if ($specialSelect == 'updateEvent'){

}	
else if ($specialSelect == 'viewStudents'){

	//echo 'Made it inside viewStudent';

	$searchType = $_POST['searchType'];
	$firstNameEmpty = FALSE;
	$lastNameEmpty = FALSE;

	// validate the variables ======================================================
		// if any of these variables don't exist, add an error to our $errors array

	if ($searchType == 'byName'){

		$firstName  = $_POST['firstName'];
		$lastName   = $_POST['lastName'];

		if (empty ($_POST['firstName'])){
			$firstNameEmpty = TRUE;
		}

		if (empty ($_POST['lastName'])){
			$lastNameEmpty = TRUE;
		}
		if ($firstNameEmpty AND $lastNameEmpty){	
			$errors['emptyName'] = 'At least one: first name or last name, is required.';
		}

	}

	else if ($searchType == 'byRnumber'){

		$rNumber    = $_POST['rNumber'];
		if (empty ($_POST['rNumber']))
			$errors['rNumber'] = 'R Number is required.';

		if (!ctype_digit ($_POST['rNumber']))
			$errors['rNumber'] = 'R number is invalid.';

	}
	else if ($searchType == 'byEmail'){

		$email      = $_POST['email'];
		if (empty ($_POST['email']))
			$errors['email'] = 'Email is required.';
	}
	else if ($searchType == 'byLab'){

		$currentLab      = $_POST['currentLab'];
	}
		

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		//echo 'Made it to else';

		if ($searchType == 'byName'){
		
			if ($firstNameEmpty){
				$sql = "SELECT * FROM Students WHERE lastName LIKE '%{$lastName}%' ORDER BY lastName ASC";
			}
			else if ($lastNameEmpty){
				$sql = "SELECT * FROM Students WHERE  firstName LIKE '%{$firstName}%' ORDER BY lastName ASC";
			}
			//backup to prevent breaking. should replace with error here later
			else {$sql = "SELECT * FROM Students WHERE  firstName LIKE '%{$firstName}%' OR lastName LIKE '%{$lastName}%' ORDER BY lastName ASC";}
		
		}
		else if ($searchType == 'byRnumber'){
		
			//$sql = "SELECT * FROM `Students` WHERE  rNumber = '$rNumber'";
			$sql = "SELECT * FROM Students WHERE rNumber = '{$rNumber}' ORDER BY lastName ASC";
		
		}
		else if ($searchType == 'byEmail'){
		
			$sql = "SELECT * FROM Students WHERE  email LIKE '%{$email}%' ORDER BY lastName ASC";
		
		}
		else if ($searchType == 'byLab'){
		
			$sql = "SELECT * FROM Students WHERE  currentLab LIKE '%{$currentLab}%' ORDER BY lastName ASC";
		
		}

		$result = $dbhandle->query($sql);
	
		if($dbhandle->query($sql) == TRUE) {
			
			$data['success'] = true;
			$data['message'] = 'View student success!';
		} else {
			$data['success'] = false;
			$errors['insertError'] = 'Unable to search.';
			$data['errors'] = $errors;
		}

		//used for displaying results
		if(! empty($result)) {
			if($result->num_rows >0){ //not sure if this is redundent, check later
				$i = 1;
				while($row = $result->fetch_assoc()){
					//var_dump($row);
					$rowResult = array('rNumber'=>$row['rNumber'], 'firstName'=>$row['firstName'], 'lastName'=>$row['lastName'], 'currentLab'=>$row['currentLab'], 'email'=>$row['email']);
					$rowResult = array('rNumber'=>$row['rNumber'], 'firstName'=>$row['firstName'], 'lastName'=>$row['lastName'], 'currentLab'=>$row['currentLab']);
					//array_push($json, $rowResult);
					$json['row'.$i] = $rowResult;
					$i = $i + 1;
				}
			}
		} else {
			$data['success'] = false;
			$errors['insertError'] = 'Unable to display search results.';
			$data['errors'] = $errors;
			
		}
		$dbhandle->close();

		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';

		$passback['data'] = $data;
		$passback['flux'] = $flux;
		$passback['json'] =  $json;
	
	}


}
else if ($specialSelect == 'viewLabs'){

	$searchType     = $_POST['searchType'];


	if ($searchType != 'showAll'){
		$CRN            = $_POST['CRN'];
		$courseNumber   = $_POST['courseNumber'];
		$sectionNumber  = $_POST['sectionNumber'];
		$semester       = $_POST['semester'];
	}

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		//echo 'Made it to else';

		if ($searchType == 'byCRN'){
		
			$sql = "SELECT * FROM Labs WHERE  CRN = '{$CRN}'";
			//$sql = "SELECT * FROM Students WHERE firstname = {$firstName}";
		
		}
		else if ($searchType == 'byNumber'){
		
			//$sql = "SELECT * FROM `Students` WHERE  rNumber = '$rNumber'";
			$sql = "SELECT * FROM Labs WHERE courseNumber = '{$courseNumber}'";
		
		}
		else if ($searchType == 'bySemester'){
		
			$sql = "SELECT * FROM Labs WHERE  semester LIKE '{$semester}'";
		
		}

		else if ($searchType == 'showAll'){

			$sql = "SELECT * FROM Labs";
		}

		$result = $dbhandle->query($sql);

		if($result->num_rows >0){
			$i = 1;
			while($row = $result->fetch_assoc()){
				//var_dump($row);
				$rowResult = array('CRN'=>$row['CRN'], 'courseNumber'=>$row['courseNumber'], 'sectionNumber'=>$row['sectionNumber'], 'professor'=>$row['professor'], 'semester'=>$row['semester'], 'year'=>$row['year'], 'dateCreated'=>$row['dateCreated']);
				//array_push($json, $rowResult);
				$json['row'.$i] = $rowResult;
				$i = $i + 1;
			}
		}

		$dbhandle->close();


        

		/*
		if($dbhandle->query($sql) == TRUE) {
			
			echo 'search successful';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error;
		}
		$dbhandle->close();
		*/
		/*
		if(! empty($sql)) {
			echo 'Results are:' .$sql . '<br>';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error .'<br>';
		}
		$dbhandle->close();

		*/
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable
		$data['success'] = true;
		$data['message'] = 'View labs success!';
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';

		$passback['data'] = $data;
		$passback['flux'] = $flux;
		$passback['json'] =  $json;
	}

}
else if ($specialSelect == 'viewEvents'){

	$searchType     = $_POST['searchType'];

	if ($searchType == 'byID'){

		$eventID    = $_POST['eventID'];
	}

	else if($searchType != 'showAll'){
		$eventName      = $_POST['eventName'];
		$semester       = $_POST['semester'];
		$year           = $_POST['year'];
	}

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		//echo 'Made it to else';

		if ($searchType == 'byName'){
		
			/*if (empty($eventName)){
				$sql = null;
			}
			else {*/
				$sql = "SELECT * FROM Events WHERE  eventName LIKE '%{$eventName}%'";
			//}
		
		}
		else if ($searchType == 'bySemester'){
		
			//$sql = "SELECT * FROM `Students` WHERE  rNumber = '$rNumber'";
			$sql = "SELECT * FROM Events WHERE semester = '{$semester}' AND year = '{$year}'";
		
		}

		else if ($searchType == 'byID'){
		
			//$sql = "SELECT * FROM `Students` WHERE  rNumber = '$rNumber'";
			$sql = "SELECT * FROM Events WHERE eventID = '{$eventID}'";
		
		}

		else if ($searchType == 'showAll'){

			$sql = "SELECT * FROM Events";
		}

		$result = $dbhandle->query($sql);

		if($result->num_rows >0){
			$i = 1;
			while($row = $result->fetch_assoc()){
				//var_dump($row);
				$rowResult = array('eventID'=>$row['eventID'], 'eventName'=>$row['eventName'], 'year'=>$row['year'], 'semester'=>$row['semester'], 'dateCreated'=>$row['dateCreated']);
				//array_push($json, $rowResult);
				$json['row'.$i] = $rowResult;
				$i = $i + 1;
			}
		}

		$dbhandle->close();


        

		/*
		if($dbhandle->query($sql) == TRUE) {
			
			echo 'search successful';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error;
		}
		$dbhandle->close();
		*/
		/*
		if(! empty($sql)) {
			echo 'Results are:' .$sql . '<br>';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error .'<br>';
		}
		$dbhandle->close();

		*/
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable
		$data['success'] = true;
		$data['message'] = 'View events success!';
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';

		$passback['data'] = $data;
		$passback['flux'] = $flux;
		$passback['json'] =  $json;
	}

}
else if ($specialSelect == 'awardPoints'){

	$rNumber          = $_POST['rNumber'];
	$eventID          = $_POST['eventID'];
	$pointsAwarded    = $_POST['pointsAwarded'];
	$awardedByRnumber = $_POST['awardedByRnumber'];
	//$maxPoints    = $_POST['maxPoints'];
	date_default_timezone_set('America/Chicago');
	$dateCreated      = date('Y-m-d H:i:s');
	

	// validate the variables ======================================================
		// if any of these variables don't exist, add an error to our $errors array

	if (empty ($_POST['rNumber']))
		$errors['rNumber'] = 'R number is required.';

	if (!ctype_digit ($_POST['rNumber']))
		$errors['rNumber'] = 'R number is invalid.';
		
	if (empty ($_POST['pointsAwarded']))
		$errors['pointsAwarded'] = 'Must enter points to award.';

	if (!ctype_digit ($_POST['pointsAwarded']))
		$errors['pointsAwarded'] = 'Amount of points must be an integer.';	

	$checkStudent = $dbhandle->query("SELECT * FROM Students WHERE rNumber = '{$rNumber}'");
	$num_rows_check = mysqli_num_rows($checkStudent);

	if ($num_rows_check == 0){
		$errors['checkStudent'] = 'R-number not found.'; 
	}
		
	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		$sql = "INSERT INTO Points (eventID, rNumber, dateCreated, pointsAwarded, awardedByRnumber) 
		VALUES ('$eventID', '$rNumber', '$dateCreated', '$pointsAwarded', '$awardedByRnumber')";

		$dupcheck = $dbhandle->query("SELECT * FROM Points WHERE rNumber = '{$rNumber}' AND eventID = '{$eventID}'");
		$num_rows = mysqli_num_rows($dupcheck);

		if ($num_rows > 0){
			$data['success'] = false;
			$flux['create'] = 'failed';
			$errors['insertError'] = 'Unable to award points. Check for duplicate entry.';
			$data['errors'] = $errors;

		}
		else if($dbhandle->query($sql) == TRUE) {

			$data['success'] = true;
			$data['message'] = 'Award points success!';
			$flux['create'] = 'ok';

		}
		$dbhandle->close();
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable

		$flux['edit'] = 'none';
		$flux['delete'] = 'none';
		$passback['data'] = $data;
		$passback['flux'] = $flux;
	
	}

}
else if ($specialSelect == 'updatePoints'){

}
else if ($specialSelect == 'viewPoints'){


	$rNumber      = $_POST['rNumber'];

	if (! empty($errors)){
		
		$data['success'] = false;
		$data['errors'] = $errors;
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';


		$passback['data'] = $data;
		$passback['flux'] = $flux;
		
		$dbhandle->close();
	} else {
	
		//echo 'Made it to else';

		if ($specialSelect == 'viewPoints'){ //redundant for now
		
			$sql = "SELECT * FROM Points WHERE  rNumber = '{$rNumber}'";
			//$sql = "SELECT * FROM Students WHERE firstname = {$firstName}";
		
		}

		$result = $dbhandle->query($sql);

		if($result->num_rows >0){
			$i = 1;
			while($row = $result->fetch_assoc()){
				//var_dump($row);
				$rowResult = array('eventID'=>$row['eventID'], 'rNumber'=>$row['rNumber'], 'dateCreated'=>$row['dateCreated'], 'pointsAwarded'=>$row['pointsAwarded'], 'awardedByRnumber'=>$row['awardedByRnumber']);
				//array_push($json, $rowResult);
				$json['row'.$i] = $rowResult;
				$i = $i + 1;
			}
		}

		$dbhandle->close();


        

		/*
		if($dbhandle->query($sql) == TRUE) {
			
			echo 'search successful';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error;
		}
		$dbhandle->close();
		*/
		/*
		if(! empty($sql)) {
			echo 'Results are:' .$sql . '<br>';
		} else {
			echo 'Error: ' .$sql . '<br>' . $dbhandle->error .'<br>';
		}
		$dbhandle->close();

		*/
		
		// if there are no errors process our form, then return a message

		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)

		// show a message of success and provide a true success variable
		$data['success'] = true;
		$data['message'] = 'View points success!';
		$flux['create'] = 'none';
		$flux['edit'] = 'none';
		$flux['delete'] = 'none';

		$passback['data'] = $data;
		$passback['flux'] = $flux;
		$passback['json'] =  $json;
	}

}
//Passback all data	
echo json_encode($passback);


