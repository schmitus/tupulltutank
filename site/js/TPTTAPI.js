var TPTTAPI = {};
var isServerOnline = false;
var isDebug = true;

/**
* Return all Tanks in an array []
*/
TPTTAPI.getAllTanks = function(){
 return this.roster.tanks;
}

/**
* Return all Healers in an array []
*/
TPTTAPI.getAllHeals = function(){
 return this.roster.heals;
}

/**
* Return all CAC DPS in an array []
*/
TPTTAPI.getAllDpsCac = function(){
 return this.roster.dpsCac;
}

/**
* Return all distance DPS in an array []
*/
TPTTAPI.getAllDpsDist = function(){
 return this.roster.dpsDist;
}

/**
* Set the roster
*/
TPTTAPI.setRoster = function(roster){
	this.roster = roster;
	if(isDebug){
		console.log("DEBUG setRoster: Roster defined : ");
		console.log(this.roster);
	}
}

/**
* Initialisation is needed before using the API
*/
TPTTAPI.initialisation = function(){
	this.roster = null;
	this.host = null;
	// Get the host right ( localhost or online )
	if (isServerOnline === true){
		this.host = "TODO"; // TODO En fonction de l'hebergement du serveur
	}
	else{
		this.host = "http://localhost/tupulltutank/site/"
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
			TPTTAPI.setRoster(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", this.host+"roster.json", true);
	xhttp.send();
}



