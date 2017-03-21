/*
	Plagiarism Declaration Confirmation-->
	I confirm that this coursework submission is entirely my own work, 
	except where explicitly stated otherwise.
	Ameer Naraynen 2017
*/

//This JavaScript Document contains the neessary functions used to run the query on the remakes xml and gather results fro the xsl stylesheet

var queryToShow = "";

//Function used within lecture:
function getXML(url) 
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send(null);
	return xhr.responseXML;
}


// Function called when Get Results button selected by user
// Retrieves a list of remakes of films from the remakes.xml
// XLST transform using a stylesheet (remakes.xsl) 
// Results from query then will be displayed within a HTML table
// The XLST stylesheet applies the filters which was sent by the user's request
function funcGetResults(objTitle, rtitle, objYear, ryear, objFrac, frac, objSortBy) 
{
	//Contents of the XML file read into a DOM document
	var xmlDoc = getXML("remakes.xml");

    //Contents of the XSL file are read into a DOM stylesheet
	var xslDoc = getXML("remakes.xsl");

    //Query created to send to the XSL stylesheet
	var query = createQuery(objTitle, rtitle, objYear, ryear, objFrac, frac);
	
	if (query != "remake") 
	{
		window.alert("Your query is as follows: " + queryToShow + "\nThe Sort Order chosen is: " + objSortBy);
		queryToShow = "";
	}
	
	//Now programmatically modify the XSL transformation with any input provided by the user before applying it
	//Replaces the "select" criteria with the search query from the user
	$(xslDoc).find("xsl\\:for-each, for-each").first().attr("select", query);
	
	//Replaces the "Sort By" field with that entered by the user if chosen too
	$(xslDoc).find("xsl\\:sort, sort").first().attr("select", objSortBy);

    //Now transform XML Doc using the XSLT Processor provided by the web browesr 
	//Then apply the supplied XSLT Stylesheet
	if (typeof (XSLTProcessor) != "undefined") 
	{
		//Creates an XSLT processor - reuse the same XSLT stylesheet for multiple transforms:
		var proc = new XSLTProcessor();
		
		//Imports the given XSLT stylesheet DOM - compiles it to a reusable transform:
		proc.importStylesheet(xslDoc);
		
		//Transform the result from the XML DOM as a new DOM document 
		var xsltDoc = proc.transformToFragment(xmlDoc, document);
			
		//Find the decalred div tag from the HTML page ready and ready for the results to be applied to our HTML table
		var resultsArea = document.getElementById("tblResults");
		resultsArea.innerHTML = "";
		//Apply the processed results doc to our results area	
		resultsArea.appendChild(xsltDoc);
	}
	else { 
		//Show user an error message
		window.alert("Error! Your browser may not support XSLTProcessor. Please check and try again.");   
	}
}

//The below query will take in the parameters from the user search query and then will be used to modify the transforms of the remakes.xsl
function createQuery(objTitle, rtitle, objYear, ryear, objFrac, frac)
{	
	//Create variable to store search query to send to stylesheet
	//Initialise it with the default value of "remake"
	var query = "remake";	

    //Check input fields contain valid values and if the user has provided no input then we can return all remakes by default
	if (!rtitle && !ryear && !frac && objTitle != "original")
	{
		window.alert("No search criteria found. All Remakes will now be displayed.");
	}
	else
	{	
		// Check each of the input fields and create a new query string y appending to it relevant search criteria
		if (rtitle || objTitle === "original") // 'title' field has a value so create query with the operator value
		{		
			if (objTitle === "equals") {
				query += ("[rtitle = '" + rtitle.trim() + "']");
				queryToShow += ("\nTitle Equals: " + rtitle.trim() + "\n");
			} 
			else if (objTitle === "contains") {
				query += ("[contains(rtitle,'" + rtitle + "')]");
				queryToShow += ("Title Contains: " + rtitle + "\n");
			} 
			else if (objTitle === "original") { 
				query += ("[rtitle = stitle]");
				queryToShow += ("Original Titles" + "\n");			
			}
		}	
	
		if (ryear) { // 'ryear' field has a value so create query with the operator value passed in
			query += ("[ryear" + objYear + ryear + "]");
			queryToShow += ("Title Year: " + objYear + " " + ryear + "\n");
		}
		if (frac) { // 'fraction' field has a value so create query with the operator value passed in
			query += ("[fraction" + objFrac + frac + "]");
			queryToShow += ("Title Fraction: " + objFrac + " " + frac + "\n");
		}	
	}
	// return completed query
	return query;
	return queryToShow;
}