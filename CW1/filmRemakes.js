// JavaScript Document
// 
// Contains functions used by HTML Form remakes.html

// This function was taken from code provided by Peter Wood during the lectures
function getXML(url) 
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send(null);
	return xhr.responseXML;
}

// Create a query string from the user input passed to it
// This is then used to modify the transforms of an XSL stylesheet 
function createQuery(objTitle, rtitle, objYear, ryear, objFrac, frac)
{	
	// Create variable to store search query to send to stylesheet
	// Initialise it with the default value of "remake"
	var searchQuery = "remake ";	
	
  // If NONE of the input fields contain valid values assume the user provided no input
	// and return ALL films by default
	if (!rtitle && !ryear && !frac && objTitle != "original")
	{
		window.alert("[USER INFO] Retrieving ALL films by default");
	}
	else
	{	
		// Check each of the user input field in turn to see if anything was entered
		// If any are NOT empty append the entered values to the query string
		
		if (rtitle || objTitle === "original") // 'title' field has a value so create query with the operator value
		{		
			// Explicitly check for each operator value as more may be added a later date
			if (objTitle === "equals") 
				searchQuery += ("[rtitle='" + rtitle + "']");
			else 
			if (objTitle === "contains") 
				searchQuery += ("[contains(rtitle,'" + rtitle + "')]")
			else 
			if (objTitle === "original") 
				searchQuery += ("[rtitle = stitle]");				
		}	
	
		if (ryear) // 'ryear' field has a value so create query with the operator value
			searchQuery += ("[ryear" + objYear + ryear + "]");
	
		if (frac) // 'fraction' field has a value so create query with the operator value
			searchQuery += ("[fraction" + objFrac + frac + "]");
	}
	
	return searchQuery;
}

// Retrieves a list of remakes of films from a XML file (remakes.xml) 
// corresponding to a filter supplied by the user via a HTML Form
// Applies a 'client side' XLST transform using a stylesheet (remakes.xsl) 
// before displaying the films in a table
// The XLST stylesheet is modified programatically to apply the filter supplied by the user.
function funcGetResults(objTitle, rtitle, objYear, ryear, objFrac, frac, objSortBy) 
{
	// Read the contents of the XML file into a DOM document
	var xmlDoc = getXML("remakes.xml");

  // Read the contents of the XSL file into a DOM stylesheet
	var xslDoc = getXML("remakes.xsl");

  // Create the query to send to the XSL stylesheet from the user input
	var query = createQuery(objTitle, rtitle, objYear, ryear, objFrac, frac);
	
	window.alert("[DEBUG] Search Query: " + query);
	window.alert("[DEBUG] Sort Order: " + objSortBy);
	
	// Now programmatically modify the XSL transformation with any input provided by the user before applying it
	
	// Replace the "select" criteria with the search query from the user
	$(xslDoc).find("xsl\\:for-each, for-each").first().attr("select", query);
	
	// Replace the "sort by" field with that supplied by the user (if any)
	$(xslDoc).find("xsl\\:sort, sort").first().attr("select", objSortBy);

  // Transform XML Doc using the XSLT Processor provided by the web browesr 
	// then apply the supplied XSLT Stylesheet
	if (typeof (XSLTProcessor) != "undefined") 
	{
		// Create XSLT processor to reuse the same XSLT stylesheet for multiple transforms.
		var proc = new XSLTProcessor();
		
		// Imports the given XSLT stylesheet DOM and compiles it to a reusable transform
		proc.importStylesheet(xslDoc);
		
		// Transform the given XML DOM and return the transformation result as a new DOM document
		var xsltDoc = proc.transformToFragment(xmlDoc, document);
			
		var resultsArea = document.getElementById("tblResults");
		
		// Clear the results area so it is ready to receive the new query results
		resultsArea.innerHTML = "";
		
		// Append the processed document fragment to the results area	
		resultsArea.appendChild(xsltDoc);
	}
	else 
		window.alert("[USER INFO] Your browser does not support the XSLTProcessor object");   
}