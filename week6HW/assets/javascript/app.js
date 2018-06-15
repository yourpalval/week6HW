$( document ).ready(function() {
  
    var movies = ["Porco Rosso", "The Joy Luck Club", "The Royal Tenenbaums", "Soul Food", "Shrek", "Twilight", "My Girl", "Speed"];
 

    function showGifs(){
        $("#gifButtonsDiv").empty(); // Erases all buttons in DIV so no duplicates are shown.
        for (var i = 0; i < movies.length; i++){ 
            var gifButton = $("<button>"); // will loop through array and create a button for each string and store value in the var gif button.
            gifButton.addClass("movie"); //adding class "movie" to all buttons
            gifButton.addClass("btn btn-danger") //adding bootstrap class for styling and functionality purposes.
            gifButton.attr("data-name", movies[i]); //creating attribute to button called data-name that will store the value of the string for selecting purposes.
            gifButton.text(movies[i]); //taking the movie from the array and giving the button text from the name
            $("#gifButtonsDiv").append(gifButton); //after looping through all strings in the array and creating button with classes and attributes we will now append each button to the buttons Div.
        }
    }
     // function for user to add new movie button.
    function addNewButton(){
        $("#addGif").on("click", function(){
        var movie = $("#movie-input").val().trim(); //var movie takes value of what the user inputs.
        if (movie == ""){
          return false; // if state for making sure user can't add a blank button.
        }
        movies.push(movie); //puts user input into movies array.
    
        showGifs();
        return false;
        });
    }
    
    // the function below is to be run when the "remove last movie" button is clicked.

    function deleteButton(){
        $("removeGif").on("click", function(){
        movies.pop(movie);
        showGifs();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=8";
       
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv col-sm-12 col-lg-3 img-thumbnail");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                var clickToPlay = $("<p>").text("Click Image To Play");
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                gifDiv.append(clickToPlay);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
  
    showGifs(); // displays list of movies already created
    addNewButton();
    deleteButton();
   

    $(document).on("click", ".movie", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });