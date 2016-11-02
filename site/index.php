<?php

// TODO :
//- Faire différent appelà l'API pour les personnages n'étant pas dans la guilde
//- Customiser la page /personnages/index.php
//- Personaliser le CSS
//- Checker si j'ai oublié personne
//- Améliorer le PHP car c'est dégeulasse


//appel à l'API B.net en filtrant par rapport à la guilde
$url = "https://eu.api.battle.net/wow/guild/Ner'zhul/tu%20pull%20tu%20tank?fields=members&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw = file_get_contents($url);
$json = json_decode($raw);
foreach ($json->{'members'} as $key) {
	//récupération des infos pour chaque personnages
	//Oui je sais ce switch case est aussi jolie que les fesses de Damien aprés un KFC
	switch ($key->{'character'}->{'name'}) {
		case 'Zararia':
		$zarariaName = $key->{'character'}->{'name'};
		$zarariaThumbnail = $key->{'character'}->{'thumbnail'};
		$zarariaClass = $key->{'character'}->{'spec'}->{'name'};
		$zarariaClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Liëd':
		$liedName = $key->{'character'}->{'name'};
		$liedThumbnail = $key->{'character'}->{'thumbnail'};
		$liedClass = $key->{'character'}->{'spec'}->{'name'};
		$liedClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Capshow' :
		$capshowName = $key->{'character'}->{'name'};
		$capshowThumbnail = $key->{'character'}->{'thumbnail'};
		$capshowClass = $key->{'character'}->{'spec'}->{'name'};
		$capshowClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Druidodu' :
		$druidoduName = $key->{'character'}->{'name'};
		$druidoduThumbnail = $key->{'character'}->{'thumbnail'};
		$druidoduClass = $key->{'character'}->{'spec'}->{'name'};
		$druidoduClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Hilegacy' :
		$hilegacyName = $key->{'character'}->{'name'};
		$hilegacyThumbnail = $key->{'character'}->{'thumbnail'};
		$hilegacyClass = $key->{'character'}->{'spec'}->{'name'};
		$hilegacyClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Soupline' :
		$souplineName = $key->{'character'}->{'name'};
		$souplineThumbnail = $key->{'character'}->{'thumbnail'};
		$souplineClass = $key->{'character'}->{'spec'}->{'name'};
		$souplineClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		case 'Guiz' :
		$guizName = $key->{'character'}->{'name'};
		$guizThumbnail = $key->{'character'}->{'thumbnail'};
		$guizClass = $key->{'character'}->{'spec'}->{'name'};
		$guizClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		//TODO DADDY
		// case 'Daddy' :
		// $elnadrinName = $key->{'character'}->{'name'};
		// $elnadrinThumbnail = $key->{'character'}->{'thumbnail'};
		// $elnadrinClass = $key->{'character'}->{'spec'}->{'name'};
		// $elnadrinClassDesc = $key->{'character'}->{'spec'}->{'description'};
		// break;
		case 'Eaax' :
		$eaaxName = $key->{'character'}->{'name'};
		$eaaxThumbnail = $key->{'character'}->{'thumbnail'};
		$eaaxClass = $key->{'character'}->{'spec'}->{'name'};
		$eaaxClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		//TODO : MELNAS
		// case 'Melnas' :
		// $elnadrinName = $key->{'character'}->{'name'};
		// $elnadrinThumbnail = $key->{'character'}->{'thumbnail'};
		// $elnadrinClass = $key->{'character'}->{'spec'}->{'name'};
		// $elnadrinClassDesc = $key->{'character'}->{'spec'}->{'description'};
		// break;
		case 'Liloulilol' :
		$liloulilolName = $key->{'character'}->{'name'};
		$liloulilolThumbnail = $key->{'character'}->{'thumbnail'};
		$liloulilolClass = $key->{'character'}->{'spec'}->{'name'};
		$liloulilolClassDesc = $key->{'character'}->{'spec'}->{'description'};
		break;
		//TODO : ELNADRIN
		// maxipanda: VRAIMENT??? UN TODO POUR ELNA ?
		// case 'Elnadrin' :
		// $elnadrinName = $key->{'character'}->{'name'};
		// $elnadrinThumbnail = $key->{'character'}->{'thumbnail'};
		// $elnadrinClass = $key->{'character'}->{'spec'}->{'name'};
		// $elnadrinClassDesc = $key->{'character'}->{'spec'}->{'description'};
		// var_dump($CapshowThumbnail);die;
		// break;
		//TODO : WARMACINE
		//
		// case 'Warmacine' :
		// $elnadrinName = $key->{'character'}->{'name'};
		// $elnadrinThumbnail = $key->{'character'}->{'thumbnail'};
		// $elnadrinClass = $key->{'character'}->{'spec'}->{'name'};
		// $elnadrinClassDesc = $key->{'character'}->{'spec'}->{'description'};
		// break;
		default:
		break;
	}
}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Blueprint: Responsive Full Width Tabs</title>
		<meta name="description" content="Blueprint: Responsive Full Width Tabs" />
		<meta name="keywords" content="responsive tabs, full width tabs, template, blueprint" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />

		<script src="js/jquerymin.js"></script>
		<script src="js/roster.js"></script>
		<script src="js/TPTTAPI.js"></script>
		<!--[if IE]>
  		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>
	<pre>
		<!-- VAR_DUMPLAND -->
	</pre>
	<body>
		<div class="container">
			<header class="clearfix">
				<span>Ner'zhul</span>
				<h1>Tu pull tu tank</h1>
			</header>
			<div id="tabs" class="tabs">
				<nav>
					<ul>
						<li><a href="#section-1" class="icon-shop"><span>Tank</span></a></li>
						<li><a href="#section-2" class="icon-cup"><span>Heal</span></a></li>
						<li><a href="#section-3" class="icon-food"><span>Cac</span></a></li>
						<li><a href="#section-4" class="icon-lab"><span>Distance</span></a></li>
						<li><a href="#section-5" class="icon-truck"><span>Top</span></a></li>
					</ul>
				</nav>
				<div class="content">
					<section id="section-1">
						<!-- Zararia -->
						<!-- <form action="../personnages/index.php" id="zararia"method="post">
							<a href="javascript:{}" onclick="document.getElementById('zararia').submit(); return false;">
							<div class="mediabox">
								<img src="http://render-api-eu.worldofwarcraft.com/static-render/eu/nerzhul/111/106550639-profilemain.jpg" alt="img01" />
								<h3><?php echo $zarariaName; ?></h3>
								<p><?php echo $zarariaClassDesc; ?></p>
							</div>
							<input type="hidden" name="name" value="<?php echo $zarariaName; ?>">
							</a>
						</form> -->
						<!-- Lied -->
					<!-- 	<div class="mediabox">
							<img src="http://render-api-eu.worldofwarcraft.com/static-render/eu/nerzhul/189/107099069-profilemain.jpg" alt="img02" />
							<h3><?php echo $liedName; ?></h3>
							<p><?php echo $liedClassDesc; ?></p>
						</div>
						<div class="mediabox">
							<img src="http://render-api-eu.worldofwarcraft.com/static-render/eu/nerzhul/189/107099069-profilemain.jpg" alt="img02" />
							<h3><?php echo $liedName; ?></h3>
							<p><?php echo $liedClassDesc; ?></p>
						</div>
 -->
						<!--
						// TODO : MELNAS
						<div class="mediabox">
							<img src="http://render-api-eu.worldofwarcraft.com/static-render/eu/nerzhul/119/106321783-avatar.jpg" alt="img03" />
							<h3><?php echo $capshowName?></h3>
							<p><?php echo $capshowClassDesc?></p>
						</div>
						-->
					</section>
					<section id="section-2">
				<!-- 		<div class="mediabox">
							<img src="img/04.png" alt="img04" />
							<h3>Asparagus Cucumber Cake</h3>
							<p>Chickweed okra pea winter purslane coriander yarrow sweet pepper radish garlic brussels sprout groundnut summer purslane earthnut pea tomato spring onion azuki bean gourd. </p>
						</div> -->
					
					</section>
					<section id="section-3">
						<!-- <div class="mediabox">
							<img src="img/02.png" alt="img02" />
							<h3>Noodle Curry</h3>
							<p>Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea.Sushi gumbo beet greens corn soko endive gumbo gourd.</p>
						</div> -->
					</section>
					<section id="section-4">
					<!-- 	<div class="mediabox">
							<img src="img/03.png" alt="img03" />
							<h3>Tomato Cucumber Curd</h3>
							<p>Chickweed okra pea winter purslane coriander yarrow sweet pepper radish garlic brussels sprout groundnut summer purslane earthnut pea tomato spring onion azuki bean gourd. </p>
						</div> -->
						
					</section>
					<section id="section-5">
					<div class="mediabox">
							<h3>TODO</h3>
						</div>
						<!-- <div class="mediabox">
							<img src="img/02.png" alt="img02" />
							<h3>Radish Tomato</h3>
							<p>Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage lettuce tomato kale arugula melon sierra leone bologi rutabaga tigernut.</p>
						</div> -->
					</section>
				</div><!-- /content -->
			</div><!-- /tabs -->
		</div>
		<script src="js/cbpFWTabs.js"></script>
		<script>
			new CBPFWTabs( document.getElementById( 'tabs' ) );
		</script>
		<script src="js/pageloader.js"></script>
	</body>
</html>
