<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:strip-space elements="*"/>
<xsl:template match="remakes">
<xsl:apply-templates select="remakes"/>

<html>
<!--  Create table of remakes with titles  -->
	<table border="1">
		<th>TITLE</th>
		<th>YEAR</th>
		<th>ORIGINAL TITLE</th>
		<th>ORIGINAL YEAR</th>
		<th>FRACTION</th>
		
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
</html>

</xsl:template>
</xsl:stylesheet>