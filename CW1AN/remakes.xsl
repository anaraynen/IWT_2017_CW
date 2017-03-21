<?xml version="1.0"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:strip-space elements="*"/>
<xsl:template match="remakes">
<xsl:apply-templates select="remakes"/>

<html>
	<!--The HTML table below will be created and used to display the search results from the query started by the user-->
	<div class="text-left">
		<table class="table table-condensed">
			<th>Title</th>
			<th>Year</th>
			<th>Original Title</th>
			<th>Original Year</th>
			<th>Fraction</th>
			<!--  From the query results, display each result as a new row within the table using the values from the xml file -->
			<xsl:for-each select="remake">
			<xsl:sort select="rtitle" order="ascending"/>
			<tr>
				<td>
					<xsl:value-of select="rtitle"/>
				</td>
				<td>
					<xsl:value-of select="ryear"/>
				</td>
				<td>
					<xsl:value-of select="stitle"/>
				</td>
				<td>
					<xsl:value-of select="syear"/>
				</td>
				<td>
					<xsl:value-of select="fraction"/>
				</td>
			</tr>
			</xsl:for-each>
		</table>
	</div>
</html>

</xsl:template>
</xsl:stylesheet>