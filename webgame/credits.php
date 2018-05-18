<?php
//error_reporting( E_ALL &~ E_NOTICE );
error_reporting( E_ALL ^ E_NOTICE );

//$baseurl="http://www.apolitical.info/webgame/";
$baseurl="http://localhost/aof/";
include($baseurl."header.txt");

$line="<div>&nbsp</div>";
$site=$baseurl."images/";
$startdiv="<div align=\"center\">";

$artists=array (
1=> array ("Azalea","raue-see.de.vu","dragonhead"),
2=> array ("Henning Ludvigsen","www.henningludvigsen.com","dwarf_tree"),
3=> array ("A. Daisy Lee","elfwood.lysator.liu.se/art/d/a/daisy4/daisy4.html","frogprince"),
4=> array ("H.J. Rian de Jong","h-johanna.deviantart.com","greeneye"),
5=> array ("Rowan Lee Hartsuiker","elfwood.lysator.liu.se/art/t/a/tayama/tayama.html","troll"),
6=> array ("Devon Jopling","elfwood.lysator.liu.se/art/j/o/jopling/jopling.html","threeslugs"),
7=> array ("Christopher A Malidore","www.artisticways.com","angergods"),
8=> array ("Pille Heero","elfwood.lysator.liu.se/art/k/e/kesteine/kesteine.html","dragon"),
9=> array ("Patrik Almqvist","elfwood.lysator.liu.se/art/p/a/patrik/patrik.html","work"),
10=> array ("Jenni Chasteen","jeneni.whatthegeek.com","stage"),
11=> array ("Peter Town","elfwood.lysator.liu.se/art/p/t/ptown/ptown.htm","ship"),
12=> array ("Michael Yazijian","www.mikeyaz.com","rogue"),
13=> array ("Mark Huffman","elfwood.lysator.liu.se/art/a/u/auralius/auralius.html","brute"),
14=> array ("Tracy Butler","www.foxprints.com","witches"),
15=> array ("John Frederick Lewis","public","city"),
16=> array ("Frederick Goodall","public","street1"),
17=> array ("Victor Carabain","public","harbour"),
18=> array ("Thomas Cooper Gotch","public","witch"),
19=> array ("Vilja Väisänen","hyel.thedanamark.net","branch"),
20=> array ("Frederick Ferdinand Schafer","public","forest"),
21=> array ("Hans Wichman","www.screatoris.net","swamp"),
22=> array ("Joanna M. Bromley","jbrommers.deviantart.com/gallery","fairies"),
23=> array ("unknown Byzantine artist","public","karrakara"),
24=> array ("Jean-Léon Gérôme","public","apprentice"),
25=> array ("Crystal Rose","redheaded-step-child.deviantart.com","priestess"),
26=> array ("John Singer Sargent","public","dusk"),
27=> array ("Irene Bagiacchi","elfwood.lysator.liu.se/art/b/a/bagiacchi/bagiacchi.html","planet"),
28=> array ("Mattias Snygg","www.mattiassnygg.com","space"),
29=> array ("Ivan Aivazovsky<br>(altered)","public","storm"),
30=> array ("al-Idrisi","public","map"),
31=> array ("Rene Magritte","public","castleair"),
32=> array ("Maryam Gousheh-Forgeot","www.spritewood.net","imp"),
33=> array ("Edward Lear<br>(slightly altered)","public","road"),
34=> array ("David Roberts","public","gods"),
35=> array ("Astrid Castle","www.thecatnip.com","shopkeep"),
36=> array ("Steve Argyle","www.steveargyle.com","gob"),
37=> array ("Eric Martin","www.epilogue.net/cgi/database/art/list.pl?gallery=5398","farm"),
38=> array ("Gunvor Paludan","elfwood.lysator.liu.se/art/t/e/teddybeer/teddybeer.html","sunrise"),
39=> array ("Alex Elie","seabird.deviantart.com","bird"),
40=> array ("Pascal Etienne","lagarie.free.fr","tower"),
41=> array ("Leon Belly","public","crowd"),
42=> array ("Frederick Goodall<br>(slightly altered)","public","nomad"),
43=> array ("Jean-Léon Gérôme","public","fur"),
44=> array ("John Frederick Lewis","public","square1"),
45=> array ("Hélène Brunton","elfwood.lysator.liu.se/art/h/b/hbruneton/hbruneton.html","landscape"),
46=> array ("George Catlin","public","warrior"),
47=> array ("George Catlin","public","village"),
48=> array ("Ember Black","kibs-0.deviantart.com","wisewoman"),
49=> array ("Ashley Applegate","wolvesrealmstudio.tripod.com/Home.html","unicorn"),
50=> array ("Nemo (Alana Jane King)","www.celticblack.deviantart.com","griffin"),
51=> array ("Pilikia (Sue Evans Ross)","www.steamtree.net","elf"),
52=> array ("Jean-Léon Gérôme","public","gladiator"),
53=> array ("Albert Bierstadt<br>(cropped)","public","wander"),
54=> array ("Nathan M. Rosario","elfwood.lysator.liu.se/art/n/m/nmros/nmros.html","hrothulf"),
55=> array ("Frederick Arthur Bridgman<br>(altered)","public","merchant"),
56=> array ("Timo Heikura","timett.deviantart.com","travellers"),
57=> array ("Stephanie Pui-Mun Law","www.shadowscapes.com","dockspriestess"),
58=> array ("Rene Magritte","public","fishwoman"),
59=> array ("Kaila Engar","corvidaeart.deviantart.com","deathhorse"),
60=> array ("Viktor Vasnetsov<br>(cropped and altered)","public","magiccarpet"),
61=> array ("José Posada<br>(slightly altered)","public","spider"),
62=> array ("José Posada<br>(slightly altered)","public","death"),
63=> array ("Ivan Bilibin","public","docks"),
64=> array ("Evgenia P. Petkova<br>aka Foxy Jenny","elfwood.lysator.liu.se/art/l/i/lisana/lisana.html","clearing"),
65=> array ("David Roberts<br>(slightly altered)","public","karra2"),
66=> array ("Jean-Léon Gérôme","public","street2"),
67=> array ("John William Waterhouse","public","mermaid"),
68=> array ("Theodor Kittelsen","public","forestpath"),
69=> array ("Arthur Rackham","public","goblins"),
70=> array ("Laura Pelick","www.fallenlights.net","forestqueen"),
71=> array ("Theodor Kittelsen","public","forestking"),
72=> array ("Johnathan L Bingham","www.johnathanbinghamart.com","dragonslayers"),
73=> array ("Nomi (Hannah Schmidt)","phenomi.deviantart.com","foxwoman"),
74=> array ("-AP-","opengameart.org/content/miscellaneous-concept-art","cave"),
75=> array ("Manon Yapari","www.manonyapari.com","pearl"),
76=> array ("Malcolm Brown","mbfantasyworld.mysite.wanadoo-members.co.uk","child"),
77=> array ("Vitaly Alexius Samarin","www.svitart.com","darkness"),
78=> array ("James McPartlin","www.jamesmcpartlin.com","beguiling"),
79=> array ("Jon O'Mara Yuen Harrison","elfwood.lysator.liu.se/art/h/a/harroj/harroj.html","creature"),
80=> array ("Mats Minnhagen","elfwood.lysator.liu.se/art/m/i/minnhagen/minnhagen.html","battle"),
81=> array ("Johan Tri Handoyo","johantri.deviantart.com","fairyvillage"),
82=> array ("Christina Marie DeLong","elfwood.lysator.liu.se/art/c/h/christimarie/christimarie.html","catspider"),
83=> array ("Jenny Dolfen","www.goldseven.de","elfexile"),
84=> array ("Doug D. Pham","elfwood.lysator.liu.se/art/d/d/ddpham/ddpham.html","pirateelf"),
85=> array ("Kiri Oestergaard","elfwood.lysator.liu.se/art/s/p/spajk/spajk.html","wildwoman"),
86=> array ("Véronique Comeau","verokomo.deviantart.com","zareth"),
87=> array ("unknown artist<br>(slightly altered)","public","wilddog"),
88=> array ("Johnathan L Bingham","www.johnathanbinghamart.com","nara"),
89=> array ("Johnathan L Bingham","www.johnathanbinghamart.com","ritual"),
90=> array ("Giovanni Piranesi<br>(slightly altered)","public","sewer"),
91=> array ("unknown artist","public","town"),
92=> array ("Sophie Anderson","public","swanroad"),
93=> array ("Fernand Khnopff","public","cryer"),
94=> array ("Anzo","totemdog.com/zen","winged"),
95=> array ("Anzo","totemdog.com/zen","elephant"),
96=> array ("unknown artist","public","catpiano"),
97=> array ("Martin Heemskerck<br>(slightly altered)","public","statue"),
98=> array ("John Everett Millais","public","drowned"),
99=> array ("Louis Moe<br>(slightly altered)","public","wizard"),
100=> array ("Édouard Manet","public","raven"),
101=> array ("unknown artist","public","faust"),
102=> array ("Dominique Crouzet","dcrouzet.chez-alice.fr","guard"),
103=> array ("Giovanni Piranesi","public","pyramid"),
104=> array ("Peter Mullen","www.freewebs.com/mullenart","tunnel"),
105=> array ("Howard Pyle","public","plank"),
106=> array ("Lawrence Alma-Tadema","public","latpriestess"),
107=> array ("unknown artist","public","outtosea"),
108=> array ("unknown artist","public","dancers"),
109=> array ("Ricardo Almendáriz","public","walls"),
110=> array ("Viktor Vasnetsov","public","wolf"),
111=> array ("H. Lee","public","sheeptree"),
112=> array ("Albrecht Dürer","public","rhino"),
113=> array ("Christian Krohg","public","captive"),
114=> array ("Armand Welcker","public","flyer"),
115=> array ("unknown artist<br>(slightly altered)","public","highjohn"),
116=> array ("N.C. Wyeth","public","flying"),
117=> array ("N.C. Wyeth","public","magician"),
118=> array ("Dominique Crouzet","dcrouzet.chez-alice.fr","reader"),
119=> array ("Peter Seckler","public","revengefrog"),
120=> array ("Peter Seckler","public","ratperson"),
121=> array ("Jean-Léon Gérôme","public","client"),
122=> array ("Scott Harshbarger","www.harshweb.com","gobguards"),
123=> array ("Emmanuel Roudier","roudier-neandertal.blogspot.com","bearman"),
124=> array ("Willy Pogany","public","square2"),
125=> array ("Willy Pogany","public","square3"),
126=> array ("Gustav Bauernfeind","public","streetsell"),
127=> array ("Jules Laurens<br>(altered)","public","snow"),
128=> array ("Frederick Catherwood","public","temples"),
129=> array ("unknown artist<br>(slightly altered)","public","walled"),
130=> array ("Caspar David Friedrich","public","ruins"),
131=> array ("Dominique Signoret</a><br>(slightly altered)","dominique.signoret.perso.sfr.fr/Index.html","cthulhu"),
132=> array ("Leonardo da Vinci","public","homeless"),
133=> array ("Louis Rhead","public","nobles"),
134=> array ("Louis Rhead","public","carry"),
135=> array ("T. Jordan Peacock","greywolf.critter.net/fonts.htm","book"),
136=> array ("Massimo Lazzari","public","cards"),
137=> array ("J.J. Grandville<br>(slightly altered)","public","bridge"),
138=> array ("GemFonts<br>(Graham Meade)","moorstation.org/typoasis/designers/gemnew/home.htm","slaver"),
139=> array ("GemFonts<br>(Graham Meade)</a><br>(slightly altered)","moorstation.org/typoasis/designers/gemnew/home.htm","priest"),
140=> array ("George du Maurier","public","lodge"),
141=> array ("Caspar David Friedrich<br>(slightly altered)","public","snowruin"),
142=> array ("Alphonse Mucha","public","mpriestess"),
143=> array ("Steve Zieser","curmudgeonsdragons.blogspot.com","gnome"),
144=> array ("Tavik Simon","public","square"),
145=> array ("unknown artist","public","river"),
146=> array ("Thomas Mackenzie","public","foresthut"),
147=> array ("Howard Pyle","public","judge"),
148=> array ("Howard Pyle","public","mermaidsong"),
149=> array ("Arthur Rackham","public","froghawker"),
150=> array ("Harry Clarke","public","youngman"),
151=> array ("GemFonts<br>(Graham Meade)","moorstation.org/typoasis/designers/gemnew/home.htm","sick"),
152=> array ("Herrad von Landsberg","public","hell"),
153=> array ("James Hutchings","public","tapestry"),
154=> array ("Kris Jacque","www.krisjacque.com","goblinsun"),
155=> array ("Kevin Mayle","www.cafepress.com/kevinmayle","kmdril"),
156=> array ("Thomas Seddon","public","sunset"),
157=> array ("Herbert Roe</a><br>(slightly altered)","en.wikipedia.org/wiki/User:Heironymous_Rowe","wvillage"),
158=> array ("Herbert Roe","en.wikipedia.org/wiki/User:Heironymous_Rowe","clowns"),
159=> array ("Vincent Baker","www.lumpley.com","wedding"),
160=> array ("Jensen","mokkurkalfe.deviantart.com","adventurers"),
161=> array ("Flaxton</a><br>(cropped and altered)","en.wikipedia.org/wiki/User:Flaxton","tripods"),
162=> array ("David J. Stanley","www.brutalrpg.com","beetleguard"),
163=> array ("unknown artist","public","strangemount"),
164=> array ("unknown artist","public","redbeast"),
165=> array ("Frederick Goodall<br>(altered)","public","ozyend"),
166=> array ("Herbert James Draper","public","rescue"),
167=> array ("Kawanabe Kyosai","public","hell2"),
168=> array ("Alexander Wilson<br>(cropped and altered)","public","flight"),
169=> array ("Olaus Magnus<br>(altered)","public","land"),
170=> array ("Olaus Magnus","public","island"),
171=> array ("Gustav Klimt<br>(cropped and altered)","public","amazon"),
172=> array ("Frank Godwin","public","queen"),
173=> array ("Martin Heemskerck","public","amacity"),
174=> array ("Balage Balogh","www.balage4art.com","street3"),
175=> array ("H.J. Ford","public","gethorse"),
176=> array ("H.J. Ford<br>(cropped and altered)","public","turtleman"),
177=> array ("Balage Balogh","www.balage4art.com","courtyard"),
178=> array ("Francesco del Cossa","public","eyes"),
179=> array ("Seth Poppy","spoppy.com","street4"),
180=> array ("Seth Poppy","spoppy.com","aircreature"),
181=> array ("N.C. Wyeth","public","robbers"),
182=> array ("Theodor Kittelsen","public","bearprincess"),
183=> array ("Joakim Persson</a><br>(slightly altered)","opengameart.org/content/fortress-backgroundstoryboard-image","exit"),
184=> array ("Misha","opengameart.org/content/orc-002-concept","guide"),
185=> array ("Zeldyn","zeldyn.deviantart.com","youngelf"),
186=> array ("Adriaen van de Venne</a><br>(cropped and altered)","public","owls"),
187=> array ("Gallegos","gallegosart.com","devil"),
188=> array ("-AP-</a><br>(cropped and altered)","opengameart.org/content/sos-at-sea","leaveship"),
189=> array ("Brian Crick","www.oogby.com","archer"),
190=> array ("Mark Allen","www.marjasall.com","moving"),
191=> array ("unknown author","public","page"),
192=> array ("Gallegos","gallegosart.com","bouncer"),
193=> array ("Gallegos","gallegosart.com","croupier"),
194=> array ("Steveman","neuroticfanboy.deviantart.com","bee"),
195=> array ("Odilon Redon","public","skin"),
196=> array ("Odilon Redon","public","spiderhead"),
197=> array ("Dominique Signoret</a><br>(slightly altered)","dominique.signoret.perso.sfr.fr/Index.html","evilgod"),
198=> array ("Louis Wain","public","catgod"),
199=> array ("Alexandre Togeiro","alexandretogeiro.blogspot.com","horsewoman"),
200=> array ("-AP-","opengameart.org/content/miscellaneous-concept-art","stair"),
201=> array ("Virginia Roper","www.varoper.com","baretrees"),
202=> array ("Drawings and Dragons","drawingsanddragons.blogspot.com","femalepirate"),
203=> array ("unknown artist","public","darkman"),
204=> array ("Eli Arndt</a><br>(slightly altered)","leadpeople.blogspot.com","guard2"),
205=> array ("Michael Rasmussen","www.boardgamegeek.com/user/cauldronborn","backstreet"),
206=> array ("Joe Alterio</a><br>(cropped)","www.joealterio.com","emperor"),
207=> array ("Jacob Green","fullmetalbot.blogspot.com","swordsman"),
208=> array ("Justin Nichol","opengameart.org/content/death-in-the-snow","snowskull"),
209=> array ("unknown artist","public","atnos"),
210=> array ("Kelvin Green</a><br>(slightly altered)","junkopia.net/kelvinsdirtybits","bigguard"),
211=> array ("Storn A. Cook","www.stornart.com","cpede"),
);
$artworks=211;

print $startdiv."The following people have contributed to <a href=\"http://www.apolitical.info/webgame\" onMouseover=\"window.status='back to the starting page'; return true\">Age of Fable</a>:";
print $line;
print $line;
print $startdiv."<b>Your adventures were faithfully chronicled</div>";
print $startdiv."with nothing false set down, nor anything true omitted,</b></div>";
print $startdiv."by <a href=\"http://www.apolitical.info/teleleli\" target=\"_blank\">James Hutchings</a>.</div>";
print $line;
print $line;
print $startdiv."<b>The people, places, gods and monsters";
print $startdiv."of Karrakara and the islands around have been accurately depicted by the following artists.</b></div>";
print $line;
print $startdiv."Thanks are due to these artists for permission to use their work.</div>";
print $startdiv."each of these miniatures must be unlocked by the cunning use of an arrow, and a mouse.</div>";
print $startdiv."do so to the picture, to see a larger version,</div>";
print $startdiv."or to the artist's name to visit them.</div>";
print $line;
print "<table align=\"center\"><tr>";
$row=0;
for ($loop=1;$loop<=$artworks;$loop++) {
if ($artists[$loop][1]<>"public" OR $artists[$loop][0]=="Peter Seckler" OR $artists[$loop][0]=="James Hutchings") {
print "<td align=\"center\">";
$name=$artists[$loop][0];
print "<a href=\"".$baseurl."gallery.php?p=".$artists[$loop][2]."&a=".$artists[$loop][0]."&h=".$artists[$loop][1]."\" onMouseover=\"window.status='see a bigger version of this picture'; return true\">";
print "<img style=\"border-color: #8888FF\" src=\"".$site.$artists[$loop][2]."-thumb.jpg\">";
print "</a>";
print "<br>";
if ($name=="David J. Stanley") {
print "owned and licensed<br>by ";
}
if ($name<>"Peter Seckler" AND $name<>"James Hutchings") {
print "<a href=\"http://".$artists[$loop][1]."\" target=\"_blank\">";
}
print $name;
if ($name=="Peter Seckler") {
print "<br><a href=\"http://creativecommons.org/licenses/by/3.0/us\" target=\"_blank\">license";
} elseif ($name=="Scott Harshbarger" OR $name=="Zeldyn" OR $name=="Gallegos") {
print "</a><br><a href=\"http://creativecommons.org/licenses/by-nc-nd/3.0\" target=\"_blank\">license";
} elseif ($name=="Seth Poppy" OR $name=="Storn A. Cook") {
print "</a><br><a href=\"http://creativecommons.org/licenses/by-nc-sa/3.0\" target=\"_blank\">license";
} elseif ($name=="Kris Jacque") {
print "</a><br><a href=\"http://creativecommons.org/licenses/by-nc-nd/3.0/us\" target=\"_blank\">license";
} elseif ($name=="-AP-" OR $name=="Justin Nichol") {
print "</a><br><a href=\"http://creativecommons.org/licenses/by-sa/3.0\" target=\"_blank\">license";
} elseif ($name=="Dominique Signoret</a><br>(slightly altered)" OR str_replace("Herbert Roe","XXX",$name)<>$name OR $name=="Flaxton</a></br>(cropped and altered)") {
print "<br><a href=\"http://commons.wikimedia.org/wiki/Commons:GNU_Free_Documentation_License\" target=\"_blank\">license";
} elseif ($name=="James Hutchings") {
print "<br>created using the <br><a href=\"http://www.adgame-wonderland.de/type/bayeux.php\" target=\"_blank\">Historic Tale Construction Kit";
}
print "</a>";
if ($name=="David J. Stanley") {
print "<br>illustration by<br>David K. Wong";
}
print "</td>";
$row++;
if ($row==5) {
$row=0;
print "</tr><tr>";
}
}
}
print "</tr></table>";
print $line;
print $startdiv."The pictures in the letters at the start of the game are by <a href=\"http://dcrouzet.chez-alice.fr\" target=\"_blank\">Dominique Crouzet</a>.</div>";
print $line;
print $line;
print $startdiv."This artwork is in the public domain:";
print $line;
print "<table align=\"center\"><tr>";
$row=0;
for ($loop=1;$loop<=$artworks;$loop++) {
if ($artists[$loop][1]=="public" AND $artists[$loop][0]<>"Peter Seckler" AND $artists[$loop][0]<>"James Hutchings") {
print "<td align=\"center\">";
print "<a href=\"".$baseurl."gallery.php?p=".$artists[$loop][2]."&a=".$artists[$loop][0]."&h=public\" onMouseover=\"window.status='see a bigger version of this picture'; return true\">";
print "<img style=\"border-color: #8888FF\" src=\"".$site.$artists[$loop][2]."-thumb.jpg\">";
print "</a>";
print "<br>";
print $artists[$loop][0];
print "</td>";
$row++;
if ($row==5) {
$row=0;
print "</tr><tr>";
}
}
}
print "</tr></table>";
print $line;
print $line;
print $startdiv."<b>Many things which were foretold have come to pass.</b></div>";
print $startdiv."The idea for the oasis on the horizon by <a href=\"http://thefreerpgblog.blogspot.com\" target=\"_blank\">Rob Lang</a>.</div>";
print $startdiv."Gnome named by Nadia Menon.</div>";
print $startdiv."The description of the pyramid taken from Robert E. Howard.</div>";
print $startdiv."Cthulhu invented by H.P. Lovecraft.</div>";
print $startdiv."The rebel's speech by <a href=\"http://en.wikipedia.org/wiki/John Ball (priest)\" target=\"_blank\">John Ball</a>.</div>";
print $startdiv."The cryer's chant by Percy Shelley</a>.</div>";
print $startdiv."The idea of Janooth by the <a href=\"http://www.vitalspot.f9.co.uk\" target=\"_blank\">Vital Spot</a>.</div>";
print $startdiv."The original idea of the Hollow Mockery by <a href=\"http://www.myspace.com/phoenixofborg\" target=\"_blank\">Phoenix Talion</a>.</div>";
print $startdiv."The phrase 'Ape-Rajahs' is inspired by <a href=\"http://www222.pair.com/sjohn/encounter-critical.htm\" target=\"_blank\">Encounter Critical</a>.</div>";
print $startdiv."Prince Dimitri originally inspired by a character in the Fabled Lands series.</div>";
print $startdiv."The mad goblin inspired by the Fabled Lands series. His speech by <a href=\"http://en.wikipedia.org/wiki/Thomas de Quincey\" target=\"_blank\">Thomas de Quincey</a> (slightly adapted).</div>";
print $startdiv."The rating system for ghosts by <a href=\"http://www.nonadventures.com\" target=\"_blank\">Justin Pierce</a>.</div>";
print $startdiv."'The Crows Call My Name' from an idea by Jack Handey.</div>";
print $startdiv."The living door inspired by a similar feature in the Tunnels and Trolls paperback rules.</div>";
print $startdiv."Dead Eye Street inspired by Forever Street and Nowhere Lane in the Fighting Fantasy series.</div>";
print $startdiv."The description of the smoke in the pyramid based on the D&D module 'White Plume Mountain'.</div>";
print $startdiv."The gods in the pyramid are based on Lolth from D&D, and Yag-kosha from <a href=\"http://www.apolitical.info/webgame/tower.php\">The Tower of the Elephant</a>.</div>";
print $line;
print $startdiv;
?>
<!-- Project Wonderful Ad Box Code -->
<div id="pw_adbox_1077_2_0"></div>
<!-- End Project Wonderful Ad Box Code -->
<?php

print $line;
@include "http://www.apolitical.info/webgame/footer.txt";
?>
