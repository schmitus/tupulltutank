var TPTTAPI = {};
var isServerOnline = false;
var isDebug = true;
var apikey = "bqerewzpvtvbure8npcx7txu4xc73jkk"

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
* Return the picture url of "name"
*/
TPTTAPI.getPictureAdressOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	var baseURL = "http://render-api-eu.worldofwarcraft.com/static-render/eu/";
	if(charInfo === null){
		console.error("TPTTAPI : getPictureAdressOf charInfo not found");
		return null;
	}
	return baseURL+charInfo.thumbnail;
}

/**
* Return the description of the character
*/
TPTTAPI.getDescriptionOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getDescriptionOf charInfo not found");
		return null;
	}
	return charInfo.spec.description;
}

/**
* Set the roster
*/
TPTTAPI.setRoster = function(roster){
	this.roster = roster;
	if(isDebug){
		console.log("DEBUG setRoster: Roster defined : ");
	}
	if(this.guildInfo !== null){
		console.log("TPTTAPI Initialized");
		this.isInitialised = true;
		this.callbackOnInit();
	}
}

/**
* Set the guild infos
*/
TPTTAPI.setGuildInfo = function(guildInfo){
	this.guildInfo = guildInfo;
	if(isDebug){
		console.log("DEBUG setGuildInfo: guildInfo defined : ");
	}
	if(this.roster !== null){
		console.log("TPTTAPI Initialized");
		this.isInitialised = true;
		this.callbackOnInit();
	}
}

/**
* Send back infos of the character
*/
TPTTAPI.getCharacterInfo = function(name){
	for(var i in this.guildInfo.members){
		if(name === this.guildInfo.members[i].character.name){
			return this.guildInfo.members[i].character;
		}
	}
	// NOT FOUND IN THE GUILD 
	// Get data of this char ... 
	return null;
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
			TPTTAPI.setGuildInfo(JSON.parse(this.responseText));
		}
	};
	guildReq.open("GET", "https://eu.api.battle.net/wow/guild/Ner'zhul/tu%20pull%20tu%20tank?fields=members&locale=fr_FR&apikey="+apikey, true);
	guildReq.send();
}

/**
* Initialisation is needed before using the API
*/
TPTTAPI.initialisation = function(callback){
	this.callbackOnInit = callback;
	this.isInitialised = false;
	this.roster = null;
	this.host = null;
	this.guildInfo = null;
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

TPTTAPI.initialisation();
