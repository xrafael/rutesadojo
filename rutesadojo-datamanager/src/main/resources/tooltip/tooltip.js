function ShowTooltip(evt, textRegion, textValue)
{

	//change the tooltip
	tooltip = document.getElementById('tooltip');
	tooltip_bg = document.getElementById('tooltip_bg');
	tooltip.setAttributeNS(null,"x",evt.clientX+11);
	tooltip.setAttributeNS(null,"y",evt.clientY+27);
	regionSpan = document.getElementById('tooltipRegion');
	regionSpan.textContent = textRegion;
	regionSpan.setAttributeNS(null,"x",evt.clientX+11);
	regionSpan.setAttributeNS(null,"y",evt.clientY+27);
	valueSpan = document.getElementById('tooltipValue');
	valueSpan.textContent = textValue;
	valueSpan.setAttributeNS(null,"x",evt.clientX+11);
	valueSpan.setAttributeNS(null,"y",evt.clientY+47);
	/*tooltip.firstChild.data = mouseovertext;*/
	tooltip.setAttributeNS(null,"visibility","visible");

	//how long is the longest text?
	length1 = regionSpan.getComputedTextLength();
	length2 = regionSpan.getComputedTextLength();
	length = (length1 > length2) ? length1 : length2;


	tooltip_bg.setAttributeNS(null,"width",length+8);
	tooltip_bg.setAttributeNS(null,"x",evt.clientX+8);
	tooltip_bg.setAttributeNS(null,"y",evt.clientY+14);
	tooltip_bg.setAttributeNS(null,"visibility","visibile");



	//has SVG changed its position?
	skewX = 0;
	skewY = 0;
	if (document.getElementById('viewport')) {
		viewport = document.getElementById('viewport')
		skewX = viewport.getCTM().e
		skewY = viewport.getCTM().f

		//get transformation matrix from viewport
		matrix = document.getElementById('viewport').getCTM();

		//calculate transformation matrix for tooltip (skewX and skewY)
		xxx = (evt.clientX*1/matrix.a)-evt.clientX-(skewX*1/matrix.a);
		yyy = (evt.clientY*1/matrix.d)-evt.clientY-(skewY*1/matrix.d);
		tooltip_bg.setAttribute("transform","matrix(1,0,0,1,"+xxx+","+yyy+")");
		tooltip.setAttribute("transform","matrix(1,0,0,1,"+xxx+","+yyy+")" );
	}
}

function HideTooltip(evt)
{
	tooltip.setAttributeNS(null,"visibility","hidden");
	tooltip_bg.setAttributeNS(null,"visibility","hidden");
}
