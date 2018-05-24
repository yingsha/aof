<?php
//error_reporting( E_ALL &~ E_NOTICE );
error_reporting( E_ALL ^ E_NOTICE );

//$baseurl="http://www.apolitical.info/webgame/";
$baseurl="";
include($baseurl."header.txt");
$line="<div>&nbsp</div>";
$startdiv="<div align=\"center\">";
$link=$startdiv."<a href=\"".$baseurl;

/*
$mode = $_GET['mode'];
$method = $_GET['method'];
$branch = $_GET['branch'];
$orderplace = $_GET['orderplace'];
$order = $_GET['order'];
$prof = $_GET['prof'];
$type = $_GET['type'];
$rolls = $_GET['rolls'];
$name = $_GET['name'];
$Stamina = $_GET['Stamina'];
$Charisma = $_GET['Charisma'];
$Duelling = $_GET['Duelling'];
$Brawling = $_GET['Brawling'];
$Seafaring = $_GET['Seafaring'];
$Magic = $_GET['Magic'];
$Heroism = $_GET['Heroism'];
$Scouting = $_GET['Scouting'];
$Roguery = $_GET['Roguery'];
$Luck = $_GET['Luck'];
$Healing = $_GET['Healing'];
$Streetwise = $_GET['Streetwise'];
*/

$mode = filter_input(INPUT_GET, 'mode', FILTER_SANITIZE_STRING);
$method = filter_input(INPUT_GET, 'method', FILTER_SANITIZE_STRING);
$branch = filter_input(INPUT_GET, 'branch', FILTER_SANITIZE_STRING);
$orderplace = filter_input(INPUT_GET, 'orderplace', FILTER_SANITIZE_STRING);
$order = filter_input(INPUT_GET, 'order', FILTER_SANITIZE_STRING);
$prof = filter_input(INPUT_GET, 'prof', FILTER_SANITIZE_STRING);
$type = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);
$rolls = filter_input(INPUT_GET, 'rolls', FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
$Stamina = filter_input(INPUT_GET, 'Stamina', FILTER_SANITIZE_STRING);
$Charisma = filter_input(INPUT_GET, 'Charisma', FILTER_SANITIZE_STRING);
$Duelling = filter_input(INPUT_GET, 'Duelling', FILTER_SANITIZE_STRING);
$Brawling = filter_input(INPUT_GET, 'Brawling', FILTER_SANITIZE_STRING);
$Seafaring = filter_input(INPUT_GET, 'Seafaring', FILTER_SANITIZE_STRING);
$Magic = filter_input(INPUT_GET, 'Magic', FILTER_SANITIZE_STRING);
$Heroism = filter_input(INPUT_GET, 'Heroism', FILTER_SANITIZE_STRING);
$Scouting = filter_input(INPUT_GET, 'Scouting', FILTER_SANITIZE_STRING);
$Roguery = filter_input(INPUT_GET, 'Roguery', FILTER_SANITIZE_STRING);
$Luck = filter_input(INPUT_GET, 'Luck', FILTER_SANITIZE_STRING);
$Healing = filter_input(INPUT_GET, 'Healing', FILTER_SANITIZE_STRING);
$Streetwise = filter_input(INPUT_GET, 'Streetwise', FILTER_SANITIZE_STRING);

//languages
// 0 - English
// 1 - Chinese
// 2 - Chinese (English) 汉英对照
$lang = filter_input(INPUT_GET, 'lang', FILTER_SANITIZE_STRING);
if (!isset($lang)) {
$lang = 0;
}

if (!isset($mode)) {
$mode=0;
}

// NOTE: Unlike game.php, this file doesn't add or subtract 6
// for values over 25, because currently no stat can start over 25.

//these stats are BEFORE the additions to Stamina and Heroism
//class name, then attributes, then name, then gender:
//4=male, 5=female (courtesan counts as female)

$classes=21;
$class=array (
1=> array ("talking-cat",1,20,5,15,1,11,1,20,5,20,1,20,"Seti Nur-ishtar",4),
2=> array ("wizard",3,8,8,8,12,20,10,12,9,10,16,4,"Perilandera",5),
3=> array ("scoundrel",5,16,9,12,5,6,1,5,20,20,1,20,"Urang Semalai",4),
4=> array ("bard",8,20,5,5,10,5,5,5,12,20,9,16,"Hisvet Sigrun",5),
5=> array ("knight",10,5,20,15,9,10,20,5,1,10,10,5,"Be-Steadfast Toth",4),
6=> array ("nomad",15,5,13,13,19,5,14,20,1,5,9,1,"Taruk Few-Clothes",4),
7=> array ("pirate",13,13,13,13,20,1,5,5,14,9,1,13,"Two Souls Macout",4),
8=> array ("fairy",1,19,1,1,1,19,10,10,19,19,15,5,"Damael",5),
9=> array ("dwarf",20,5,10,17,3,3,15,15,8,8,8,8,"Longshanks Macabee",4),
10=> array ("barbarian",14,5,14,19,14,5,9,14,10,10,1,5,"Ektor the Patient One",4),
11=> array ("assassin",1,15,15,15,5,11,1,11,15,11,5,15,"Owl-Waits-For-the-Moon",4),
12=> array ("witch",13,13,5,5,1,20,5,15,5,13,20,5,"Sulia Bukawayo",5),
13=> array ("faun",5,20,1,10,5,20,1,20,20,10,7,1,"Hekatotaratos",4),
14=> array ("troll",20,1,10,20,3,10,5,20,5,10,15,1,"Ingvar Arnesson",4),
15=> array ("courtesan",1,20,1,1,8,10,15,1,8,20,15,20,"白麻雀(White Sparrow)",5),
16=> array ("fortune-teller",7,15,6,8,12,1,1,15,15,15,10,15,"Goody Atkins",5),
17=> array ("amazon",15,1,17,17,17,1,12,17,1,4,17,1,"Ana Blood-On-The-Arm",5),
18=> array ("lizard-man",19,1,19,19,1,19,19,19,1,1,1,1,"Bright Skin Young Jewel",4),
19=> array ("explorer",19,15,1,1,19,1,14,19,1,14,15,1,"Temperance Jobsworth",4),
20=> array ("aristocrat",1,10,20,1,20,20,1,10,2,20,10,5,"Euphemia",5),
21=> array ("doraemon",20,20,20,20,20,20,20,20,20,20,20,20,"机器猫(Doraemon)",4),
);

//classes
// 'clown' and 'bird' are special cases:
// you can only be turned into them,
// you can't choose to start as one.
$classname=array (
	1=> array ("talking-cat","人语猫talking cat"),
	2=> array ("wizard","魔法师wizard"),
	3=> array ("scoundrel","恶棍scoundrel"),
	4=> 	array ("bard","吟游诗人bard"),
	5=> 	array ("knight","骑士knight"),
	6=> 	array ("nomad","游牧民nomad"),
	7=> 	array ("pirate","海盗pirate"),
	8=> 	array ("fairy","仙子fairy"),
	9=> 	array ("dwarf","矮人dwarf"),
	10=> 	array ("barbarian","野蛮人barbarian"),
	11=> 	array ("assassin","刺客assassin"),
	12=> 	array ("witch","女巫witch"),
	13=> 	array ("faun","弗恩faun"),
	14=> 	array ("troll","巨魔troll"),
	15=> 	array ("courtesan","交际花courtesan"),
	16=> 	array ("fortune-teller","占卜师fortune-teller"),
	17=> 	array ("amazon","亚马逊女战士amazon"),
	18=> 	array ("lizard-man","蜥蜴人lizard-man"),
	19=> 	array ("explorer","探索者explorer"),
	20=> 	array ("aristocrat","贵族aristocrat"),
	21=> array ("doraemon","机器猫doraemon"),
);

// used to have priest:
// 1=> array ("priest",5,12,1,5,12,9,20,12,5,12,20,7,"Be-Steadfast Toth",4),

// attributes

$word=array (
'Stamina' => array ("near death","sickly","sickly","sickly","unhealthy","unhealthy","unhealthy","unremarkable","unremarkable","unremarkable","unremarkable","healthy","healthy","healthy","healthy","robust","robust","robust","unstoppable","unstoppable","unstoppable"),
'Charisma' => array ("null","repulsive","repulsive","hateful","hateful","hateful","annoying","annoying","annoying","innocuous","innocuous","innocuous","likeable","likeable","likeable","charming","charming","charming","mesmerising","mesmerising","mesmerising"),
'Duelling' => array ("null","clumsy","clumsy","clumsy","clumsy","slow","slow","slow","slow","average","average","average","average","agile","agile","agile","agile","dangerous","dangerous","deadly","deadly"),
'Brawling' => array ("null","puny","puny","puny","weak","weak","weak","unremarkable","unremarkable","unremarkable","unremarkable","strong","strong","strong","strong","strong","powerful","powerful","powerful","legendary","legendary"),
'Seafaring' => array ("null","gets seasick in the bath","gets seasick in the bath","landlubber","landlubber","mediocre","mediocre","mediocre","fair","fair","fair","good","good","good","great","great","great","old salt","old salt","old salt","old salt"),
'Magic' => array ("null","powerless","powerless","poor","poor","mediocre","mediocre","mediocre","fair","fair","fair","good","good","good","great","great","great","superb","superb","overwhelming","overwhelming"),
'Heroism' => array ("wicked","wicked","wicked","corrupt","corrupt","selfish","selfish","wavering","wavering","wavering","good-hearted","good-hearted","good-hearted","bold","bold","bold","bold","heroic","heroic","heroic","heroic"),
'Scouting' => array ("null","gets lost in the back yard", "gets lost in the back yard","terrible","terrible","poor","poor","mediocre","mediocre","fair","fair","good","good","good","great","great","great","superb","superb","legendary","legendary"),
'Roguery' => array ("null","terrible","terrible","poor","poor","mediocre","mediocre","mediocre","fair","fair","fair","good","good","good","great","great","great","superb","superb","legendary","legendary"),
'Luck' => array ("null","cursed","cursed","ill-starred","ill-starred","mediocre","mediocre","mediocre","fair","fair","fair","lucky","lucky","lucky","auspicious","auspicious","auspicious","charmed","charmed","blessed","blessed"),
'Healing' => array ("null","terrible","terrible","poor","poor","mediocre","mediocre","mediocre","fair","fair","fair","good","good","good","great","great","great","superb","superb","legendary","legendary"),
'Streetwise' => array ("null","babe in the woods","babe in the woods","clueless","clueless","foolish","foolish","unwise","unwise","fair","fair","alert","alert","alert","crafty","crafty","crafty","cunning1","cunning1","cunning2","cunning2"),
);

//number and names of attributes
$attnum=12;
$attributes=array("null","Stamina","Charisma","Duelling","Brawling","Seafaring","Magic","Heroism","Scouting","Roguery","Luck","Healing","Streetwise");

// current character
$stats=array();

function getLocStr($fulltext, $lang) {

	//main array
	$localizationPrefix = "Loc_";
	$localization=array(
		'Loc_RandomCharacter'=> array ("Random character", "随机生成角色来开始游戏"),
		'Loc_PreGenChar'=> array ("Pre-generated character", "选择预设的21个角色之一来开始游戏"),
		'Loc_StartPlayingWithThisCharacter'=> array ("Start playing with this character", "使用这名角色开始游戏"),
		'Loc_CreateCustomCharUsing'=> array ("Create a custom character, using", "自定义角色生成"),
		'Loc_EditCustomCharUsing'=> array ("Edit this character, using", "编辑角色属性"),
		'Loc_UsingLinks'=> array ("links", "点击调属性"),
		'Loc_UsingDropDownMenus'=> array ("drop-down menus", "下拉框调属性"),
		'Loc_FAQ'=> array ("Frequently Asked Questions", "常见问题"),
		'Loc_BackToMainPage'=> array ("back to the main page", "返回主页"),
		'Loc_ChooseCharacterOr'=> array ("Click a picture to choose that character, or ", "点选一个角色，或者 "),
		'Loc_SeeMoreCharacters'=> array ("see more characters", "刷新更多角色以供选择"),
		'Loc_AcceptThisCharacter'=> array ("Accept this character", "确认扮演此角色"),
		'Loc_TotalAttrAre'=> array ("The total attributes for this character are ", "该角色属性值总和为 "),
		'Loc_TotalAttrNeedToBe'=> array ("Total attributes need to be ", "属性值总和必须等于 "),
		'Loc_RandomTheirScores'=> array ("randomize their scores", "随机修改属性值"),
		// $word
		"near death"=> array ("near death","濒死"),
		"sickly"=> array ("sickly","虚弱"),
		"unhealthy"=> array ("unhealthy","不健康"),
		"unremarkable"=> array ("unremarkable","寻常"),
		"healthy"=> array ("healthy","健康"),
		"robust"=> array ("robust","健壮"),
		"unstoppable"=> array ("unstoppable","无人能敌"),
		"repulsive"=> array ("repulsive","可憎"),
		"hateful"=> array ("hateful","可恶"),
		"annoying"=> array ("annoying","讨厌"),
		"innocuous"=> array ("innocuous","寻常"),
		"likeable"=> array ("likeable","讨人喜欢"),
		"charming"=> array ("charming","迷人"),
		"mesmerising"=> array ("mesmerising","有魅力"),
		"puny"=> array ("puny","孱弱"),
		"good"=> array ("good","不错"),
		"fair"=> array ("fair","还行"),
		"mediocre"=> array ("mediocre", "平庸"),
		"great"=> array ("great","很好"),
		"superb"=> array ("superb","非常好"),
		"legendary"=> array ("legendary","传奇般"),
		"average"=> array ("average","普通"),
		"strong"=> array ("strong","强壮"),
		"clueless"=> array ("clueless","鲁莽"),
		"unwise"=> array ("unwise","不明智"),
		"poor"=> array ("poor","糟糕"),
		"agile"=> array ("agile","敏捷"),
		"blessed"=> array ("blessed","有如神助"),
		"deadly"=> array ("deadly","十分致命"),
		"overwhelming"=> array ("overwhelming","异常强大"),
		"foolish"=> array ("foolish","愚蠢"),
		"alert"=> array ("alert","警惕"),
		"cunning1"=> array("cunning as a fox","如狐狸般狡猾"),
		"cunning2"=> array ("cunning as a shithouse rat","极度狡猾"),
		// class
		"talking-cat"=> array ("talking-cat","人语"),
		"wizard"=> array ("wizard","魔法师"),
		"scoundrel"=> array ("scoundrel","恶棍"),
		"bard"=> 	array ("bard","吟游诗人"),
		"knight"=> 	array ("knight","骑士"),
		"nomad"=> 	array ("nomad","游牧民"),
		"pirate"=> 	array ("pirate","海盗"),
		"fairy"=> 	array ("fairy","仙子"),
		"dwarf"=> 	array ("dwarf","矮人"),
		"barbarian"=> 	array ("barbarian","野蛮人"),
		"assassin"=> 	array ("assassin","刺客"),
		"witch"=> 	array ("witch","女巫"),
		"faun"=> 	array ("faun","弗恩"),
		"troll"=> 	array ("troll","巨魔"),
		"courtesan"=> 	array ("courtesan","交际花"),
		"fortune-teller"=> 	array ("fortune-teller","占卜师"),
		"amazon"=> 	array ("amazon","亚马逊女战士"),
		"lizard-man"=> 	array ("lizard-man","蜥蜴人"),
		"explorer"=> 	array ("explorer","探索者"),
		"aristocrat"=> 	array ("aristocrat","贵族"),
		"doraemon"=> array ("doraemon","机器猫"),
		"clown"=> array ("clown","小丑"),
		"bird"=> array ("bird","鸟"),
	);

	// localization
	if (substr( $fulltext, 0, 4 ) == $localizationPrefix OR array_key_exists($fulltext, $localization)) {
		if ($lang==2) {
			// 汉英对照
			$fulltext=$localization[$fulltext][1]." (".$localization[$fulltext][0].")";
		} else {
			$fulltext=$localization[$fulltext][$lang];
		}
	}
	return $fulltext;
}


?>

<div id="h">
<div align="center"><img src="images/misc/banner.jpg"/></div>
</div>

<?php
print $line;
print $startdiv;
print "</div>";

print "<table align=\"center\" width=\"100%\">";
print "<tr";
if ($mode==1 or $mode==3 or $mode==6) {
	print " valign=\"center\"";
} elseif ($mode<>0) {
	print " valign=\"top\"";
}
print ">";
print "<td width=\"50%\">";

if ($mode==0) {
	// main menu

	print $link."index.php?lang=0\">[English]</a>";
	print "&nbsp;<a href=\"".$baseurl."index.php?lang=1\">[中文Chinese]</a>";
	print "&nbsp;<a href=\"".$baseurl."index.php?lang=2\">[中英对照]</a></div>";
	print $line;
	print $line;
	print $link."index.php?mode=2&method=1&lang=".$lang."\" onMouseover=\"window.status='randomly generated character'; return true\">".getLocStr("Loc_RandomCharacter", $lang)."</a></div>";
	print $line;
	print $link."index.php?mode=5&lang=".$lang."\" onMouseover=\"window.status='choose from a list of characters'; return true\">".getLocStr("Loc_PreGenChar", $lang)."</a></div>";
	print $line;
	print $startdiv.getLocStr("Loc_CreateCustomCharUsing", $lang);
	print $link."index.php?mode=4&method=2&lang=".$lang."\" onMouseover=\"window.status='choose your character\'s attributes'; return true\">".getLocStr("Loc_UsingLinks", $lang)."</a> or <a href=\"".$baseurl."index.php?mode=4&method=1&lang=".$lang."\" onMouseover=\"window.status='choose your character\'s attributes'; return true\">".getLocStr("Loc_UsingDropDownMenus", $lang)."</a></div>";
	print $line;
	print $link."index.php?mode=6&lang=".$lang."\" onMouseover=\"window.status='link to us'; return true\">Link to Age of Fable</a></div>";
	print $line;
	print $link."index.php?mode=1&lang=".$lang."\" onMouseover=\"window.status='FAQ'; return true\">".getLocStr("Loc_FAQ", $lang)."</a></div>";
	print $line;
	print $link."credits.php?lang=".$lang."\" onMouseover=\"window.status='artist and author details'; return true\">Credits</a></div>";
	print $line;
	// print $startdiv."Age of Fable is unfinished</div>";
	// print $startdiv."and under construction.</div>";
	print $startdiv;
	// @include $baseurl."update.txt";
	// print $startdiv."Please feel free to leave</div>";
	// print $startdiv."any feedback in the</div>";
	print $startdiv."<a href=\"http://www.apolitical.info/guestbook\" onMouseover=\"window.status='leave feedback, or read other people\'s'; return true\" target=\"_blank\">Guestbook</a></div>";
	print $startdiv."(opens in a new window)";
	print $line;
	print $link."index.php?mode=3&lang=".$lang."\" onMouseover=\"window.status='a small list of similar sites'; return true\">Links</a></div>";
	print $line;
	print $startdiv."Library";
	print $link."index.php?mode=7&branch=1&lang=".$lang."\" onMouseover=\"window.status='stories'; return true\">Stories</a> . <a href=\"".$baseurl."index.php?mode=7&branch=2&lang=".$lang."\" onMouseover=\"window.status='other resources'; return true\">Games</a></div>";
	print $line;
	print "<a href=\"http://www.apolitical.info/webgame/sourcecode.php\" onMouseover=\"window.status='source-code for Age of Fable'; return true\" target=\"_blank\">Source Code</a></div>";
	print $startdiv."(opens in a new window)";
} elseif ($mode==1) {
	// Frequently Asked Questions
	print $startdiv."<iframe src=\"faq.html\" height=450 frameborder=0></IFRAME></div>";
	print $line;
	print $link."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a></div>";
} elseif ($mode==2) {
	//$method (for generating stats):
	//1=generate randomly
	//2=use $rolls (renaming character randomly)
	//3=use profession archetype                         (<---- not currently in use, it seems)
	//4=use $rolls (entering name for character)
	//5=use $rolls, but randomise (randomly changing stats)
	//6=use $rolls (returning from choosing to enter name or editing)

	if (!isset($method)) {
	$method=1;
	}

	//generate initial stats for character
	$total=0;

	//for random characters only - choose a pre-generated
	//character, do that +/- up to 6.

	$rolltemplate=rand(1,$classes);

	for ($loop=1;$loop<=$attnum;$loop++) {
		if ($method==1) {
			$stats[$loop]=min(20,max(1,$class[$rolltemplate][$loop]+6-rand(0,12)));
		} elseif ($method==3) {
			$stats[$loop]=$class[$prof][$loop];
		} else {
			$stats[$loop]=ord($rolls[$loop-1])-64;
			if ($attributes[$loop]=="Stamina" or $attributes[$loop]=="Heroism") {
				$stats[$loop]=$stats[$loop]-5;
			}
		}
		$total=$total+$stats[$loop];
	}

	if ($method==5) {
		//5=use $rolls, but randomise (randomly changing stats)
		$tweak=array();
		$tote=0;
		for ($loop=1;$loop<=$attnum;$loop++) {
			do {
				$tweak[$loop]=rand(0,3)-rand(0,3);
				$attnew=$tweak[$loop]+$stats[$loop];
			} while ($attnew<1 or $attnew>20);
			$tote=$tote+$tweak[$loop];
		}
		while ($tote<>0) {
			if ($tote>0) {
				$movement=-1;
			} else {
				$movement=1;
			}

			do {
				$thisatt=rand(1,$attnum);
				$newtweak=$tweak[$thisatt]+$movement;
				$newvalue=$stats[$thisatt]+$newtweak;
			} while ($newvalue==0 or $newvalue==21 or $newtweak==4 or $newtweak==-4);

			$tweak[$thisatt]=$tweak[$thisatt]+$movement;
			$tote=$tote+$movement;
		}
		for ($loop=1;$loop<=$attnum;$loop++) {
			$stats[$loop]=$stats[$loop]+$tweak[$loop];
		}
	}

	//balance characters stats
	while ($total<>$attnum*10) {
		$change=rand(1,$attnum);
		$total=$total-$stats[$change];
		$stats[$change]=0;
		$ideal=($attnum*10)-$total;

		if (($ideal>2 and $ideal<19) or ($ideal>0 and $ideal<21 and $method==1)) {
			$stats[$change]=$ideal;
		} else {
			$stats[$change]=rand(1,20);
		}
		$total=$total+$stats[$change];
	}

	//decide what class the character is
	//(unless you're just re-naming the character: method==4 random name, method==2 enter name
	if ($method<>4 and $method<>2 and $method<>6) {
		$score=array();
		$lowest=100000;
		for ($cloop=1;$cloop<=$classes;$cloop++) {
			for ($aloop=1;$aloop<=$attnum;$aloop++) {
				$ideal=$class[$cloop][$aloop];
				$score[$cloop]=$score[$cloop]+abs($stats[$aloop]-$ideal);
			}
			$lowest=min($lowest,$score[$cloop]);
		}

		// just random attributes: method==5  won't change prof/class
		if ($method<>5 and $method<>3) {
			$prof=0;
			do {
				$prof++;
			} while ($score[$prof]>$lowest);
		}
	}

	//add 5 to Stamina and Heroism
	for ($loop=1;$loop<=$attnum;$loop++) {
		if ($attributes[$loop]=="Stamina" or $attributes[$loop]=="Heroism") {
			$stats[$loop]=$stats[$loop]+5;
		}
	}

	//generate name if necessary
	if (!isset($name) or $name=="") {

		// random name elements
		// with flags for where they can be: 1=first, 2=last, 3=alone.
		// and for genders 4=male, 5=female
		//(doesn't apply if used as surname)

		$namebit=array (
		1=> array ("Be-Steadfast",1,1,1,1,1),
		2=> array ("Toth",1,1,1,1,0),
		3=> array ("Perilandera",1,1,1,0,1),
		4=> array ("Urang",1,1,1,1,0),
		5=> array ("Semalai",1,1,1,1,1),
		6=> array ("Djemmela",1,0,1,0,1),
		7=> array ("Hisvet",1,0,1,0,1),
		8=> array ("Tasmetum-sharrat",1,1,1,0,1),
		9=> array ("Goodenough",1,1,0,1,1),
		10=> array ("Taruk",1,1,1,1,0),
		11=> array ("Few-Clothes",1,1,1,1,1),
		12=> array ("Two Souls",1,1,1,1,1),
		13=> array ("Macout",1,1,1,1,1),
		14=> array ("Damael",1,1,1,1,1),
		15=> array ("Gadabout",1,1,1,1,1),
		16=> array ("Longshanks",1,1,0,1,1),
		17=> array ("Ektor",1,0,1,1,0),
		18=> array ("the Patient One",0,1,0,0,0),
		19=> array ("Owl-Waits-For-The-Moon",1,1,1,1,1),
		20=> array ("Sulia",1,1,1,0,1),
		21=> array ("Bukawayo",1,1,1,1,1),
		22=> array ("Hekatotaratos",1,1,1,1,0),
		23=> array ("Ingvar",1,0,1,1,0),
		24=> array ("Arnesson",0,1,0,0,0),
		25=> array ("White",1,1,0,1,1),
		26=> array ("Sparrow",1,1,1,1,1),
		27=> array ("Goody",1,0,0,0,1),
		28=> array ("Atkins",1,1,0,1,0),
		29=> array ("Ana",1,0,1,0,1),
		30=> array ("Blood-On-The-Arm",1,1,1,1,1),
		31=> array ("Bright Skin",1,1,1,1,1),
		32=> array ("Young Jewel",1,1,1,1,1),
		33=> array ("Athousandapologies",1,1,1,1,1),
		34=> array ("Gottmundsdaughter",0,1,0,0,1),
		35=> array ("the Virtuous",0,1,0,1,1),
		36=> array ("Sun",1,1,1,1,1),
		37=> array ("Mad Tom",1,0,1,1,0),
		38=> array ("Wee Jock",1,0,1,1,0),
		39=> array ("Padrath",1,1,1,1,1),
		40=> array ("Lori",1,1,1,0,1),
		41=> array ("Ingrid",1,0,0,0,1),
		42=> array ("Macabee",1,1,1,1,1),
		43=> array ("du Mal",0,1,0,1,1),
		44=> array ("Obadiah",1,0,1,1,0),
		45=> array ("Perdus",1,1,1,1,1),
		46=> array ("Iakkos",1,0,1,1,0),
		47=> array ("the Unwanted Guest",0,1,0,1,1),
		48=> array ("Crumhorn",1,1,1,1,1),
		49=> array ("Agatha",1,0,0,0,1),
		50=> array ("The Magnificent",0,1,0,1,1),
		51=> array ("Cathlin",1,0,0,0,1),
		52=> array ("Ajibayo",1,1,1,1,0),
		53=> array ("Abanazir",1,1,1,1,1),
		54=> array ("Notsoblind",0,1,1,1,1),
		55=> array ("Deanna",1,0,0,0,1),
		56=> array ("Hassan",1,1,1,1,0),
		57=> array ("Kittybiscuits",1,1,1,1,1),
		58=> array ("Anaxagoras",1,0,1,1,0),
		59=> array ("Charis",1,1,1,0,1),
		60=> array ("Leofric",1,1,1,1,0),
		61=> array ("Idris",1,1,1,1,1),
		62=> array ("Betrys",1,1,1,0,1),
		64=> array ("Arnheld",1,1,0,1,0),
		65=> array ("She-Is-Not-Sterile",1,1,1,0,1),
		66=> array ("Artemisios",1,1,1,1,0),
		67=> array ("Chariton",1,1,1,1,0),
		68=> array ("Dodekatheon",1,1,1,1,0),
		69=> array ("Ambrosia",1,0,1,0,1),
		70=> array ("Appolonia",1,1,1,0,1),
		71=> array ("Charis",1,1,1,0,1),
		72=> array ("Dionysia",1,1,1,0,1),
		73=> array ("Euphemia",1,0,1,0,1),
		74=> array ("Hekabe",1,1,1,0,1),
		75=> array ("Kallistrate",1,1,1,0,1),
		76=> array ("Snorri",1,1,0,1,0),
		77=> array ("Skallagrim",1,1,1,1,0),
		78=> array ("Ragnvald",1,1,1,1,0),
		79=> array ("Geirmund",1,1,1,1,0),
		80=> array ("Sigrun",1,1,1,0,1),
		81=> array ("Sigrid",1,0,1,0,1),
		82=> array ("Olwen",1,1,1,0,1),
		83=> array ("Grimhildr",1,1,1,0,1),
		84=> array ("Freygerd",1,1,1,0,1),
		85=> array ("Arnthrud",1,1,1,0,1),
		86=> array ("Jobsworth",1,1,1,1,1),
		87=> array ("Temperance",1,0,0,1,1),
		88=> array ("Timeandtide",1,1,1,1,1),
		89=> array ("ben Ibrahim",0,1,0,1,0),
		90=> array ("Halfull",1,1,0,1,1),
		91=> array ("Halfempty",1,1,1,1,1),
		92=> array ("Isisnofret",1,1,1,0,1),
		93=> array ("Neferu",1,1,1,0,1),
		94=> array ("Seti",1,1,1,1,0),
		95=> array ("Ishtar-rabi-at",1,1,1,0,1),
		96=> array ("Ummi-waqrat",1,1,1,0,1),
		97=> array ("Ammat-Baal",1,1,1,0,1),
		98=> array ("Yashub-yahad",1,1,1,1,0),
		99=> array ("Nur-ishtar",1,1,1,1,0),
		100=> array ("Wobblebottom",1,1,1,1,1),
		101=> array ("Violet",1,0,0,0,1),
		102=> array ("Viola",1,0,0,0,1),
		103=> array ("Tibbletibtub",1,1,1,1,1),
		104=> array ("Agnes",1,0,0,0,1),
		105=> array ("Prudence",1,0,0,0,1),
		106=> array ("Barelegs",1,1,0,1,1),
		107=> array ("Lackland",1,1,0,1,1),
		108=> array ("Boneless",1,1,1,1,1),
		109=> array ("Epaminondas",1,0,0,1,0),
		110=> array ("Beloved",1,1,1,1,1),
		111=> array ("Solemn",1,0,0,1,1),
		112=> array ("Brightness",1,1,1,1,1),
		113=> array ("Sidebottom",0,1,0,1,1),
		114=> array ("Highpants",1,1,0,1,1),
		115=> array ("Silka",1,0,1,0,1),
		116=> array ("Ichabod",1,0,1,1,0),
		117=> array ("Greedyguts",1,1,0,1,1),
		118=> array ("Biddy",1,0,0,0,1),
		119=> array ("the Wretched",0,1,0,0,0),
		120=> array ("Abi-Simti",1,1,1,0,1),
		121=> array ("Haroun",1,0,1,1,0),
		122=> array ("Huggenkiss",1,1,1,1,1),
		);

		$namebits=122;

		if (rand(1,9)<3) {
			// one element
			do {
				$which=rand(1,$namebits);
			} while ($namebit[$which][3]==0 or $namebit[$which][$class[$prof][$attnum+2]]==0);
			// OR gender
			$name=$namebit[$which][0];
		} else {
			// two elements
			do {
				$whichf=rand(1,$namebits);
				$whichl=rand(1,$namebits);
			} while ($whichf==$whichl or $namebit[$whichf][1]==0 or $namebit[$whichl][2]==0 or $namebit[$whichf][$class[$prof][$attnum+2]]==0 or ($whichl==34 and $class[$prof][$attnum+2]==4) or ($whichl==90 and $class[$prof][$attnum+2]==5));
			// gender check only for first name
			// but elements 34 is special.
			$name=$namebit[$whichf][0]." ".$namebit[$whichl][0];
		}
	} else {
		$name=str_replace(chr(92),chr(0),$name);
	}

	// replace spaces with ^s (fix: use _ instead of ^ for compatiablity in wechat mobile and web)
	$name=str_replace(" ","_",$name);

	//print character, and create $rolls string
	print "<table align=\"center\"><tr><td>";
	print $startdiv."<img src=\"".$baseurl."images/misc/thumb_".$class[$prof][0].".jpg\"></div>";
	print $startdiv."<i>".str_replace("_"," ",$name)."</i></div>";
	print $startdiv.getLocStr($classname[$prof][0], $lang)."(prof=".$prof.")</div>";
	print "</td><td>";
	$rolls="";
	print "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	for ($loop=1;$loop<=$attnum;$loop++) {
		print "<tr><td>".$attributes[$loop].":</td><td align=\"right\">".$stats[$loop]." (</td><td>";
		$rating=$stats[$loop];
		if ($attributes[$loop]=="Stamina" or $attributes[$loop]=="Heroism") {
			$rating=$rating-5;
		}
		print getLocStr($word[$attributes[$loop]][$rating], $lang);
		print ")</td></tr>";
		$rolls=$rolls.chr($stats[$loop]+64);
	}
	print "</table>";
	print "</td></tr></table>";

	//options - re-roll or accept character
	if ($method==2) {
		print "<div align=\"center\">";
		print "<form name=\"input\" action=\"index.php\" method=\"get\">";
		print "<input type=\"text\" name=\"name\">";
		print "<input type=\"submit\" value=\"enter 输入姓名\">";
		print "<input type=\"hidden\" name=\"prof\" value=".$prof.">";
		print "<input type=\"hidden\" name=\"rolls\" value=\"".$rolls."\">";
		print "<input type=\"hidden\" name=\"mode\" value=2>";
		print "<input type=\"hidden\" name=\"method\" value=6>";
		print "</form>";
		print "</div>";
		print $startdiv."Enter the character's name in the text box above and click the 'enter' button, or</div>";
		print $link."index.php?mode=2&method=6&lang=".$lang."&rolls=".$rolls."&prof=".$prof."&name=".$name."\" onMouseover=\"window.status='leave the character\'s name as it is'; return true\">leave the name as it is</a></div>";
	} else {
		print $link."game.php?lang=".$lang."&rolls=".$rolls."&prof=".$prof."&name=".$name."\" onMouseover=\"window.status='start playing'; return true\">".getLocStr("Loc_StartPlayingWithThisCharacter", $lang)."</a></div>";
		print $line;
		print $startdiv.getLocStr("Loc_EditCustomCharUsing", $lang);
		print $link."index.php?mode=4&method=2&lang=".$lang."&rolls=".$rolls."&name=".$name."\" onMouseover=\"window.status='choose your character\'s attributes'; return true\">".getLocStr("Loc_UsingLinks", $lang)."</a> or <a href=\"".$baseurl."index.php?mode=4&method=1&lang=".$lang."&rolls=".$rolls."&name=".$name."\" onMouseover=\"window.status='choose your character\'s attributes'; return true\">".getLocStr("Loc_UsingDropDownMenus", $lang)."</a> or <a href=\"".$baseurl."index.php?mode=2&method=5&lang=".$lang."&rolls=".$rolls."&prof=".$prof."&name=".$name."\" onMouseover=\"window.status='make a small, random change to this character'; return true\">".getLocStr("Loc_RandomTheirScores", $lang)."</a></div>";
		print $line;
		print $startdiv."起名 - <a href=\"".$baseurl."index.php?mode=2&method=4&lang=".$lang."&prof=".$prof."&rolls=".$rolls."\" onMouseover=\"window.status='random new name for this character'; return true\">随机起名 randomly</a> or <a href=\"".$baseurl."index.php?mode=2&method=2&lang=".$lang."&rolls=".$rolls."&prof=".$prof."&name=".$name."\" onMouseover=\"window.status='enter a name of your choice for this character'; return true\">手工输入 your choice</a></div>";
		print $line;
		print $startdiv."New character - <a href=\"".$baseurl."index.php?mode=2&method=1&lang=".$lang."\" onMouseover=\"window.status='randomly generate a new character'; return true\">random</a> or <a href=\"".$baseurl."index.php?mode=5&lang=".$lang."\" onMouseover=\"window.status='choose from a list of characters'; return true\">pre-generated</a>.</div>";
		print $line;
		print "<hr/>";
		print $startdiv."The following links all open in a new window:</div>";
		print $line;
		print $link."index.php?mode=6&lang=".$lang."\" onMouseover=\"window.status='link to us'; return true\" target=\"_blank\">Link to Age of Fable</a></div>";
		print $line;
		print $link."index.php?mode=1&lang=".$lang."\" onMouseover=\"window.status='FAQ'; return true\" target=\"_blank\">".getLocStr("Loc_FAQ", $lang)."</a></div>";
		print $line;
		print $link."credits.php\" target=\"_blank\" onMouseover=\"window.status='author and artist details'; return true\">Credits</a></div>";
		print $line;
		print $startdiv."<a href=\"http://www.apolitical.info/guestbook\" onMouseover=\"window.status='leave feedback, or read other people\'s'; return true\" target=\"_blank\">Guestbook</a></div>";
		print $line;
		print $link."index.php?mode=3&lang=".$lang."\" onMouseover=\"window.status='a small list of similar sites'; return true\" target=\"_blank\">Links</a></div>";
		print $line;
		print $startdiv."Library: <a href=\"".$baseurl."index.php?mode=7&branch=1&lang=".$lang."\" onMouseover=\"window.status='stories'; return true\" target=\"_blank\">Stories</a> . <a href=\"".$baseurl."index.php?mode=7&branch=2&lang=".$lang."\" onMouseover=\"window.status='other resources'; return true\" target=\"_blank\">Games</a></div>";
		print $line;
		print "<a href=\"http://www.apolitical.info/webgame/sourcecode.php\" onMouseover=\"window.status='source-code for Age of Fable'; return true\" target=\"_blank\">Source Code</a></div>";
	}

} elseif ($mode==3) {
	// Links
	print $startdiv."<iframe src=\"links.html\" height=450 frameborder=0></IFRAME></div>";
	print $line;
	print $link."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a></div>";

} elseif ($mode==5) {
	// Pre-generated character
	if (!isset($order)) {
		$classdone=array();
		for ($click=1;$click<=$classes;$click++) {
			do {
				$nextclass=rand(1,$classes);
			} while ($classdone[$nextclass]=="done");
			$classdone[$nextclass]="done";
			$order=$order.chr($nextclass+64);
		}
	}

	if (!isset($orderplace)) {
		$orderplace=1;
	}

	print $line;
	print "<table align=\"center\">";
	$flag=0;
	$x=4;
	$y=4;
	for ($click=$orderplace;$click<=$orderplace+($x*$y)-1;$click++) {
		$bclick=$click;
		if ($bclick>$classes) {
			$bclick=$bclick-$classes;
		}
		$loop=ord($order[$bclick-1])-64;
		if ($flag==0) {
			print "<tr>";
		}
		print "<td>";
		print $startdiv."<a href=\"".$baseurl."index.php?mode=2&method=3&lang=".$lang."&prof=".$loop."&name=".$class[$loop][$attnum+1]."\" onMouseover=\"window.status='choose ".$class[$loop][$attnum+1]."'; return true\"><img style=\"border-color: #8888FF\" src=\"".$baseurl."images/misc/thumb_".$class[$loop][0].".jpg\" alt=\"".$class[$loop][$attnum+1].", a";
		$z=substr($class[$loop][0],0,1);
		if ($z=="a" or $z=="e") {
			print "n";
		}

		print " ".$class[$loop][0]."\"></a></div>";
		print "</td>";
		if ($flag==$x-1) {
			print "</tr>";
		}
		$flag++;
		if ($flag==$x) {
			$flag=0;
		}
	}
	print "</table>";
	print $line;
	$orderplace=$orderplace+($x*$y);
	if ($orderplace>$classes) {
		$orderplace=$orderplace-$classes;
	}
	print $startdiv.getLocStr("Loc_ChooseCharacterOr", $lang);
	//print $startdiv."<a href=\"".$baseurl."index.php?mode=5&lang=".$lang."&order=".$order."&orderplace=".$orderplace."\" onMouseover=\"window.status='see more characters'; return true\">刷新更多角色以供选择 see more characters</a></div>";
	print "<a href=\"".$baseurl."index.php?mode=5&lang=".$lang."\" onMouseover=\"window.status='see more characters'; return true\">".getLocStr("Loc_SeeMoreCharacters", $lang)."</a></div>";
	print $line;
	print $link."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a></div>";

} elseif ($mode==6) {
	// Link to Age of Fable
	print $startdiv."<img src=\"".$baseurl."images/misc/banner.jpg\"></div>";
	print $line;
	print $startdiv."You can use the image above to link to us. Use the following three lines of code:</div>";
	print $line;
	print "<ul>";
	print "<li><xmp><a href=\"http://www.ageoffable.net\"></xmp>";
	print "<li><xmp><img src=\"".$baseurl."images/misc/banner.jpg\"></xmp>";
	print "<li><xmp></a></xmp>";
	print "</ul>";
	print $line;
	print $startdiv."if you save the banner to your own server, obviously change the address in the second line to whatever address you save the picture to.</div>";
	print $line;
	print $startdiv."If you want a banner of a different size or shape, please feel free to email:</div>";
	print $startdiv."news (at) apolitical (dot) info.</div>";
	print $line;
	print $link."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a></div>";

} elseif ($mode==7) {
	// Library (branch 1: Stories, branch 2: Games)
	if (!isset($branch)) {
	$branch=2;
	}
	if ($branch==1) {
		print "A small collection of writing in a similar vein to Age of Fable.";
		print $line;
		print "<ul>";
		print "<li>from <a href=\"http://www.apolitical.info/webgame/confessions\" onMouseover=\"window.status='a short extract from \'Confessions of an English Opium-Eater\' by Thomas de Quincy'; return true\">Confessions of an English Opium-Eater</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/sarnath\" onMouseover=\"window.status='\'The Doom That Came To Sarnath\', by H.P. Lovecraft'; return true\">The Doom That Came To Sarnath</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/garden\" onMouseover=\"window.status='\'The Garden of Adompha\', by Clark Ashton Smith'; return true\">The Garden of Adompha</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/gilgalad\" onMouseover=\"window.status='\'Gil-galad Was an Elven-King\', by J.R.R. Tolkien'; return true\">Gil-Galad Was an Elven-King</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/jackals\" onMouseover=\"window.status='\'Jackals and Arabs\', by Franz Kafka'; return true\">Jackals and Arabs</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/masque\" onMouseover=\"window.status='\'The Masque of the Red Death\', by Edgar Allen Poe; return true\">The Masque of the Red Death</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/morthylla\" onMouseover=\"window.status='\'Morthylla\', by Clark Ashton Smith'; return true\">Morthylla</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/ozymandias.php\" onMouseover=\"window.status='\'Ozymandias\', by Percy Shelley'; return true\">Ozymandias</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/poltarnees.php\" onMouseover=\"window.status='\'Poltarnees, Beholder of Ocean\', by Lord Dunsany'; return true\">Poltarnees, Beholder of Ocean</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/tower\" onMouseover=\"window.status='\'The Tower of the Elephant\', by Robert E. Howard'; return true\">The Tower of the Elephant</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/worms\" onMouseover=\"window.status='\'Worms of the Earth\', by Robert E. Howard'; return true\">Worms of the Earth</a>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/xanadu\" onMouseover=\"window.status='\'Xanadu\', by Samuel Taylor Coleridge'; return true\">Xanadu</a>";
		print $line;
		print "<li>This speech by <a href=\"http://www.apolitical.info/webgame/ukleguin.php\" onMouseover=\"window.status='speech by Ursula K. LeGuin'; return true\">Ursula K. Le Guin</a> discusses fantasy cliches.</div>";
	} else {
		print "<b>Online Games</b>";
		print "<ul>";
		print "<li><a href=\"http://www.apolitical.info/private/mars\" onMouseover=\"window.status='Under the Moons of Mars'; return true\">Under the Moons of Mars</a> Inspired by the game <a href=\"http://www.boardgamegeek.com/boardgame/54201/the-d6-shooters\">The d6 Shooters</a>, this game is set in a science fictional version of the planet Mars.</div>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/blaze\" onMouseover=\"window.status='Blaze of Glory'; return true\">Blaze of Glory</a> and <a href=\"http://www.apolitical.info/hunters\" onMouseover=\"window.status='Hunters'; return true\">Hunters</a> Two versions of the same simple game - one's about fighting fires, the other's about hunting vampires. <i>Hunters</i> is a bit harder.</div>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/westward\" onMouseover=\"window.status='Westward!'; return true\">Westward!</a> An online game, based on an early version of the computer game <i>Oregon Trail</i>.</div>";
		print "</ul>";
		print "<b>Resources for Pen-and-Paper Role-Playing Games</b>";
		print "<ul>";
		print "<li>The <a href=\"http://www.apolitical.info/webgame/class/becmi.php\" onMouseover=\"window.status='Dungeons & Dragons custom class creator'; return true\">Basic/Expert D&D custom class creator</a> Generates a random character class (not an individual character), for Basic Dungeons & Dragons (the version from the 1980s), or Labyrinth Lord (a free 'clone' of Basic D&D). The <a href=\"http://www.apolitical.info/webgame/class/d20.php\" onMouseover=\"window.status='Dungeons & Dragons custom class creator'; return true\">d20 custom class creator</a> is exactly the same thing, but for 3.5 edition D&D.</div>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/tables.php\" onMouseover=\"window.status='Tables for Fables'; return true\">Tables for Fables</a> is a collection of random tables. 这里有一些神奇的表格。</div>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/heroes\" onMouseover=\"window.status='Cute Board Heroes'; return true\">Cute Board Heroes</a> A collection of pictures, for making paper miniatures.</div>";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/dungeon\" onMouseover=\"window.status='Dungeons & Dragons / Tunnels & Trolls dungeon generator'; return true\">Dungeons & Dragons/Tunnels & Trolls dungeon generator</a> Creates a random dungeon for the games Tunnels & Trolls, Basic Dungeons & Dragons, or Labyrinth Lord.</div>";
		print "</ul>";
		print "<b>Resources for Pen-and Paper Role-Playing Games, or For Writing</b>";
		print "<ul>";
		print "<li>The <a href=\"http://www.apolitical.info/webgame/ideas\" onMouseover=\"window.status='randomly generates ideas for fantasy stories or role-playing games'; return true\">Adventure Ideas Generator</a> gives ideas for fantasy stories or role-playing games.";
		print $line;
		print "<li>The <a href=\"http://www.apolitical.info/webgame/plots\" onMouseover=\"window.status='randomly generates short plots for a variety of genres'; return true\">Plot Generator</a> gives short ideas for fantasy, pulp, space opera, superhero, western or cyberpunk plots - or any combination of these.";
		print $line;
		print "<li><a href=\"http://www.apolitical.info/webgame/map\" onMouseover=\"window.status='randomly generates maps for stories or role-playing games'; return true\">Random Map Generator</a>";
		print $line;
		print "<li>The <a href=\"http://www.apolitical.info/webgame/creature\" onMouseover=\"window.status='randomly generates creatures for stories or role-playing games'; return true\">Creature Creator</a> will randomly create fantasy creatures.";
		print $line;
	}
	print "</ul>";
	print "<div><a href=\"".$baseurl."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a> . ";
	$otherbranch="stories";
	if ($branch==1) {
		$otherbranch="games";
	}
	print "<a href=\"".$baseurl."index.php?mode=7&lang=".$lang."&branch=".(3-$branch)."\" onMouseover=\"window.status='".$otherbranch."'; return true\">".$otherbranch."</a></div>";

} elseif ($mode==4) {
	// Create a custom character, using
	// method=1: drop-down menus
	// method=2: a table of links

	if (!isset($rolls)) {
	$rolls="OJJJJJOJJJJJ";
	}

	if (isset($name)) {
		$name=str_replace(chr(92),chr(0),$name);
	}

	// get attributes.
	if ($rolls=="notusing") {
		$stats[1]=$Stamina;
		$stats[2]=$Charisma;
		$stats[3]=$Duelling;
		$stats[4]=$Brawling;
		$stats[5]=$Seafaring;
		$stats[6]=$Magic;
		$stats[7]=$Heroism;
		$stats[8]=$Scouting;
		$stats[9]=$Roguery;
		$stats[10]=$Luck;
		$stats[11]=$Healing;
		$stats[12]=$Streetwise;
	} else {
		for ($loop=1;$loop<=$attnum;$loop++) {
			$stats[$loop]=ord($rolls[$loop-1])-64;
		}
	}

	// get total of attributes
	$total=0;
	for ($loop=1;$loop<=$attnum;$loop++) {
		$total=$total+$stats[$loop];
	}

	// decide on $prof (class), except for when first arrive with
	// a rolled character, in the rare event of ties.
	if (!isset($prof)) {
		$score=array();
		$lowest=100000;
		for ($cloop=1;$cloop<=$classes;$cloop++) {
			for ($aloop=1;$aloop<=$attnum;$aloop++) {
				$ideal=$class[$cloop][$aloop];
				if ($attributes[$aloop]=="Heroism" or $attributes[$aloop]=="Stamina") {
					$ideal=$ideal+5;
				}
				$score[$cloop]=$score[$cloop]+abs($stats[$aloop]-$ideal);
			}
			$lowest=min($lowest,$score[$cloop]);
		}
		$prof=0;
		do {
			$prof++;
		} while ($score[$prof]>$lowest);
	}
	//print character (name and picture)
	print $startdiv."<img src=\"".$baseurl."images/misc/thumb_".$class[$prof][0].".jpg\"></div>";
	print $startdiv."<i>".$name."</i></div>";
	print $startdiv.getLocStr($classname[$prof][0], $lang)."</div>";
	print $line;

	if ($method==1) {
		print "<table align=\"center\">";
		print "<form name=\"input\" action=\"index.php\" method=\"get\">";
		for ($att=1;$att<=$attnum;$att++) {
			print "<tr><td align=\"right\">".$attributes[$att].":</td><td>";
			print "<select name=".$attributes[$att]." style=\"width:210px\">";
			for ($x=1;$x<21;$x++) {
				$y=$x;
				if ($attributes[$att]=="Stamina" or $attributes[$att]=="Heroism") {
					$y=$y+5;
				}
				print "<option";
				if ($y==$stats[$att]) {
					print " selected";
				}
				print " value=".$y.">";
				print $y." (";
				print getLocStr($word [$attributes[$att]][$x], $lang);
				print ")</option>";
			}
			print "</select>";
			print "</td></tr>";
		}
		print "<input type=\"hidden\" name=\"mode\" value=4>";
		print "<input type=\"hidden\" name=\"method\" value=1>";
		print "<input type=\"hidden\" name=\"rolls\" value=\"notusing\">";

		if (isset($name)) {
			print "<input type=\"hidden\" name=\"name\" value=\"".$name."\">";
		}
		print "<tr><td></td><td><input type=\"submit\" value=\"check character\"></td></tr>";
		if ($total==$attnum*10+10) {
			//pack attributes into $rolls;
			$rolls="";
			for ($loop=1;$loop<=$attnum;$loop++) {
			$rolls=$rolls.chr($stats[$loop]+64);
			}
		}
		print "</form></table>";

	} else {
		print "<table align=\"center\">";
		for ($loop=1;$loop<=$attnum;$loop++) {
			print "<tr><td align=\"right\"><b>".$attributes[$loop]."</b></td>";
			$lowstat=1;
			if ($attributes[$loop]=="Stamina" or $attributes[$loop]=="Heroism") {
				$lowstat=6;
			}
			for ($nloop=0;$nloop<=19;$nloop++) {
				$thisone=$lowstat+$nloop;
				print "<td align=\"center\"";
				if ($thisone==$stats[$loop]) {
					print " bgcolor=\"#FF0000\"><font color=\"white\"><b>";
				} else {
					$newroll=$rolls;
					$newroll[$loop-1]=chr($thisone+64);
					print "><a href=\"".$baseurl."index.php?mode=4&method=2&lang=".$lang."&rolls=".$newroll."&name=".$name."\" onMouseover=\"window.status='change ".$attributes[$loop]." to ".$thisone."'; return true\">";
				}
				print $thisone;
				if ($thisone==$stats[$loop]) {
					print "</font></b>";
				} else {
					print "</a>";
				}
				print "</td>";
			}
			$rating=$stats[$loop];
			if ($attributes[$loop]=="Stamina" or $attributes[$loop]=="Heroism") {
				$rating=$rating-5;
			}
			print "<td>(".getLocStr($word[$attributes[$loop]][$rating], $lang).")</td></tr>";
		}
		print "</table>";
	}
	print $line;
	print "<div align=\"center\">".getLocStr("Loc_TotalAttrAre", $lang).$total."</div>";
	print $line;
	print "<div align=\"center\">";
	if ($total<>$attnum*10+10) {
		print getLocStr("Loc_TotalAttrNeedToBe", $lang).($attnum*10+10);
	} else {
		print "<a href=\"".$baseurl."index.php?mode=2&method=6&lang=".$lang."&prof=".$prof."&rolls=".$rolls."&name=".$name."\" onMouseover=\"window.status='continue, with the character as is'; return true\">".getLocStr("Loc_AcceptThisCharacter", $lang)."</a>";
	}
	print "</div>";
	print $line;
	print $link."index.php?mode=0&lang=".$lang."\" onMouseover=\"window.status='back to the starting page'; return true\">".getLocStr("Loc_BackToMainPage", $lang)."</a></div>";
}

print $line;
print "</td>";
print "</table>";

include($baseurl."footer.txt");
?>
