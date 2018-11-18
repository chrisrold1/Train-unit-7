//Initialize firebase
var config = {
    apiKey: "AIzaSyAN0QViyG7gOX_LGiztAw5k8UQd_z7p-YY",
    authDomain: "train-schedule-hw-7.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-7.firebaseio.com",
    projectId: "train-schedule-hw-7",
    storageBucket: "train-schedule-hw-7.appspot.com",
    messagingSenderId: "295330514687"
  };
  firebase.initializeApp(config);

 //variables for database
  var database = firebase.database();

  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empTrainName = $("#train-name-input").val().trim();
    var empDestination = $("#destination-input").val().trim();
    var empFirstTrain= moment($("#firsttrain-input").val().trim(), "MM/DD/YYYY").format("X");
    var empFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: empTrainName,
      destination: empDestination,
      start: empFirstTrain,
      rate: empFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#minutes-away-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().Trainname;
    var empDestination = childSnapshot.val().Destination;
    var empFirstTrain = childSnapshot.val().FirstTrain;
    var empFrequency = childSnapshot.val().Frequency;
  
    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);
  
    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empName),
      $("<td>").text(empRole),
      $("<td>").text(empStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });


















