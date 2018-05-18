<?php
//$baseurl="http://www.apolitical.info/webgame/";
$baseurl="http://localhost/aof/";
include($baseurl."header.txt");
?>
<div align="center"><img style="border:0px" src="images/savegamelarge.gif"></div>
<div>&nbsp</div>
<div align="center"><b>保存游戏/TO SAVE YOUR GAME</b></div>
<div>&nbsp</div>
<div>Copy the following text, then paste it into a program like Word or Notepad and save it. To start your game from the same place, open up the file, select all the text, and paste it into your web browser.</div>
<div>&nbsp</div>
<div class="saveBox">
<?php
/*
$para = $_GET['para'];
$carry = $_GET['carry'];
$street = $_GET['street'];
$square = $_GET['square'];
$weapon = $_GET['weapon'];
$world = $_GET['world'];
$blessings = $_GET['blessings'];
$name = $_GET['name'];
$prof = $_GET['prof'];
$shells = $_GET['shells'];
$maxsta = $_GET['maxsta'];
$creda = $_GET['creda'];
$rolls = $_GET['rolls'];
$step = $_GET['step'];
*/

$para = filter_input(INPUT_GET, 'para', FILTER_SANITIZE_STRING);
$carry = filter_input(INPUT_GET, 'carry', FILTER_SANITIZE_STRING);
$street = filter_input(INPUT_GET, 'street', FILTER_SANITIZE_STRING);
$square = filter_input(INPUT_GET, 'square', FILTER_SANITIZE_STRING);
$weapon = filter_input(INPUT_GET, 'weapon', FILTER_SANITIZE_STRING);
$world = filter_input(INPUT_GET, 'world', FILTER_SANITIZE_STRING);
$blessings = filter_input(INPUT_GET, 'blessings', FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
$prof = filter_input(INPUT_GET, 'prof', FILTER_SANITIZE_STRING);
$shells = filter_input(INPUT_GET, 'shells', FILTER_SANITIZE_STRING);
$maxsta = filter_input(INPUT_GET, 'maxsta', FILTER_SANITIZE_STRING);
$creda = filter_input(INPUT_GET, 'creda', FILTER_SANITIZE_STRING);
$rolls = filter_input(INPUT_GET, 'rolls', FILTER_SANITIZE_STRING);
$step = filter_input(INPUT_GET, 'step', FILTER_SANITIZE_STRING);

$fullink="<div><b>".$baseurl."game.php?para=".$para."&carry=".$carry."&street=".$street."&square=".$square."&weapon=".$weapon."&world=".$world."&blessings=".$blessings."&name=".$name."&prof=".$prof."&shells=".$shells."&maxsta=".$maxsta."&creda=".$creda."&rolls=".$rolls."&step=".$step."</b></div>";
print wordwrap($fullink,100,"<br>",true);
?>
</div>
<div>&nbsp</div>
<div align="center">Any problems, please email me: news (at) apolitical (dot) info</div>
<div>&nbsp</div>
<div align="center">
<!-- Project Wonderful Ad Box Code -->
<div id="pw_adbox_1077_2_0"></div>
<!-- End Project Wonderful Ad Box Code -->
<div>&nbsp</div>
<div><?php
include($baseurl."footer.txt");
?></div>
<div>&nbsp</div>
<div>
