

  // Initialize Firebase
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
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var FirstTrain = moment($("#first-train-input").val().trim(), "HHmm-military").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: firstTrain,
      frequency: trainFrequency
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
    $("#firsrtrain-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainname;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);
  
    // Prettify the first train
    var empStartPretty = moment.unix(firstTrain).format("MM/DD/YYYY");
  
    // Calculate the next arrival train 
    // To calculate the arrival train
    
    var empMonths = moment().diff(moment(firstTrain, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total minutes away
    var trainMinutesAway = trainMinutes * trainFrequency;
    console.log(MinutesAway);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(firstTrain),
      $("<td>").text(trainArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });


















