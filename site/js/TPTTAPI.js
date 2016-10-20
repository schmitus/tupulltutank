var TPTTAPI = {};
var isServerOnline = false;
var isDebug = true;
var apikey = "bqerewzpvtvbure8npcx7txu4xc73jkk"
"https://eu.api.battle.net/wow/guild/Ner'zhul/tu%20pull%20tu%20tank?fields=members&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk"

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
	}
}

/**
* Set the guild infos
*/
TPTTAPI.setGuildList = function(guildInfo){
	this.guildList = guildInfo;
	if(isDebug){
		console.log("DEBUG setGuildList: guildList defined : ");
	}
}

/**
* Update the informations about roster, guild, and other members
*/
TPTTAPI.updateInfos = function(roster){

	var rosterReq = new XMLHttpRequest();
	rosterReq.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
			TPTTAPI.setRoster(JSON.parse(this.responseText));
		}
	};
	rosterReq.open("GET", this.host+"roster.json", true);
	rosterReq.send();

	var guildReq = new XMLHttpRequest();
	guildReq.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
			TPTTAPI.setGuildList(JSON.parse(this.responseText));
		}
	};
	guildReq.open("GET", "https://eu.api.battle.net/wow/guild/Ner'zhul/tu%20pull%20tu%20tank?fields=members&locale=fr_FR&apikey="+apikey, true);
	guildReq.send();
}

/**
* Initialisation is needed before using the API
*/
TPTTAPI.initialisation = function(){
	this.roster = null;
	this.host = null;
	this.guildList = null;
	this.othersList = null;

	// Get the host right ( localhost or online )
	if (isServerOnline === true){
		this.host = "TODO"; // TODO En fonction de l'hebergement du serveur
	}
	else{
		this.host = "http://localhost/tupulltutank/site/"
	}

	TPTTAPI.updateInfos(); // Fetch all data
}

