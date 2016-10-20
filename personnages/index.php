<?php
var_dump($_POST);
$color_palette = array ("DH" => "#7b1fa2",
						"Monk" => "#1de9b6",
						"Drood" => "#f57f17",
						"DK"	=> "#ff1744",
						"mage" => "#29b6f6",
						"War"	=> "#795548",
						"Priest" => "#212121",
						"Paladin" => "#ea80fc",);

$urlInfos = "https://eu.api.battle.net/wow/character/Ner'zhul/" .$_POST['name'] . "?locale=en_GB&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw = file_get_contents($urlInfos);
$urlItems = "https://eu.api.battle.net/wow/character/Ner'zhul/" .$_POST['name'] . "?fields=items&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw2 = file_get_contents($urlItems);
$urlTalents = "https://eu.api.battle.net/wow/character/Ner'zhul/" .$_POST['name'] . "?fields=talents&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw3 = file_get_contents($urlTalents);
$urlPvp = "https://eu.api.battle.net/wow/character/Ner'zhul/" .$_POST['name'] . "?fields=pvp&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw4 = file_get_contents($urlPvp);
$urlMetier = "https://eu.api.battle.net/wow/character/Ner'zhul/" .$_POST['name'] . "?fields=professions&locale=fr_FR&apikey=bqerewzpvtvbure8npcx7txu4xc73jkk";
$raw5 = file_get_contents($urlMetier);

$json = json_decode($raw);
$json2 = json_decode($raw2);
$json3 = json_decode($raw3);
$json4 = json_decode($raw4);
$json5 = json_decode($raw5);
$profileMain = "http://render-api-eu.worldofwarcraft.com/static-render/eu/".str_replace('avatar', 'mainpage', $json->{'thumbnail'}) ;
var_dump($profileMain);;
?>

<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Blueprint: Responsive Content Slider</title>
		<meta name="description" content="Blueprint: Responsive Content Slider" />
		<meta name="keywords" content="responsive, content, slider, jquery, css3, fluid, template" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/default.css" />
		<link rel="stylesheet" type="text/css" href="css/component.css" />
		<script src="js/modernizr.custom.js"></script>
	</head>
	<body>
		<div class="container">
			<header class="clearfix">
				<span><!--{Spé du personnage}--></span>
				<h1><!--{Titre + Nom du personnage}--></h1>
				<nav><a href="http://tympanus.net/codrops/?p=13651" class="icon-drop" data-info="Retour à la vue d'ensemble">Retour à la vue d'ensemble</a></nav>
			</header>
			<div class="main">
				<div id="cbp-contentslider" class="cbp-contentslider">
					<ul>
						<li id="slide1">
							<h3 class="">Infos générales</h3>
							<div>
								<div class="cbp-content">


								</div>
							</div>
						</li>
						<li id="slide2">
							<h3 class="">Stuff</h3>
							<div>
								<div class="cbp-content">
									<pre>

									</pre>
								</div>
							</div>
						</li>
						<li id="slide3">
							<h3 class="">Talents</h3>
							<div>
								<div class="cbp-content">
									<p><pre>
									</pre></p>
								</div>
							</div>
						</li>
						<li id="slide4">
							<h3 class="">PVP</h3>
							<div>
								<div class="cbp-content">
									<pre>


									</pre>
								</div>
							</div>
						</li>
						<li id="slide5">
							<h3 class="">Métiers</h3>
							<div>
								<div class="cbp-content">
									<pre>

									</pre>
								</div>
							</div>
						</li>
					</ul>
					<nav>
						<a href="#slide1" class=""><span><!--Infos générales--></span></a>
						<a href="#slide2" class=""><span><!--Stuff--></span></a>
						<a href="#slide3" class=""><span><!--Talents--></span></a>
						<a href="#slide4" class=""><span><!--PVP--></span></a>
						<a href="#slide5" class=""><span><!--Métiers--></span></a>
					</nav>
				</div>
			</div>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="js/jquery.cbpContentSlider.min.js"></script>
		<script>
			$(function() {
				/*
				- how to call the plugin:
				$( selector ).cbpContentSlider( [options] );
				- options:
				{
					// default transition speed (ms)
					speed : 500,
					// default transition easing
					easing : 'ease-in-out',
					// current item's index
					current : 0
				}
				- destroy:
				$( selector ).cbpContentSlider( 'destroy' );
				*/

				$( '#cbp-contentslider' ).cbpContentSlider();
			});
		</script>
	</body>
</html>
