/*
 * Valeurs par défaut à changer
 */
var marge = 100; //en pixels - marge éxtérieure à tous les objets (pour prendre en compte le cadre en bois)
var ratioEcartFormes = 0.05; //de 0.00 à 0.50 exclus - pourcentage de la taille d'un objet qui définit les marges entre plusieurs objets

/*
 * Déclarations de variables
 */

var toggle1 = document.getElementById('toggle1');
var toggle2 = document.getElementById('toggle2');
var toggle3 = document.getElementById('toggle3');
var toggle4 = document.getElementById('toggle4');
var toggle5 = document.getElementById('toggle5');

var marginShape = 0;
var largeur = 0;
var hauteur = 0;
var track;

var main_container = document.getElementById('main_container');
var nbShapesNumber = document.getElementById('nbShapesNumber');
var margeNumber = document.getElementById('margeNumber');
var sources = document.getElementById('sourcesAudio');

var form1 = document.getElementById('form1');
var form2 = document.getElementById('form2');
var form3 = document.getElementById('form3');
var form4 = document.getElementById('form4');
var form5 = document.getElementById('form5');
var form6 = document.getElementById('form6');

var colors =["Red","Green","Yellow","Pink","Blue","Orange","AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

var shapes = ["circle","square","triangle","star", "heart", "cross"];


var nbShapes = 1;

var settingsBody = document.getElementById("settingsBody");
var effetClick = false;

var nbSaved = 0;
var trackSaved = [0,0,0,0,0,0];