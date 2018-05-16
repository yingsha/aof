 <?php
//$baseurl="http://www.apolitical.info/webgame/";
$baseurl="http://localhost/aof/";
@include $baseurl."header.txt";

$line="<div>&nbsp</div>";
$site=$baseurl."/images/";
$startdiv="<div align=\"center\">";

print $startdiv."<img style=\"border-color:#888888\" src=\"".$site.$p.".jpg\"></div>";
print $line;
print $startdiv."Artwork ";
if ($a=="Laura Pelick") {
$a="<img src=\"".$site."fallenlightsbanner.jpg\">";
}

if ($a=="Steve Argyle") {
print "by <a href=\"http://www.steveargyle.com\" target=\"_blank\"><img src=\"".$site."steveargylebanner.jpg\"></a>";
print $line;
print $startdiv."Copyright <a href=\"http://www.alderac.com\" target=\"_blank\">Alderac Entertainment</a>";
} elseif ($a=="David J. Stanley") {
print "owned and licensed by David J. Stanley of <a href=\"http://www.brutalrpg.com\" target=\"_blank\">BrutalRPG.com</a>";
print $line;
print $startdiv."Original illustration by David K. Wong";
} elseif ($h=="public") {
print "by ".str_replace("<br>"," ",$a);
if ($a=="James Hutchings") {
print "<br>created using the <a href=\"http://www.adgame-wonderland.de/type/bayeux.php\" target=\"_blank\">Historic Tale Construction Kit</a>";
}
} else {
print "copyright <a href=\"http://".$h."\" target=\"_blank\">".str_replace("<br>"," ",$a)."</a>";
if ($a=="Devon Jopling") {
print $line;
print $startdiv."coloured by <a href=\"http://elfwood.lysator.liu.se/art/m/i/mishi/mishi.html\" target=\"_blank\">Michelle Angela Thuldanin</a></div>";
}
}

print "</div>";
print $line;
print $startdiv."As seen in the free online RPG <a href=\"http://www.apolitical.info/webgame\" onMouseover=\"window.status='play Age of Fable'; return true\">Age of Fable</a></div>";
print $line;
print $startdiv."See all the artwork from Age of Fable on the <a href=\"http://www.apolitical.info/webgame/credits.php\" onMouseover=\"window.status='author and artist credits'; return true\">credits page</a></div>";
print $line;
print $startdiv."This image ";
if ($a=="Peter Seckler") {
print "may be used under a <a href=\"http://creativecommons.org/licenses/by/3.0/us\" target=\"_blank\">Creative Commons</a> license";
} elseif ($a=="James Hutchings") {
print "may not be used without the permission of Age of Fable.";
} elseif (str_replace("Dominique Signoret","XXX",$a)<>$a or str_replace("Herbert Roe","XXX",$a)<>$a OR str_replace("Flaxton","XXX",$a)<>$a) {
print "may be used under the <a href=\"http://commons.wikimedia.org/wiki/Commons:GNU_Free_Documentation_License\" target=\"_blank\">GNU Free Documentation License</a>.";
if (str_replace("Dominique Signoret","XXX",$a)<>$a) {
print " The original picture is <a href=\"http://en.wikipedia.org/wiki/File:";
if ($p=="cthulhu") {
print "Cthulhu_and_R%27lyeh";
} else {
print "Shub-Niggurath";
}
print ".jpg\" target=\"_blank\">here</a>.";
} elseif (str_replace("Flaxton","XXX",$a)<>$a) {
print " The original picture is <a href=\"http://en.wikipedia.org/wiki/File:Maunsell1.jpg\" target=\"_blank\">here</a>.";
}
} elseif ($a=="Scott Harshbarger" OR $a=="Zeldyn" OR $a=="Gallegos" OR $a=="Storn A. Cook") {
print "may be used for non-commercial works under a <a href=\"http://creativecommons.org/licenses/by-nc-nd/3.0/\" target=\"_blank\">Creative Commons</a> license.";
if ($a=="Storn A. Cook") {
print "The original picture is <a href=\"http://forum.rpg.net/showthread.php?t=484318\" target=\"_blank\">here</a>.";
}
} elseif ($a=="Seth Poppy") {
print "may be used for non-commercial works under a <a href=\"http://creativecommons.org/licenses/by-nc-sa/3.0/\" target=\"_blank\">Creative Commons</a> license.";
} elseif ($a=="Kris Jacque") {
print "may be used for non-commercial works under a <a href=\"http://creativecommons.org/licenses/by-nc-nd/3.0/us/\" target=\"_blank\">Creative Commons</a> license.";
} elseif ($a=="-AP-" OR $a=="Justin Nichol") {
print "may be used under a <a href=\"http://creativecommons.org/licenses/by-sa/3.0\" target=\"_blank\">Creative Commons</a> license.";
} elseif (str_replace("GemFonts","XXX",$a)<>$a) {
print "is from a font, available for non-commercial use on the author's homepage.";
} elseif ($a=="Misha" OR $a=="Joakim Persson</a><br>(slightly altered)" OR $a=="-AP-</a><br>(cropped and altered)") {
print "may be used under an open license. See the item's <a href=\"http://".$h."\" target=\"_blank\">source page</a> for details.";
} elseif ($h=="public") {
print "is in the public domain as copyright has expired.";
} else {
print "may not be used without the permission of ";
if ($a=="David J. Stanley") {
print "David J. Stanley.";
} else {
print "the author.";
}
}
print "</div>";
print $line;
print $startdiv;
?>
<!-- Project Wonderful Ad Box Code -->
<div id="pw_adbox_1077_2_0"></div>
<!-- End Project Wonderful Ad Box Code -->
<?php


@include "http://www.apolitical.info/webgame/footer.txt";
?>
