window.GAME_DATA_KEYWORDS = [
  {
    "id": 0,
    "name": "last thing printed was black text."
  },
  {
    "id": 1,
    "name": "26: dwarves. Leads to 299."
  },
  {
    "id": 2,
    "name": "free choice - slot 2 is number of choices, then text and number of each in turn."
  },
  {
    "id": 3,
    "name": "saving roll - slot 2 is which attribute (string) slot 3 is difficulty slot 4 is success para slot 5 is failure para if you succeed by 5 or more, make an advancement roll ie roll 1d20 and gain 1 of relevant attribute if roll is over your score in that attribute."
  },
  {
    "id": 4,
    "name": "random branching - slot 2 = how many options, then paragraph for each"
  },
  {
    "id": 5,
    "name": "does character have an item - slot 2 - which item slot 3 - para if do have it slot 4 - para if don't"
  },
  {
    "id": 6,
    "name": "as 5, but for a keyword rather than an item branches from here on all adjust variables, and all lead on to only 1 paragraph."
  },
  {
    "id": 7,
    "name": "gain or lose an item - slot 2 is which item 3 is 0 to lose or 1 to gain 4 is new para"
  },
  {
    "id": 8,
    "name": "as 7, but for a keyword rather than an item."
  },
  {
    "id": 9,
    "name": "change to attributes - slot 2 is which attribute (string) 3 is change 4 is new para"
  },
  {
    "id": 10,
    "name": "change to shells - slot 2 is change, slot 3 is new para"
  },
  {
    "id": 11,
    "name": "shell check - slot 2 is minimum shells slot 3 is para if you have at least that much slot 4 is para if you don't"
  },
  {
    "id": 12,
    "name": "multiple saves - slot 2 is how many slot 3 is difficulty 4 to (3 + slot 2) names of attributes (4 + slot 2) to (4 + 2 * slot 2) destinations: failed all, made 1,2 etc"
  },
  {
    "id": 13,
    "name": "'click to continue' - slot 2 is destination."
  },
  {
    "id": 14,
    "name": "gain a blessing - slot 2 is which one (text), or 'random' for a random one slot 3 is new paragraph"
  },
  {
    "id": 15,
    "name": "blessing check - only checks non-attribute ones slot 2 is which one (text) slot 3 is para if do have it (only check non-attribute ones) (-1 if do so) slot 4 is para if don't have it"
  },
  {
    "id": 16,
    "name": "branching based on profession slot 2 is the number of a profession slot 3 is the destination if you have that profession slot 4 is the destination if you have any other profession"
  },
  {
    "id": 17,
    "name": "free choice, but some choices may depend on having keywords slot 2 is the maximum number of choices then for each choice, text, number - +ve number +1000 if requires keyword to =0 (eg 1020 means 'display this choice if you don't have keyword 20') +ve number if keyword '0' if no requirement (ie if this choice always appears) -ve number if it requires an item/companion -ve number -100 if it requires you NOT to have an item/companion (eg -110 means 'display this choice if you don't have item #10') & finally destination for that choice"
  },
  {
    "id": 18,
    "name": "lose all companions [special exception for cat when a frog] slot 2 = destination."
  },
  {
    "id": 19,
    "name": "'I haven't written this yet' message."
  },
  {
    "id": 20,
    "name": "level check slot 2 is a level slot 3 is destination if you're at least that level slot 4 is destination if not."
  },
  {
    "id": 21,
    "name": "special: change attribute named in slot 2 to equal attribute named in slot 3 destination is slot 4 (used in forest well encounter)"
  },
  {
    "id": 22,
    "name": "special: becomes shell check, against random no (1-99) slot 2 is empty slot 3 is destination if make it slot 4 is destination if don't"
  },
  {
    "id": 23,
    "name": "special: change profession randomly (from the Well of New Life) slot 2 is destination"
  },
  {
    "id": 24,
    "name": "special: change profession to 0 (clown) (from meeting clowns) slot 2 is destination"
  },
  {
    "id": 25,
    "name": "winning end. The same as 0 except your attributes are shown."
  },
  {
    "id": 26,
    "name": "have been gladiator and *must* go back (won, failed Heroism roll) if you 'drop out' of being a gladiator, 25 & 26 set to zero."
  },
  {
    "id": 27,
    "name": "got taught the job code (maybe easier to find next time)"
  },
  {
    "id": 28,
    "name": "had the chance to take small witch quest"
  },
  {
    "id": 29,
    "name": "on witches quest"
  },
  {
    "id": 30,
    "name": ": docking your boat at Karrakara -"
  },
  {
    "id": 31,
    "name": "boat is hidden in swamp"
  },
  {
    "id": 32,
    "name": "boat is definitely stolen from swamp (left it too long) however won't lose keyword 1 until you look for it or give up on it altogether."
  },
  {
    "id": 33,
    "name": "have had the chance to see fairies in swamp (whether did or not)"
  },
  {
    "id": 34,
    "name": "someone stole your boat and you now know it (may meet them later)"
  },
  {
    "id": 35,
    "name": "opened bundle - easier to sell it."
  },
  {
    "id": 36,
    "name": "can't steal, city guard on alert (because stole before, or because of street preacher)"
  },
  {
    "id": 37,
    "name": "tried to rob assassin woman, will kill you if happens again"
  },
  {
    "id": 38,
    "name": "robbed temple of black pearl"
  },
  {
    "id": 39,
    "name": "tried to rob fighting merchant"
  },
  {
    "id": 40,
    "name": "you're a murderer"
  },
  {
    "id": 41,
    "name": "have visited 'space' island"
  },
  {
    "id": 42,
    "name": "have met space people"
  },
  {
    "id": 43,
    "name": "stole from space people, or were caught leaving ship"
  },
  {
    "id": 44,
    "name": "stood guard for space people (if fail charisma roll can have 42 but neither of 43 or 44)"
  },
  {
    "id": 45,
    "name": "had opportunity to leave spaceship"
  },
  {
    "id": 46,
    "name": "'check on boat in swamp' flag. Makes sure you don't have to do this twice in a row."
  },
  {
    "id": 47,
    "name": "wounded in the shoulder. (later, may lose this keyword if make a Healing roll or at the Street of the Gods)"
  },
  {
    "id": 48,
    "name": "saw alien on small planet (may not have talked to it)"
  },
  {
    "id": 49,
    "name": "know how to fly ship (because alien taught you)"
  },
  {
    "id": 50,
    "name": "67 : meet the Frog (leads to 299/301 if you're still human, or 69 if a frog) was a 55 and a 56 but changed it."
  },
  {
    "id": 51,
    "name": "met street preacher in city"
  },
  {
    "id": 52,
    "name": "gave shell to street preacher in city, or won argument. if set out to sea, get free blessing, set to zero."
  },
  {
    "id": 53,
    "name": "have found courage shop in city this means CANT find it again by wandering but CAN try and find it if have no shells, or if fail heroism roll and have enough shells to buy some. if try to find it and fail, this is reset to 0"
  },
  {
    "id": 54,
    "name": "came across 'John Ball' preacher in city (even if walked on)"
  },
  {
    "id": 55,
    "name": "listened to this preacher (54 used when exploring city, 55 if leave city and find in camp) if you hear speech in the camp, you get kewords 54 AND 55, so you won't come across the preacher in the city."
  },
  {
    "id": 56,
    "name": "on JB side"
  },
  {
    "id": 57,
    "name": "against JB (if walked on, don't get either of these)"
  },
  {
    "id": 58,
    "name": "'won' argument re street preacher"
  },
  {
    "id": 59,
    "name": "in forest: 'hungry' flag. this encounter is repeatable, but has this flag so you're less likely to get it twice in a row."
  },
  {
    "id": 60,
    "name": "have met goblin at inn"
  },
  {
    "id": 61,
    "name": "helped goblin (gave shells, told about slug woman, or successfully blessed him). whether can have encounter: at inn: not if keyword 60 OR 61 if 123, message not sure, but think recognise him from Karrakara in Karrakara: not if 123 OR 61 if 60, message that not sure, but think recognise him from inn"
  },
  {
    "id": 62,
    "name": "met warrior, but didn't tell the goblin about her."
  },
  {
    "id": 63,
    "name": "outside of Karrakara, have seen fire with men (won't be there next time)"
  },
  {
    "id": 64,
    "name": "threatened man (more likely to be stolen from in your sleep)"
  },
  {
    "id": 65,
    "name": "lost in forest from leaving Karrakara."
  },
  {
    "id": 66,
    "name": "you've had the opportunity to buy from the fur trader."
  },
  {
    "id": 67,
    "name": "met the caravan in the desert."
  },
  {
    "id": 68,
    "name": "found the tower"
  },
  {
    "id": 69,
    "name": "98 : being a frog she'll be removed anyway, but not if the cat kills you first. 71 edited out. 88 edited out. 92 edited out."
  },
  {
    "id": 70,
    "name": "you've found the street of the gods this means you can't find it by wandering, but you can go back by choice."
  },
  {
    "id": 71,
    "name": "you're in contact with magician's apprentice (several ways to get this keyword)"
  },
  {
    "id": 72,
    "name": "Karra frog flag - this is set to 1 each time the frog asks if you're going to help him. If it's set to 1, it's set to zero instead of it asking again (thus doesn't ask twice in a row)."
  },
  {
    "id": 73,
    "name": "you are on the quest to find Janooth."
  },
  {
    "id": 74,
    "name": "have dealt with frog ie won't come across him again."
  },
  {
    "id": 75,
    "name": "have had 'talking frog for sale in city' encounter (ie this happens only once)"
  },
  {
    "id": 76,
    "name": "trying to sell horse: have had offer from noble"
  },
  {
    "id": 77,
    "name": "trying to sell horse: have had offer from butcher"
  },
  {
    "id": 78,
    "name": "have met the Lurker in the sewer"
  },
  {
    "id": 79,
    "name": "you're in the sewers escaping from jail"
  },
  {
    "id": 80,
    "name": "human-form Owyth has told you about desert ghouls"
  },
  {
    "id": 81,
    "name": "have had your chance to get job offer to kill someone (may not have had the actual offer, if not assassin or rogue and fail rolls) this is also set to 1 if go to encounter from Street of Gods"
  },
  {
    "id": 82,
    "name": "successfully completed it (may lead to other encounters eg being blackmailed)"
  },
  {
    "id": 83,
    "name": "have completed first bit of gladiator story (up to offer to sell imp) this is used if in prison etc, may be forced into gladiator life if haven't done it before."
  },
  {
    "id": 84,
    "name": "sold imp to gladiator owner"
  },
  {
    "id": 85,
    "name": "have left human-form Owyth back in Karrakara."
  },
  {
    "id": 86,
    "name": "...and he's minding horse"
  },
  {
    "id": 87,
    "name": "...and he's minding unicorn (85 will =1 if 86 or 87 do)"
  },
  {
    "id": 88,
    "name": "you've had the miscellaneous street seller encounter"
  },
  {
    "id": 89,
    "name": "have had chance to hear about black pearl when moving boxes"
  },
  {
    "id": 90,
    "name": "actually have heard"
  },
  {
    "id": 91,
    "name": "got chance to buy back imp (whether did or not)"
  },
  {
    "id": 92,
    "name": "you made the Streetwise roll to recognise that Serene Dreams' owner is conning you."
  },
  {
    "id": 93,
    "name": "you made the Heroism roll such that you have a choice not to go to fights in other cities."
  },
  {
    "id": 94,
    "name": "you're on your way to the training camp, directly from city."
  },
  {
    "id": 95,
    "name": "have met goblin and boy travellers outside of Karrakara"
  },
  {
    "id": 96,
    "name": "you've found the docks (can't find it by wandering again, but have the choice to visit it)."
  },
  {
    "id": 97,
    "name": "a new boat will cost you 10 or 15 gp respectively, or 20 if you have neither keyword."
  },
  {
    "id": 98,
    "name": "a new boat will cost you 10 or 15 gp respectively, or 20 if you have neither keyword."
  },
  {
    "id": 99,
    "name": "122 : Slugs (leads to 299/301)"
  },
  {
    "id": 100,
    "name": "you may barter for a boat instead."
  },
  {
    "id": 101,
    "name": "took up the offer, or went there from Street of the Gods"
  },
  {
    "id": 102,
    "name": "you've examined the fish woman's body"
  },
  {
    "id": 103,
    "name": "made no raft both 13 and 14 are set to zero and 103 to 1 when you come to island because it's possible to return."
  },
  {
    "id": 104,
    "name": "you've met the death horse (2 seperate encounters)"
  },
  {
    "id": 105,
    "name": "you're meeting death horse via forest"
  },
  {
    "id": 106,
    "name": "resistance to poison from death horse"
  },
  {
    "id": 107,
    "name": "you're meeting death horse returning from Janooth. (if not it's by general travel)"
  },
  {
    "id": 108,
    "name": "you've met prince dimitri for the first time"
  },
  {
    "id": 109,
    "name": "you've met prince dimitri for the second time"
  },
  {
    "id": 110,
    "name": "you've had forest pool (heroism/charisma) encounter"
  },
  {
    "id": 111,
    "name": "you've met the mermaid."
  },
  {
    "id": 112,
    "name": "great swimmer/can't drown."
  },
  {
    "id": 113,
    "name": "you've had the goblins encounter"
  },
  {
    "id": 114,
    "name": "you can ask the goblins whether there's anything you can do"
  },
  {
    "id": 115,
    "name": "the goblins have told you (ie you can go on mission below)"
  },
  {
    "id": 116,
    "name": "you've been on the forest King/Queen mission (whether succeeded or not)"
  },
  {
    "id": 117,
    "name": "you successfully completed this (maybe can recruit goblins later for/against rebels)"
  },
  {
    "id": 118,
    "name": "you're on Forest King/Queen mission for Dahlia in particular"
  },
  {
    "id": 119,
    "name": "you've bought the blessing from the village wise woman (ie can't buy it again)"
  },
  {
    "id": 120,
    "name": "you've had the forest unicorn encounter"
  },
  {
    "id": 121,
    "name": "you've had the forest giant houses 'encounter'"
  },
  {
    "id": 122,
    "name": "you've had the neckweasels encounter"
  },
  {
    "id": 123,
    "name": "131 : overflow from 'being a frog' encounter 69-98"
  },
  {
    "id": 124,
    "name": "met laughing market peasant"
  },
  {
    "id": 125,
    "name": "you've found the Well of New Life"
  },
  {
    "id": 126,
    "name": "you've had the 1st 'Hail, O Kitty' message"
  },
  {
    "id": 127,
    "name": "'boiling sea' / Anhotep"
  },
  {
    "id": 128,
    "name": "you've worked out that it's Anthotep (extra heroism)"
  },
  {
    "id": 129,
    "name": "you've tried to work out what it is (can only do once)"
  },
  {
    "id": 130,
    "name": "you've had slow child encounter."
  },
  {
    "id": 131,
    "name": "temporary flags if you complete a relevant part, you get flag 131. 132,141 and 133 come about automatically in the main loop. encounters which may lead to ability to explore the sewers check for 131 to =0 (rather than 132 or 133)."
  },
  {
    "id": 132,
    "name": "temporary flags if you complete a relevant part, you get flag 131. 132,141 and 133 come about automatically in the main loop. encounters which may lead to ability to explore the sewers check for 131 to =0 (rather than 132 or 133)."
  },
  {
    "id": 133,
    "name": "you can explore the sewers in Karrakara. (set to 0 once you have)"
  },
  {
    "id": 134,
    "name": "you've had the 2nd one."
  },
  {
    "id": 135,
    "name": "you've gotten the bonus for being lizard man in desert."
  },
  {
    "id": 136,
    "name": "you're in the forest, going over the hills."
  },
  {
    "id": 137,
    "name": "you've met the 'weighing the heart' priest if you enter the pyramid, you also get this keyword. maybe change this later."
  },
  {
    "id": 138,
    "name": "you're on the quest to take vengeance on them"
  },
  {
    "id": 139,
    "name": "you've had the diseased town encounter"
  },
  {
    "id": 140,
    "name": ": in Karrakara, don't need money. if put anything else before Karrashell, because 'Gladconsider' goes to Karrashell if you decide not to go, change 'Gladconsider' ditto 'Gladiator8a' etc. this is the same as Karragov3b, except easier. this is the same as Karragov1a, except harder. this is to 'hide' result. you get both 108 and 109 here, because Prince Dimitri hasn't leant you any shells, so it would make no sense for him to appear again wanting them. pyramid island. back to Karrakara. Yag-Kosha island. fish-woman island. now fleeing by sea. this can be for not 'going straight', or because thought of treasure wears you down. the ones that go straight to Karrasewkey do so because you can't have keywords 193 and 194. you get keyword 74 (dealt with frog) as soon as get to village have the option to give up once you work out what to do with keywords. the above is just for special $streetbs variable. accept you if keyword 140 (helped people in town) Sewjoin2: charisma/heroism saves Sewjoin3: kill you if assassin, spell if pirate Sewjoin4: kill you if 150 (left cat woman), accept you if 151 (broke cat piano) Sewjoin 5: based on 'alignment' Sewjoin 6: accept you if you helped the preacher Sewjoin 7: accept you if you denounced the Seal of Approval Sewjoin8: Sewjoinfs if you're escaping from jail Sewjoin9: Accepted if you destroyed the slavers' camp Sewjoin10: Accepted if you made a rebel speech to the arena at Karsh. e1: noticeboard -> Dahlia Two Voices (if keyword 28=0) e2: meet imp (if keyword 50=0) e3: street preacher (if keyword 51=0 and at least 1 shell) e4: courage shop (if keyword 53=0) e5: John Ball preacher (if keyword 54=0) e6: fur trader (if keyword 66=0, and if have at least 5 shells, and if don't have any fur (from the sphinx) e7: street of the gods (if keyword 70=0) e8: talking frog for sale requires 5 shells, keyword 74 to be zero (ie haven't dealt with him already) item 4 to be zero (ie don't have him now) keyword 75 to be zero (ie haven't had this encounter) e9: miscellaneous market i) requires at least 10 shells ii) not keyword 88 iii) must lack at least one of black pearl, medallion, crown not Rod because may not be able to afford it. e10: docks requires 10 shells keyword 96 to be zero (ie haven't found it already) e11: mad goblin not if 123 OR 61 if 60, message that not sure, but think recognise him from inn e12: crying child, hence possibly into the sewers requires keywords 130 & 131 to be 0 maybe put another keyword later if there are other ways to get into the sewers. e13: cat piano e14: crows call my name e15: stage on fire e16: Hair Witch e17: Seal of Approval/catscan/spell checker e18: veangeful forest elf / frog e19: gamblers e20: gamblers come back e21: sweat lodge e22: find Dead Eye Street. e23: Daba temple. note that ...yn and ...ny are identical except for text. later change this so it could lead to Dahlia Two Voices. Rod isn't in this list, because may not be able to afford it. Karraseller3 missing option #6 later on, change the above bit so that it can happen anywhere in the market, or with fur, frog or imp seller. he offers to sell you the imp if: * you have at least 5gp * you have keyword 50 (you've met the imp) * you don't currently have the imp (item 10) * you don't have keyword 91 (already had chance) DOESN'T currently look at keyword 84 (if you sold imp to gladiator owner) maybe add in later that he takes revenge eg. or save vs charisma - if you make it lose heroism. 'Streetgods' = when you first find it 'Streetgods1' = when you visit it later. EXPAND THIS LATER EG ONE BASED ON STREET PREACHER. OR MAY TRY AND GET A BLESSING AND THEN NOT PAY. OR MAY GET RID OF MURDERER TAG. OR CURE FOR FROG. HAVE MORE OPTIONS FOR FAILING TO TRICK BLESSING AS WELL. add helmet as option to buy as well (helmet first). Fur1 missing option #3 Karrathief: has no keyword ie can happen more than once. prince dimitri encounter two travellers encounter ADD TO THIS ENCOUNTER. 1) opportunity to stay with men. 2) opportunity to *give* jb speech. 3) opportunity to counter jb speech with your own. four possibilities: Cryernewsa1 - Amazons worship of Averna. Cryernewsz - Ozymandias. Cryernewsl - Eddie Lizzard. Cryerskeptics1 - pollution in the area. Cryernewsaf is similar to Cryernewsa. The differences are i) Cryernewsa1f instead of Cryernewsa1 (Amazons) ii) Cryernewslf instead of Cryernewsl (Eddie Lizzard) note that Cryernewsa1f, if you don't have the keyword, goes to Cryerfreess1a, which doesn't give the opportunity to express skepticism or demand a refund. first, check if there's anything that you can get. If there isn't, go to Mdone. If there is, keep randomly generating until you get it. maybe expand this later so can rob the magician, in which case get rid of requirement to have 10 shells. could be turned into a frog. also maybe a mini-quest if you refuse. if you're agent of government, maybe they get you out and force you to go to 'final quest'. ditto maybe rebels bust you out (or maybe only if you're sentenced to death) when do them, add option of galley slave/gladiator. at the moment there's no need to check for the cryer as well as the town, but it's here anyway in case this changes in the future. you always get to the cryer before the diseased town. lotfmain is where everyone starts. lotfmaine is where the picture is displayed. these three are identical except for the pictures. the only way to get to lotf via the forest is if you have keyword 275 ('in clown village in forest'). otherwise keyword 308 sends you to Amacity, 312 sends you to Asleepss1, otherwise you're walking around the island. the above 2 differ only in their picture."
  },
  {
    "id": 141,
    "name": "temporary flags if you complete a relevant part, you get flag 131. 132,141 and 133 come about automatically in the main loop. encounters which may lead to ability to explore the sewers check for 131 to =0 (rather than 132 or 133)."
  },
  {
    "id": 142,
    "name": "you've had the swanroad encounter"
  },
  {
    "id": 143,
    "name": "you've been rowed across the river (have some encounters later that require this)"
  },
  {
    "id": 144,
    "name": "you've met the cryer and sphinx for the first time"
  },
  {
    "id": 145,
    "name": "you know about the Amazons"
  },
  {
    "id": 146,
    "name": "you know about plague from the cryer or from drinking the water (make this help in town)"
  },
  {
    "id": 147,
    "name": "you've pissed off or fought the cryer"
  },
  {
    "id": 148,
    "name": "you've had fig pun in forest"
  },
  {
    "id": 149,
    "name": ": begging EXPAND THIS so can be taken to jail, meet aliens if stole their ship. ie bards & courtesans: 1/3 chance of shells, no loss of heroism or stamina 1/3 chance of normal save but no loss of heroism or stamina 1/3 normal save and loss as for other professions. 'weighing the heart' encounter replace 13 with 1 if get permission to use picture, also mention lion priest in description. have other options later eg contact rebels in sewers if have met them, contact government if are anti-jb"
  },
  {
    "id": 150,
    "name": "you left cat piano woman (may make rebels not accept you)"
  },
  {
    "id": 151,
    "name": "you stopped cat piano woman (may make rebels accept you, might have bad consequences on Dead Eye Street)"
  },
  {
    "id": 152,
    "name": "'crows call my name' flag (probably no game effect, just flavour)"
  },
  {
    "id": 153,
    "name": "'river phoenix/forest gump' flag (again probably just flavour)"
  },
  {
    "id": 154,
    "name": "have seen world under the sea."
  },
  {
    "id": 155,
    "name": "saw the world from space"
  },
  {
    "id": 156,
    "name": "'flowers of karrakara' flag (just flavour)"
  },
  {
    "id": 157,
    "name": "you've tried to figure out world in sea (can only do once)"
  },
  {
    "id": 158,
    "name": "you've found the rebels in the sewer"
  },
  {
    "id": 159,
    "name": "you've joined the rebels in the sewer (whether sincerely or not). Can lose it if you're a scoundrel and seek them out when someone's after you."
  },
  {
    "id": 160,
    "name": "you've been completely lost in the sewer (so you don't have to do it twice)"
  },
  {
    "id": 161,
    "name": "you've informed on rebels, or made friends with wolf passengers who turn out to be connected to the government."
  },
  {
    "id": 162,
    "name": "'set stage on fire' flag (probably just flavour)"
  },
  {
    "id": 163,
    "name": "investigate"
  },
  {
    "id": 164,
    "name": "use magic to find out what happened"
  },
  {
    "id": 165,
    "name": "heal them"
  },
  {
    "id": 166,
    "name": "you've saved to see if you drink the water because you can go back to town, and if you leave then don't have to save again."
  },
  {
    "id": 167,
    "name": "you've been through the Ugly Forest"
  },
  {
    "id": 168,
    "name": "you've been to the fairy village ('Market')"
  },
  {
    "id": 169,
    "name": "you've had the 'gods of different pie' conversation."
  },
  {
    "id": 170,
    "name": ": end of 'witch bundle' mini-quest. (169 is finishing off witch turning you into frog)"
  },
  {
    "id": 171,
    "name": "you've had the choice to give shells to Numen Mari this is also set to 1 if you 'look up on the net' in Town"
  },
  {
    "id": 172,
    "name": "you tried to sneak away from them (arrested in fairy town)"
  },
  {
    "id": 173,
    "name": "the swamp key is definitely not for the door to Atnos (ie tried it - must be for Colossos itself)"
  },
  {
    "id": 174,
    "name": "helped the preacher against the guards."
  },
  {
    "id": 175,
    "name": "you've encountered the revulsion demon"
  },
  {
    "id": 176,
    "name": "you saw the way out of the forest by climbing a tree"
  },
  {
    "id": 177,
    "name": "you succeeded in tunneling out of cell"
  },
  {
    "id": 178,
    "name": "you failed in tunneling out of cell"
  },
  {
    "id": 179,
    "name": "you've walked around Atnos' walls and found the door"
  },
  {
    "id": 180,
    "name": "you're going back from failing at the colossos sub-quest"
  },
  {
    "id": 181,
    "name": "you have no boat to get back - Prince Dimitri gave a lift, or the Colossos blew you and you jumped off."
  },
  {
    "id": 182,
    "name": "you've successfully dealt with the Colossos. (currently not used but may be later)"
  },
  {
    "id": 183,
    "name": "you murdered them (also get tag 40). This is used because you might meet someone in jail who tells you they were thugs."
  },
  {
    "id": 184,
    "name": "you've looked at box in Market"
  },
  {
    "id": 185,
    "name": "you've looked at pearl in Market"
  },
  {
    "id": 186,
    "name": "you've looked at book in Market"
  },
  {
    "id": 187,
    "name": "heard about Dead Eye Street from gamblers on street, OR from gambler in hall."
  },
  {
    "id": 188,
    "name": "met her again in Seriphosa."
  },
  {
    "id": 189,
    "name": "you're on the mission to sell horse or unicorn there"
  },
  {
    "id": 190,
    "name": ": keep working for stallholder"
  },
  {
    "id": 191,
    "name": "you've had the 'wolf bus' encounter"
  },
  {
    "id": 192,
    "name": "you've met the Hair Witch Project"
  },
  {
    "id": 193,
    "name": "you have the writhing hair extensions"
  },
  {
    "id": 194,
    "name": "you're bald from the Hair Witch Project"
  },
  {
    "id": 195,
    "name": "you can sell your hair if you're broke"
  },
  {
    "id": 196,
    "name": "you've found work in the country (doesn't give flag if attempt and fail)"
  },
  {
    "id": 197,
    "name": "you've gone past the island chain"
  },
  {
    "id": 198,
    "name": "ate there (harder to leave)"
  },
  {
    "id": 199,
    "name": "you've found the pyramid (this is re-set to 0 if you swear vengeance on them)"
  },
  {
    "id": 200,
    "name": ": main start of adventure Snow - other main start to adventure the above 4 paras are identical to those with the same name, except without 'gu' (and 'map' in one case) at the end. The only difference is that '269gu' is assigned the picture 'guide'."
  },
  {
    "id": 201,
    "name": "you've taken in basics of Nara religion - either in pyramid, or succeeded in Ritual of Weighing the Heart"
  },
  {
    "id": 202,
    "name": "you've had the opportunity for the 'money tree' encounter"
  },
  {
    "id": 203,
    "name": "you've found High John in forest"
  },
  {
    "id": 204,
    "name": "you've noticed that the red flower doesn't wilt (make this a path into final bit)"
  },
  {
    "id": 205,
    "name": "you'll be arrested in Tok for spying on the unicorn"
  },
  {
    "id": 206,
    "name": "you've been to Tok (if arrested, don't get the keyword)"
  },
  {
    "id": 207,
    "name": "you've met, or heard about, Eddie Lizzard."
  },
  {
    "id": 208,
    "name": "pyramid creatures are in your head."
  },
  {
    "id": 209,
    "name": "you've had the chance to visit the Seal of Approval or spell checker, or get a catscan"
  },
  {
    "id": 210,
    "name": "you didn't pay prince dimitri back fully (if going into space, man won't pull you back to earth)"
  },
  {
    "id": 211,
    "name": "small island 211choosef is identical, except it displays the picture of the fish-woman wait to be rescued future expansion: pirate ship could be effected by having met elf pirate, if she didn't die. fish woman play the drum swim got rid of 218 as unnecessary make a raft improve raft set out on bad raft (deleted 235 as unnecessary) set out on good raft, or lucky when on bad raft deleted 238-242. 243 is in 'improve raft' above explore the forest met the dragon and told not to return (deleted these paras) meet the dragon for the 2nd time meet the dragon for the first time"
  },
  {
    "id": 212,
    "name": "have had 'city guards' encounter from Seal or street preacher."
  },
  {
    "id": 213,
    "name": "you've had 'food court' bit."
  },
  {
    "id": 214,
    "name": "you've come across 'reader' in forest."
  },
  {
    "id": 215,
    "name": "you drank from it AFTER tricking wood elf"
  },
  {
    "id": 216,
    "name": "you know about Janooth (can do on quest from main city hub, or tell revenge frog)"
  },
  {
    "id": 217,
    "name": "you've met the veangeful frog/wood elf"
  },
  {
    "id": 218,
    "name": "flag when looking for cure for wood elf - this indicates that it knows its you, thus will attack you if fail."
  },
  {
    "id": 220,
    "name": "you've met Santa (in space)"
  },
  {
    "id": 221,
    "name": "you hid from the goblin patrol, and failed (makes them less friendly)"
  },
  {
    "id": 222,
    "name": "you've met dark elf (whether randomly or because going to training camp)"
  },
  {
    "id": 223,
    "name": "you're on your way to the training camp, via the forest (ie having run away from the elf or she runs away in combat)"
  },
  {
    "id": 224,
    "name": "you're at the camp, or later in Karsh, without the elf (223 and 224 are two seperate keywords so that if you head into the forest having been at the camp, you won't get the message 'at last you find the camp...'"
  },
  {
    "id": 225,
    "name": "you've spent too long in the town."
  },
  {
    "id": 226,
    "name": "you've visited the wise-woman."
  },
  {
    "id": 227,
    "name": "you've had the encounter which can be cthulhu or friendly"
  },
  {
    "id": 228,
    "name": "you successfully destroyed the camp."
  },
  {
    "id": 229,
    "name": "you tried to get everyone out of the ship (bonus to speech)"
  },
  {
    "id": 230,
    "name": "met elf pirate on 'arrrr and arrrr'"
  },
  {
    "id": 231,
    "name": "you've met Robin Goodfellow"
  },
  {
    "id": 232,
    "name": "you've spent the night in a ruined temple (can happen on Janooth quest, or when meet Robin Goodfellow)"
  },
  {
    "id": 233,
    "name": "you're spending the night in temple, from Robin Goodfellow (if don't have this keyword, it's on Janooth quest)"
  },
  {
    "id": 234,
    "name": "'goddess of procrastination'"
  },
  {
    "id": 235,
    "name": "in Karsh, you will be spared if defeated (first time). eg gave 'about to die' speech to crowd, or rebel's speech."
  },
  {
    "id": 236,
    "name": "you've seen the gamblers."
  },
  {
    "id": 237,
    "name": "you owe the gamblers 15 shells."
  },
  {
    "id": 238,
    "name": "you're on the assassination mission for the gamblers (if have this keyword, will also have 101)."
  },
  {
    "id": 239,
    "name": "you've been to the bridge where Zareth lives."
  },
  {
    "id": 240,
    "name": "on bridge, you've had the chance to take a taxi."
  },
  {
    "id": 241,
    "name": "on bridge, you're trying to cure Owyth and have no hut (different consequences if leave)."
  },
  {
    "id": 242,
    "name": "you've had 'primordial soup' bit."
  },
  {
    "id": 243,
    "name": "have had sweat lodge encounter."
  },
  {
    "id": 244,
    "name": "you gave Owyth to Zareth."
  },
  {
    "id": 245,
    "name": "you read the walls of Atnos - automatic success for Zareth to either teach you, or perform operation on you."
  },
  {
    "id": 246,
    "name": "Zareth is helping you get home (may get easier stairs) set back to 0 once used (in case I add other uses in the future)."
  },
  {
    "id": 247,
    "name": "you snuck up and saw the dragon - only difference is that the message when you win is slightly different."
  },
  {
    "id": 249,
    "name": "you gave rebel's speech to crowd in Karsh: can make the rebels accept you."
  },
  {
    "id": 250,
    "name": "you've read the 'obbituaries."
  },
  {
    "id": 251,
    "name": "you've found Dead Eye Street."
  },
  {
    "id": 252,
    "name": "you've had the chance to meet the gamblers on Dead Eye Street."
  },
  {
    "id": 253,
    "name": "you've had the chance to meet the *dead* elf pirate"
  },
  {
    "id": 254,
    "name": "you've had the message when you go there for the 2nd time."
  },
  {
    "id": 255,
    "name": "you've used the druids 'go away' spell. It can only be used once."
  },
  {
    "id": 256,
    "name": "you've had 'one with everything' bit."
  },
  {
    "id": 257,
    "name": "she died."
  },
  {
    "id": 258,
    "name": "you met the *dead* elf pirate (gives you help, like guide and keyword 187)"
  },
  {
    "id": 259,
    "name": "you can't go back to Dead Eye Street again. If this is 1, 251 is re-set to 0 and stays there."
  },
  {
    "id": 260,
    "name": "you've had 'dustin half-man' bit."
  },
  {
    "id": 261,
    "name": "you've had the chance to get a tip from the gambler."
  },
  {
    "id": 262,
    "name": "you've had a fight on Dead Eye Street. (or got out of it because it was the elf pirate)"
  },
  {
    "id": 263,
    "name": "you've had the chance to meet the *live* elf pirate."
  },
  {
    "id": 264,
    "name": "you've had troll booth encounter."
  },
  {
    "id": 265,
    "name": "BT-S disappeared, but it's not your fault, was just random. (this is only relevant with the rebels) to contact him again 19 must be 1, 20 must be 0."
  },
  {
    "id": 266,
    "name": "you've been to Serene Dreams (used in final gambling hall)"
  },
  {
    "id": 267,
    "name": "you've had the chance to fall into hell, while walking around island."
  },
  {
    "id": 268,
    "name": "you've actually visited hell. If you visit hell, 267 is set to 1 as well as 268. This is in case you're visiting it by another way."
  },
  {
    "id": 269,
    "name": "298 Karrakara start: continues at 309 270 only displays once, when first arrive. 269 is arriving in Karrakara any other time. 271 is key para: takes you to 'look for work' or other, unless you're back from looking for Well of New Life again, and being turned into a frog (keyword 289). This sends you to Karrac2fs. 'Gladconsider' goes to '273ii' if decide not to, so if anything before '273ii' other than gladiator, change 'Gladconsider' as well. if add another option to this, also need to add it to '345choose' (when first go to Serene Dreams) change this so can be captured as well. make sure get murderer tag if kill guard and then get captured. stealing forest hub 300 initial roll for encounter 301 subsequent rolls for encounters: go to 306 (end), to back to 300. 1st line refers to keyword 274, second to keyword 275. This is not a mistake. maybe add option to get mission to destroy this cult here - once have written 'Pyramid'. when do Imp city, if haven't been there 50% chance of going there instead of out of forest, if haven't been there yet. swanroad encounter requires keyword 142 to be 0 (haven't had the encounter before) keyword 1 to be 0 (you don't have a boat) keywords 170 and 286 to be 0 (you're not on Atnos or Well of New Life quests) don't have follower 28 (Princess Yasmina) this encounter doesn't happen if you're on Atnos quest or on quest to re-find the Well of New Life. (too difficult to resolve) later add ability to keep keyword 29 (witches bundle quest), and when back in city option to forget about it or set out again). At the moment, 'Weasel' doesn't test for whether you have a neckweasel already. Even though you can get one somewhere else (fleeing and meet the lost fleet again), that para currently never can end up here. uniquely, 'Houses' goes back to 300 not 301 after you've had it or if you already have. 306: at the moment there are seven ways you can be going through this forest: you're on the witches bundle quest (so it takes you to 170, the witch), you're lost in the forest (takes you to 'Findroad'), you're cutting through going over the hills ('Overhill0'), you're heading to Atnos ('Atnosfos0'), you've run away from the elf and you're trying to find the gladiator camp ('Gladiatorcamp') you're trying to re-find the Well of New Life ('Foxwomanend'), or none of the above, and thus are going back to Karrakara (Karraback). may need to add other options later IF DO SO, ALSO AMEND SWANROADSAIL. All endings need to set 335 to 0."
  },
  {
    "id": 270,
    "name": "you're escaping with someone."
  },
  {
    "id": 271,
    "name": "you left the elf in the arena."
  },
  {
    "id": 272,
    "name": "you're looking for Ozymandias."
  },
  {
    "id": 273,
    "name": "you've walked all the way round the island. (can trigger final bit)"
  },
  {
    "id": 274,
    "name": "you've been to clown village."
  },
  {
    "id": 275,
    "name": "you're in clown village in forest. (otherwise you're walking round island)"
  },
  {
    "id": 276,
    "name": "you've had wedding encounter."
  },
  {
    "id": 277,
    "name": "you've been in 'Final' pyramid (not the Nara one)."
  },
  {
    "id": 278,
    "name": "you met the cat-spider in the arena (notice its webs in the morning in Final)"
  },
  {
    "id": 279,
    "name": "you'll get Unnerving Beast rather than guide who might attack."
  },
  {
    "id": 280,
    "name": "you'll get guide who might attack rather than Unnerving Beast."
  },
  {
    "id": 281,
    "name": "you've been given the orb, which will be the Pearl of Wisdom or contain shells."
  },
  {
    "id": 282,
    "name": "you met the clowns there."
  },
  {
    "id": 283,
    "name": "you were picked up from island by Lorena Hobbit. you met the dragon..."
  },
  {
    "id": 284,
    "name": "you're a courtesan, and you were shipwrecked (thus you won't get revenge ending)"
  },
  {
    "id": 285,
    "name": "you drank from it (thus can't get revenge ending)"
  },
  {
    "id": 286,
    "name": "you're on the quest to re-find it"
  },
  {
    "id": 287,
    "name": "you've been to the last hall on Dead Eye Street."
  },
  {
    "id": 288,
    "name": "the fox-woman turned you into a frog (in final bit)."
  },
  {
    "id": 289,
    "name": "you're heading back to Karrakara, after Well of New Life failed to help you (it turned you into a frog)"
  },
  {
    "id": 290,
    "name": "you've met the walking oasis"
  },
  {
    "id": 291,
    "name": "but you didn't met the actual tree (only used for message related to other oasis)"
  },
  {
    "id": 292,
    "name": "you're sailing to the safe island in end bit."
  },
  {
    "id": 293,
    "name": "you killed Yag-kosha"
  },
  {
    "id": 294,
    "name": "you freed the gods from the pyramid ('Safeisland' can depend on both of these keywords)"
  },
  {
    "id": 295,
    "name": "you're fleeing vengeance by sea."
  },
  {
    "id": 296,
    "name": "you're fleeing vengeance by land (ie into the desert)"
  },
  {
    "id": 298,
    "name": "you found the lost fleet"
  },
  {
    "id": 299,
    "name": "you're on the mission to investigate the Amazons for the city government, or the temple of Daba"
  },
  {
    "id": 300,
    "name": "you're going to be catapulted to the safe island"
  },
  {
    "id": 301,
    "name": "you've had 'embaaaarrassing' pun from pirates."
  },
  {
    "id": 302,
    "name": "crew has had dysentry."
  },
  {
    "id": 303,
    "name": "you've had a duel with one of the pirates."
  },
  {
    "id": 304,
    "name": "you've gone through the 'revenge' ending."
  },
  {
    "id": 305,
    "name": "you have the password to the Amazon's city."
  },
  {
    "id": 306,
    "name": "the clowns told you about the webs"
  },
  {
    "id": 307,
    "name": "you've had 'Spider-Cultist Dior' bit."
  },
  {
    "id": 308,
    "name": "you're in hell from trying to get into the Amazon city."
  },
  {
    "id": 309,
    "name": "341: Karrakara start overflow. this is identical to para 289, except for the picture."
  },
  {
    "id": 310,
    "name": "you're having eye plant encounter in Karrakara (otherwise it's in Amazon city)."
  },
  {
    "id": 312,
    "name": "you were dragged into hell by hands in Amazon park."
  },
  {
    "id": 313,
    "name": "you've failed the roll at the temple of Averna, but because you're an Amazon you got the blessing anyway."
  },
  {
    "id": 314,
    "name": "you've met the bear and princess."
  },
  {
    "id": 315,
    "name": "you tried to cast a spell."
  },
  {
    "id": 316,
    "name": "you tried to greet them."
  },
  {
    "id": 317,
    "name": "you've been allowed inside the Amazon palace."
  },
  {
    "id": 318,
    "name": "you took the side of Averna in the argument between Amazons."
  },
  {
    "id": 319,
    "name": "you took the side of Daba."
  },
  {
    "id": 320,
    "name": "you met the smugglers in the Amazon city tavern."
  },
  {
    "id": 321,
    "name": "you found the open inn."
  },
  {
    "id": 322,
    "name": "you've found the open inn, but decided to leave."
  },
  {
    "id": 323,
    "name": "you've been a pirate"
  },
  {
    "id": 324,
    "name": "you've had the chance to become a pirate through looking for work. This doesn't effect becoming a pirate from revenge ending, that relies only on 323."
  },
  {
    "id": 325,
    "name": "you've had chance to meet her while begging."
  },
  {
    "id": 326,
    "name": "you're being a pirate via 'revenge' ending."
  },
  {
    "id": 327,
    "name": "you've had goblin guide; at start, or when leaving pirate ship."
  },
  {
    "id": 328,
    "name": "you've had 'robbed' encounter; as above, at start, or when leaving pirate ship."
  },
  {
    "id": 329,
    "name": "you're trying to rob the palace."
  },
  {
    "id": 330,
    "name": "you've been punished for being a smuggler: can't look for lodging."
  },
  {
    "id": 331,
    "name": "You're in the temple of Daba, and have visited that of Averna."
  },
  {
    "id": 332,
    "name": "you defeated the false priest of Averna."
  },
  {
    "id": 333,
    "name": "you've had the chance to find the Karrakaran temple of Daba."
  },
  {
    "id": 334,
    "name": "you've met horsewoman who directs you back to Karrakara."
  },
  {
    "id": 335,
    "name": "you got directions out of the forest from the wolf, and so can't meet the horsewoman this time."
  },
  {
    "id": 336,
    "name": "you've had the scarecrow gag."
  },
  {
    "id": 337,
    "name": "you've had 'deep Freud' bit."
  },
  {
    "id": 338,
    "name": " starting para 根据职业选择剧情起点"
  },
  {
    "id": 343,
    "name": "361 : gladiator, 1st stage (can back out, fight brute) this is finding the camp without the elf. this is the camp itself, whether with elf or without. potential for expansion later: tunnel could open into the Underworld. fighting the elf - have already lost Heroism if going to. despite the name, this can be with or without elf."
  },
  {
    "id": 365,
    "name": "376 : small quest with witch mages and witches don't have to save vs heroism (fairies do) maybe add the option to buy provisions first (changing 'miserable night in forest' encounter) deleted 386."
  },
  {
    "id": 420,
    "name": ": checking on boat in swamp this branching means you can't find them, then immediately find them again if fleeing by sea. no seacity11. offering: requires keyword 171 to be 0, and at least 2 shells. goes to Space rather than Space2, just in case add other stuff to Space in the future. don't lose the keyword yet, because it might be relevant if you go through forest or swamp. if 294 is 0 (you didn't free the gods) then 293 is also 0 (you didn't kill Yag-kosha) Might need to have keyword for 'you've spent night in city' OR 'you've been attacked by demons at night' however, note that can come to para 'Asleepss1' from being caught smuggling, so give keywords before that. if, later, add a way to get back to Karrakara from here, this could be a potential way to gain the trust of the sewer rebels. That's why it's seperate to Amatempappgov1, even though the results are currently the same. this is same choices as Amaheadbackfs, but it's easier. this is the same as Amaheadass, except you gain Streetwise not Magic. this should be harder than other encounters with priest, because here you stole the head ie he's hostile to you. this is the same as Amaheadwhats, except you gain Magic not Streetwise. the reason there's two paragraphs above is just different pictures. Atnoslocke isn't there - to make space for the possibility of going back via Islandhub. keyword 180 is currently not used, but would be if this possibility existed (to see if you make it, also Prince Dimitri could drop you off if Numen Mari broke your boat) storm: gains no keyword because can happen multiple times. spacehub is only for the start, then spacehub2 which is identical except it has the option for ship to re-enter. the above 3 differ only in the picture. Shipfall3 and ...3a are identical, except that ...3a has a picture associated with it. Shipfall3 has other paras that go to it. ADD MORE DESTINATIONS LATER, TO BOTH SPACELAND AND SHIPFALL ADD MORE DESTINATIONS TO THIS LATER. ADD MORE DESTINATIONS TO THIS LATER art arrays: which paragraph. only 'finishing' paragraphs (free choice, click to continue, end) with a picture need an entry. If there's no picture listed it will display the dragon head & logo. associated with which image name need to duplicate this in credits page. custom images at 'Foxwomanss' your class becomes 'bird' and you lose all your items and companions. skip step+1 $level=0; for ($loop=1;$loop<=$attnum;$loop++) { $level=$level+$stats[$loop]; } $level=max(1,1+floor(($level-130)/10)); put this back in if want to have levels again. $difficulty+=(2*$level)-2; put this back in if want to have levels again. 投掷2枚6面骰 Stamina以外的属性升级 Stamina属性升级升级 $level=0; for ($loop=1;$loop<=$attnum;$loop++) { $level=$level+$stats[$loop]; } $level=max(1,1+floor(($level-130)/10)); $difficulty+=$paras[$para][3]+(2*$level)-2; 投掷2枚6面骰 Stamina以外的属性升级 Stamina属性升级升级 don't always activate: keywords or item/companions. (currently only used when you turn into a frog) (special exception for cat & raven if turning into a frog) slots 2 and 4 the same. 3 and 4 stay as they are. print $line; print \"<div>\"; @include $baseurl.\"update.txt\"; print $line; print \"To save your game, click a <img style=\\\"border:0px\\\" src=\\\"\".$baseurl.\"images/misc/savegame.jpg\\\"> above.\"; $level=0; put back if want to have levels again $level=$level+$stats[$loop]; put back if want to have levels again $level=max(1,1+floor(($level-130)/10)); print \"<div>Level:\".$level.\" \"; put this back if want to have levels again this is for if become a pirate captain."
  }
];