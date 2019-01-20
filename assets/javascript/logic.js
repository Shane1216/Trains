// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1Vhw-4N0c7UrzBxPKRfcKwuy8AYGgUxY",
    authDomain: "shaneproject123.firebaseapp.com",
    databaseURL: "https://shaneproject123.firebaseio.com",
    projectId: "shaneproject123",
    storageBucket: "shaneproject123.appspot.com",
    messagingSenderId: "889581734953"
  };
  
  firebase.initializeApp(config);
  
  let database = firebase.database();
  
  // Button for adding Train to Schedule 
  $("#add-train").on("click", function(train) {
    train.preventDefault();
  
       trainName = $("#train-name-input").val().trim(),
       destination = $("#destination-input").val().trim(),
       startTrain = moment($("#start-train-input").val().trim(), "HH:mm").format("HH:mm");
       frequency = $("#frequency-rate-input").val().trim(),
        
        // Train Object for adding to DB easier
        newTrain = {
          name: trainName,
          destination: destination, 
          firstTrain: startTrain,
          frequency: frequency
        };
  
    // Push New Train Information to the Database
    database.ref().push(newTrain);
  
    // Clear Forms Input Values 
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-train-input").val("");
    $("#frequency-rate-input").val("");
  
  });
  
  
  // After New Train is added display its info on the page
  database.ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());
  
    var trainName = childSnapShot.val().name,
        destination = childSnapShot.val().destination,
        startTrain = childSnapShot.val().firstTrain,
        frequency = childSnapShot.val().frequency;
  
    var convertedTime = moment(startTrain, "HH:mm").subtract(1, "years"),
        diffTime = moment().diff(moment(convertedTime), "minutes"),
        timeRemain = diffTime % frequency,
        minAway = frequency - timeRemain,
        nextTrain = moment().add(minAway, "minutes").format("HH:mm");             
        
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minAway)
    );
  
    $("#train-table > tbody").append(newRow);
  });