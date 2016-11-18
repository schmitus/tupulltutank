var TPTTAPI = {};
var isServerOnline = false;
var isDebug = true;
var apikey = "bqerewzpvtvbure8npcx7txu4xc73jkk";
var lastResetTime = 1479265200000;
var currentTime = new Date();
while(lastResetTime+604800000 < currentTime.getTime()){
	lastResetTime += 604800000;
}

/**
* Return all Tanks in an array []
*/
TPTTAPI.getAllTanks = function(){
	var tanks = [];
	for(var i in this.roster){
		if(this.roster[i].role == "tank")
			tanks.push(this.roster[i]);
	}
	return tanks;
}

/**
* Return all Healers in an array []
*/
TPTTAPI.getAllHeals = function(){
	var heals = [];
	for(var i in this.roster){
		if(this.roster[i].role == "heal")
			heals.push(this.roster[i]);
	}
	return heals;
}

/**
* Return all CAC DPS in an array []
*/
TPTTAPI.getAllDpsCac = function(){
	var dpsCacs = [];
	for(var i in this.roster){
		if(this.roster[i].role == "dpsCac")
			dpsCacs.push(this.roster[i]);
	}
	return dpsCacs;
}

/**
* Return all distance DPS in an array []
*/
TPTTAPI.getAllDpsDist = function(){
	var dpsDists = [];
	for(var i in this.roster){
		if(this.roster[i].role == "dpsDist")
			dpsDists.push(this.roster[i]);
	}
	return dpsDists;
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
	return charInfo.talents[0].spec.description;
}

/**
* Return the pvp section of the character
*/
TPTTAPI.getPvpOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getPvpOf charInfo not found");
		return null;
	}
	return charInfo.pvp;
}

/**
* Return the stats section of the character
*/
TPTTAPI.getStatsOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getStatsOf charInfo not found");
		return null;
	}
	return charInfo.stats;
}

/**
* Return the profession section of the character
*/
TPTTAPI.getProfessionsOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getProfessionsOf charInfo not found");
		return null;
	}
	return charInfo.professions;
}

/**
* Return the items section of the character
*/
TPTTAPI.getRaidProgressOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getItemsOf charInfo not found");
		return null;
	}
	return charInfo.raidProgress;
}

/**
* Return the items section of the character
*/
TPTTAPI.getItemsOf = function(name){
	var charInfo = TPTTAPI.getCharacterInfo(name);
	if(charInfo === null){
		console.error("TPTTAPI : getItemsOf charInfo not found");
		return null;
	}
	return charInfo.items;
}

/**
* Set the roster
*/
TPTTAPI.setRoster = function(roster){
	this.roster = roster;
	if(isDebug){
		console.log("DEBUG setRoster: Roster defined : ");
	}
	this.ilvlList = [];
	for(var i in this.roster){
			
			var name = this.roster[i].name;
			var server = this.roster[i].server
			var infoReq = new XMLHttpRequest();
			infoReq.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					var res = JSON.parse(this.responseText);
					TPTTAPI.ilvlList.push({ "name": res.name,"ilvl":res.items.averageItemLevelEquipped});
					TPTTAPI.rosterAJAX.push({ "name": res.name,"data":res});
					TPTTAPI.notify();
				}
			};
			infoReq.open("GET", "https://eu.api.battle.net/wow/character/"+server+"/"+name+"?fields=items&fields=talents&fields=stats&fields=progression&fields=professions&fields=pvp&locale=fr_FR&apikey="+apikey, true);
			infoReq.send();


		}
		
}


/**
* Internal usage only : notify when data arrive
*/
TPTTAPI.notify = function(){
	console.log("trynotify " + this.roster.length + " / " + this.ilvlList.length  );
	
	if(this.roster.length === this.ilvlList.length && this.guildInfo !== null){
		console.log("TPTTAPI Initialized");
		this.isInitialised = true;
		this.completeRosterInfo();
		this.ilvlList = this.ilvlList.sort(TPTTAPI.compareilvl);

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
	TPTTAPI.notify();
}

/**
* Intern function, should not be used by users
*/
TPTTAPI.completeRosterInfo = function(){
	for(var i in this.roster){
		var charInfo = TPTTAPI.getCharacterInfo(this.roster[i].name);
		var raidProgress = TPTTAPI.computeProgress(charInfo.progression.raids);
		if(charInfo !== null){
			this.roster[i].ilvl = this.getCharacterilvl(this.roster[i].name);
			this.roster[i].description = charInfo.talents[0].spec.description;
			this.roster[i].specName = charInfo.talents[0].spec.name;
			this.roster[i].avatar = TPTTAPI.getPictureAdressOf(this.roster[i].name);
			this.roster[i].raidProgress = raidProgress;
		}
		else{
			console.error("TPTTAPI No information found for " +this.roster[i].name)
		}
	}
}


/**
* Send back the ilvl of the character
*/
TPTTAPI.getCharacterilvl = function(name){
	for(var i in this.ilvlList){
		if(this.ilvlList[i].name === name)
			return this.ilvlList[i].ilvl
	}
	console.error("TPTTAPI : getCharacterilvl has not found " +name + " ilvl");
}

/**
* Compute and return the progress of the char this week.
*/
TPTTAPI.computeProgress = function(data){
	var progress = [{
		"name":data[35].name,
		"NMweekprogress":0,
		"HMweekprogress":0,
		"MMweekprogress":0,
		"NMprogress":0,
		"HMprogress":0,
		"MMprogress":0,
		"total":0
	},
	{
		"name":data[36].name,
		"NMweekprogress":0,
		"HMweekprogress":0,
		"MMweekprogress":0,
		"NMprogress":0,
		"HMprogress":0,
		"MMprogress":0,
		"total":0
	},
	{
		"name":data[37].name,
		"NMweekprogress":0,
		"HMweekprogress":0,
		"MMweekprogress":0,
		"NMprogress":0,
		"HMprogress":0,
		"MMprogress":0,
		"total":0
	}
	];
	var raids = [data[35],data[36],data[37]];
	for(var j in raids){
		for(var i in raids[j].bosses){
			var boss = raids[j].bosses[i];
			if(boss.normalKills !== 0){
				progress[j].NMprogress++;
				if(boss.normalTimestamp > lastResetTime)
					progress[j].NMweekprogress++;
			}
			if(boss.heroicKills !== 0){
				progress[j].HMprogress++;
				if(boss.heroicTimestamp > lastResetTime)
					progress[j].HMweekprogress++;
			}
			if(boss.mythicKills !== 0){
				progress[j].MMprogress++;
				if(boss.mythicTimestamp > lastResetTime)
					progress[j].MMweekprogress++;
			}
			progress[j].total++;
		}
	}
	return progress;

}


/**
* Send back infos of the character
*/
TPTTAPI.getCharacterInfo = function(name){
	if(this.roster.length !== this.rosterAJAX.length)
		console.log("TPTTAPI : getCharacterInfo ERROR !this.rosterAJAX.length and this.roster.length not the same ");
	for(var i in this.rosterAJAX){
		if(name === this.rosterAJAX[i].name){
			return this.rosterAJAX[i].data;
		}
	}
	// NOT FOUND IN THE GUILD 
	// Get data of this char ... 
	return null;
}

/**
* Send back infos of the character
*/
TPTTAPI.compareilvl = function(a, b) {
  if (a.ilvl > b.ilvl)
     return -1;
  if (a.ilvl < b.ilvl)
     return 1;
  // a doit être égal à b
  return 0;
}

/**
* Send back the ilvl sorted list
*/
TPTTAPI.getiLvlList = function() {
 return this.ilvlList;
}

/**
* Update the informations about roster, guild, and other members
*/
TPTTAPI.updateInfos = function(){
	// var rosterReq = new XMLHttpRequest();
	// rosterReq.onreadystatechange = function() {
	// if (this.readyState == 4 && this.status == 200) {
	// 		TPTTAPI.setRoster(JSON.parse(this.responseText));
	// 	}
	// };
	// rosterReq.open("GET", this.host+"roster.json", true);
	// rosterReq.send();
	this.setRoster(roster);

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
	this.rosterAJAX = [];
	this.host = null;
	this.guildInfo = null;
	this.othersList = null;
	this.ilvlList = [];

	// Get the host right ( localhost or online )
	if (isServerOnline === true){
		this.host = "TODO"; // TODO En fonction de l'hebergement du serveur
	}
	else{
		this.host = "http://tupulltutank.tk/site/"
	}

	TPTTAPI.updateInfos(); // Fetch all data
}

//TPTTAPI.initialisation(); // TO REMOVE WHEN SCHMITOS USE IT 
