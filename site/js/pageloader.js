
var loadMain = function(){

	//section-1 
	loadSection("section-1",TPTTAPI.getAllTanks());
	loadSection("section-2",TPTTAPI.getAllHeals());
	loadSection("section-3",TPTTAPI.getAllDpsCac());
	loadSection("section-4",TPTTAPI.getAllDpsDist());


}

var loadSection = function(id,data){

	var sectionHolder = document.getElementById(id);

	for(var i = 0; i < data.length; i++){

		var char = data[i];

		var form = document.createElement("form");
		form.setAttribute("action","../personnages/index.php");
		form.setAttribute("id",char.name); // name
		form.setAttribute("method","post"); 
		//form.setAttribute("onclick","submit()");  TODO : WHEN WORKING 
		var divhandler = document.createElement("div");
		divhandler.setAttribute("class","mediabox");
		var forminput = document.createElement("input");
		forminput.setAttribute("type","hidden");
		forminput.setAttribute("name","name");
		forminput.setAttribute("value",char.name);

		var imgElement = document.createElement("img");
		imgElement.setAttribute("src",char.avatar); 
		imgElement.setAttribute("alt","img01"); 

		var nameElement = document.createElement("h3");
		nameElement.innerHTML = char.name;

		var descriptionElement = document.createElement("p");
		descriptionElement.innerHTML = char.description + "</br>" + "ILVL : " + char.ilvl;

		var progressElement = document.createElement("p");
		progressElement.innerHTML = char.raidProgress[0].name + "</br> @allTime : NM " + char.raidProgress[0].NMprogress +"/" + char.raidProgress[0].total + "   HM " + char.raidProgress[0].HMprogress +"/" + char.raidProgress[0].total + "   MM " + char.raidProgress[0].MMprogress +"/" + char.raidProgress[0].total;
		progressElement.innerHTML += "</br> @thisWeek : NM " + char.raidProgress[0].NMweekprogress +"/" + char.raidProgress[0].total + "   HM " + char.raidProgress[0].HMweekprogress +"/" + char.raidProgress[0].total + "   MM " + char.raidProgress[0].MMweekprogress +"/" + char.raidProgress[0].total;
		

		sectionHolder.appendChild(form);
		form.appendChild(divhandler);
		divhandler.appendChild(imgElement);
		divhandler.appendChild(nameElement);
		divhandler.appendChild(descriptionElement);
		divhandler.appendChild(progressElement);

	}


}


TPTTAPI.initialisation(loadMain); 
