// main function of the script, calls other functions in the script.
function initialize(){
    cities();
	addEvents();
};

// cities function creates HTML code table 
function cities(){

// cityPop object creates an array for the HTML table to use
var cityPop = [
	{ 
		// add attributes with properties (city name, city population)
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

    //create a table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add city column to header row
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    //add population column to header row
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    //add the header row
    table.appendChild(headerRow);

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city;
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population;
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    //add the table to the div in index.html
    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);

// calls the addColumns function and passes the cityPop object as an arugment to the section below
addColumns(cityPop)};

// calls addColumns function
function addColumns(cityPop){
    
	// identifies object table to function instead of using document for clarity
	// look for object "table"
	var table = document.querySelector("table");

    // uses a forEach loop to retreive table rows
	// look for object "tr" (table rows)
	table.querySelectorAll("tr").forEach(function(row, i){

    	// i == 0 specifies the header row (th)
		if (i == 0){

    		// inserts HTML code - before the end (after "Population") of the table header, add "City Size" to the header
			row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    	
		// otherwise, create object citySize to categorize population of the cities into S, M, L
		} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};

			// inserts HTML code - before the end of the table data, add determined size cat. of population to the data
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');

    	};
    });
};

// declares the addEvents function (called in the initialize function)
function addEvents(){

	// look for object "table" in the document, adds an event trap when mouse goes over the object
	// call function colorMe
	document.querySelector("table").addEventListener("mouseover", colorMe)
	
	// introduce function colorMe
	function colorMe(){
		
		// create object color, define it with a string "rgb(" to create the first part of an RGB value
		var color = "rgb(";

		// use a for loop to set 3 values - go to 3, increment by 1 (0, 1, 2)
		for (var i=0; i<3; i++){

			// define the rgb values with a random number 0-1 that is multiplied by 255.
			// round it to the nearest integer so you don't break the RGB structure (no decimals)
			var random = Math.round(Math.random() * 255);

			// builds a string one at a time - adds the random value to the next open position in object color
			color += random;

			// if the value (0, 1, 2) is less than 2 (final), add a comma then return to the start of the for loop
			if (i<2){
				color += ",";
			
			// if the value is more than 2, end the string by adding a ")" to get it to close
			} else {
				color += ")";}
		};

		// look for object "table" in the document, then style the object using CSS color property
		// set it equal to the random RGB "color" object
		document.querySelector("table").style.color = color;
	};

	// introduce function clickme
	function clickme(){

		// send alert through browser with dialouge
		alert('Hey, you clicked me!');
	};

	// look for object "table" in document
	// add event trap "click" so when object "table" is clicked, function clickme is called, pop up shows up
	document.querySelector("table").addEventListener("click", clickme)
};

//calls the initialize function on script load
window.onload = initialize();