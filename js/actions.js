/*
 * Chargement de la Page
 */

window.onload = function(){
    nbShapesNumber.innerHTML = nbShapes;
    margeNumber.innerHTML = marge;
    document.getElementById('randomButton').disabled = true;
    document.getElementById('randomButton2').disabled = true;
}

/*
 * Gestion des réglages Toggle
 */

$(toggle1).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle1.children[0].classList.contains("off")){
        console.log("ON");
        effetClick = true;
    }else{
        console.log("OFF");
        effetClick = false;
    }
});
/*
$(toggle2).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle2.children[0].classList.contains("off")){
        console.log("ON");
    }else{
        console.log("OFF"); 
    }
});

$(toggle3).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle3.children[0].classList.contains("off")){
        console.log("ON");
    }else{        
        console.log("OFF");              
    }
});

$(toggle4).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle4.children[0].classList.contains("off")){
        console.log("ON");
    }else{
        console.log("OFF");            
    }
});

$(toggle5).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle5.children[0].classList.contains("off")){
        console.log("ON");
    }else{
        console.log("OFF");            
    }
});
*/

/*
 * Génération des réglages
 */

function nbShapesAdd(bool){
    if(bool){
        if(parseInt(nbShapesNumber.innerHTML)<shapes.length){
            nbShapes++;
        }
    }else{
        if(parseInt(nbShapesNumber.innerHTML)>1){
            nbShapes--;
        }
    }
    nbShapesNumber.innerHTML = nbShapes;
}

function margeAdd(bool){
    if(bool){
        marge++;
    }else{
        if(parseInt(margeNumber.innerHTML)>0){
            marge--;
        }
    }
    margeNumber.innerHTML = marge;
}

function loadSettings(){
    createSettings();
    initSettings();
}

function createSettings(){
    settingsBody.children = new Array();
    settingsBody.innerHTML = "";
    for(var j=1; j<=nbShapes;j++){
        var form_group = document.createElement("div");
        form_group.id = "shape" + j;
        form_group.setAttribute('class', 'form_group');
        form_group.style.marginLeft = "20px";
        form_group.style.marginBottom = "20px";
        
        var h4 = document.createElement("h4");
        h4.innerHTML = "Shape " + j;
        settingsBody.appendChild(h4);
        
        /*
         * Shapes
         */        
        var selectA = document.createElement("select");
        selectA.setAttribute('class','form-control');
        selectA.id = "sel"+j+"A";
        
        var labelA = document.createElement("label");
        labelA.setAttribute('for', selectA.id);
        labelA.innerHTML = 'Select a shape:';
        form_group.appendChild(labelA);
        form_group.appendChild(selectA);
        
        for(var i = 0; i < shapes.length; i++) {
            var option = document.createElement("option");
            option.value = shapes[i];
            option.text = shapes[i];
            selectA.appendChild(option);
        }
        
        /*
         * Colors
         */
        var selectB = document.createElement("select");
        selectB.setAttribute('class','form-control');
        selectB.id = "sel"+j+"B";
        
        var labelB = document.createElement("label");
        labelB.setAttribute('for', selectB.id);
        labelB.innerHTML = 'Select a color:';
        form_group.appendChild(labelB);
        form_group.appendChild(selectB);
        
        for(var i = 0; i < colors.length; i++) {
            var option = document.createElement("option");
            option.style.color = colors[i];
            option.value = colors[i];
            option.text = colors[i];
            selectB.appendChild(option);
        }
        
        /*
         * Tracks
         */
        var selectC = document.createElement("select");
        selectC.setAttribute('class','form-control');
        selectC.id = "sel"+j+"C";
        
        var labelC = document.createElement("label");
        labelC.setAttribute('for', selectC.id);
        labelC.innerHTML = 'Select a track:';
        form_group.appendChild(labelC);
        form_group.appendChild(selectC);
        
        for(var i = 0; i < shapes.length; i++) {
            var option = document.createElement("option");
            option.value = "track" + (i+1);
            option.text = "track" + (i+1);
            selectC.appendChild(option);
        }
        
        settingsBody.appendChild(form_group);
    }
}

function initSettings(){
    for(var i=1; i<=nbShapes;i++){
        var selectA = document.getElementById("sel"+i+"A");
        var selectB = document.getElementById("sel"+i+"B");
        var selectC = document.getElementById("sel"+i+"C");
        
        if(i<=selectA.options.length){
            selectA.options.selectedIndex = (i-1);
        }else{
            selectA.options.selectedIndex = (selectA.options.length-1);
        }
        
        if(i<=selectB.options.length){
            selectB.options.selectedIndex = (i-1);
        }else{
            selectB.options.selectedIndex = (selectB.options.length-1);
        }
        
        if(i<=selectC.options.length){
            selectC.options.selectedIndex = (i-1);
        }else{
            selectC.options.selectedIndex = (selectC.options.length-1);
        }
    }
}

function drawForms(){
    hideOrShow();
    resizeForms();
    initSVG();
    document.getElementById('randomButton').disabled = false;
    document.getElementById('randomButton2').disabled = false;
}

function initSVG(){
    sources.innerHTML = "";
    for(var i=1; i<=nbShapes;i++){
        var svg = document.getElementById('canvas' + i)
        var name = document.getElementById("sel"+i+"A").value;
        var color = document.getElementById("sel"+i+"B").value;
        track = document.getElementById("sel"+i+"C").value;
        createShape(svg, name, color, i);
        createSound();
    }
}

function createSound(){
    sources.innerHTML += "<audio id='" + track + "'><source src='sound/" + track + ".wav'><source src='sound/" + track + ".mp3'></audio>";
}

function createShape(svg, name, color, i){
    svg.style.width = largeur + "px";
    svg.style.height = hauteur + "px";
    
    var radius = largeur;
    if(hauteur<radius){
        radius = hauteur;
    }
    
    marginShape = radius*ratioEcartFormes;
    radius = radius -(2*marginShape);
    
    switch(name){
        case "circle":
            var cx = largeur/2;
            var cy = hauteur/2;
            radius = radius/2;
            svg.innerHTML = "<circle onclick='play(" + i + ")' cx='" + cx + "' cy='" + cy + "' r='" + radius + "' stroke-width='0' fill='" + color + "'/>";
            break;
        case "square":
            var x = (largeur-radius)/2;
            var y = (hauteur-radius)/2;
            svg.innerHTML = "<rect  width='" + radius + "' height='" + radius + "' onclick='play(" + i + ")' x='" + x + "' y='" + y + "' style='fill:" + color + "'/>";
            break;
        case "triangle":
            var p1 = [(largeur/2), (hauteur-radius)/2];
            var p2 = [(largeur/2)-(radius/2), hauteur-(hauteur-radius)/2];
            var p3 = [(largeur/2)+(radius/2), hauteur-(hauteur-radius)/2];
            svg.innerHTML = "<path onclick='play(" + i + ")' fill='"+ color +"' d='M"+ p1[0] +" "+ p1[1] +" L"+ p2[0] +" "+ p2[1] +" L"+ p3[0] +" "+ p3[1] +" Z'/>";
            break;
        case "star":
            var dec = radius*0.25;
            var p1 = [(largeur/2), (hauteur-radius)/2];
            var p2 = [(largeur/2)-(radius/2), (hauteur-(hauteur-radius)/2)-dec];
            var p3 = [(largeur/2)+(radius/2), (hauteur-(hauteur-radius)/2)-dec];
            var p4 = [(largeur/2), hauteur-(hauteur-radius)/2];
            var p5 = [(largeur/2)-(radius/2), ((hauteur-radius)/2)+dec];
            var p6 = [(largeur/2)+(radius/2), ((hauteur-radius)/2)+dec];
            svg.innerHTML = "<path onclick='play(" + i + ")' fill='"+ color +"' d='M"+ p1[0] +" "+ p1[1] +" L"+ p2[0] +" "+ p2[1] +" L"+ p3[0] +" "+ p3[1] +" Z'/><path onclick='play(" + i + ")' fill='"+ color +"' d='M"+ p4[0] +" "+ p4[1] +" L"+ p5[0] +" "+ p5[1] +" L"+ p6[0] +" "+ p6[1] +" Z'/>";
            break;
        case "heart":
            var dec = radius*0.4;
            
            var radiusHeart = radius*0.25;
            var cx1 = largeur/2 - radiusHeart;
            var cy1 = ((hauteur-radius)/2)+radiusHeart;
            var cx2 = largeur/2 + radiusHeart;
            var cy2 = ((hauteur-radius)/2)+radiusHeart;
            
            var p1 = [(largeur/2), hauteur-(hauteur-radius)/2];
            var p2 = [cx1-(radiusHeart*0.8), cy1+(radiusHeart*0.6)];
            var p3 = [cx2+(radiusHeart*0.8), cy2+(radiusHeart*0.6)];
            
            var cx3 = largeur/2;
            var cy3 = cy1+(radiusHeart/2);
            
            svg.innerHTML = "<path onclick='play(" + i + ")' fill='"+ color +"' d='M"+ p1[0] +" "+ p1[1] +" L"+ p2[0] +" "+ p2[1] +" L"+ p3[0] +" "+ p3[1] +" Z'/><circle onclick='play(" + i + ")' cx='" + cx1 + "' cy='" + cy1 + "' r='" + radiusHeart + "' stroke-width='0' fill='" + color + "'/><circle onclick='play(" + i + ")' cx='" + cx2 + "' cy='" + cy2 + "' r='" + radiusHeart + "' stroke-width='0' fill='" + color + "'/><circle onclick='play(" + i + ")' cx='" + cx3 + "' cy='" + cy3 + "' r='" + radiusHeart*0.5 + "' stroke-width='0' fill='" + color + "'/>";
            break;
        case "cross":
            var x1 = (largeur/2)-(radius*0.125);
            var y1 = (hauteur-radius)/2;
            var x2 = (largeur-radius)/2;
            var y2 = (hauteur/2)-(radius*0.125);
            svg.innerHTML = "<rect  width='" + radius*0.25 + "' height='" + radius + "' onclick='play(" + i + ")' x='" + x1 + "' y='" + y1 + "' style='fill:" + color + "'/><rect  width='" + radius + "' height='" + radius*0.25 + "' onclick='play(" + i + ")' x='" + x2 + "' y='" + y2 + "' style='fill:" + color + "'/>";
            break;
        default:
            alert("Aucune forme ne correspond !");
            break;
    }
}

function exportExcel(){
    var res = "Number, Date, Hour, Track \n";
    var tab = document.getElementById('tableSaved').children;
    for(var i=0; i<tab.length;i++){
        //parcours des <p>
        var p = tab[i].children;
        var dateAndHour = ((p[0].innerHTML).split(" - "));
        res += (i+1) + ", " + dateAndHour[0] + ", " + dateAndHour[1] + ", " + p[1].innerHTML + " \n";
    }
    
    excelInput = document.getElementById("excelInput");
    
    excelInput.value = res;
    console.log(excelInput.value);
    
    try {
        excelInput.select();
        var successful = document.execCommand('copy');
        document.getElementById("buttonExcel").innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
        setTimeout(function(){
            document.getElementById("buttonExcel").innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
        }, 1000);
        
    }catch (err){
        alert('Oops, unable to copy : ' + err);
    }
}

function addLine(sound){
    nbSaved++;
    
    document.getElementById("buttonExcel").innerHTML = "<i class='fa fa-floppy-o' aria-hidden='true'></i>";
    
    if(nbSaved>1){
        document.getElementById('titleSaved').innerHTML = nbSaved + " actions saved";
    }else{
        document.getElementById('titleSaved').innerHTML = nbSaved + " action saved";
    }
    
    switch(sound){
        case "track1":
            trackSaved[0]++;
            break;
        case "track2":
            trackSaved[1]++;
            break;
        case "track3":
            trackSaved[2]++;
            break;
        case "track4":
            trackSaved[3]++;
            break;
        case "track5":
            trackSaved[4]++;
            break;
        case "track6":
            trackSaved[5]++;
            break;
    }
    
    for(var i=0; i<trackSaved.length; i++){
        if(trackSaved[i]>0){
            document.getElementById('titleSaved').innerHTML += " - <strong>track"+ (i+1) + "(" + trackSaved[i] + ")</strong>";
        }else{
            document.getElementById('titleSaved').innerHTML += " - track"+ (i+1) + "(" + trackSaved[i] + ")";
        }
    }
    
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    
    var txt = ("<span class='dateSaved'>" + day + "/" + month + "/" + year + " - " + hour + ":" + min + ":" + sec + "</span> --> <span class='trackPlayed'>" + sound + "</span>");
    
    document.getElementById('tableSaved').innerHTML += "<p> - " + txt + "</p>";
}

function play(index){
    
    for(var i=1; i<=nbShapes;i++){
        var sound = sources.children[i-1];
        sound.pause();
        sound.currentTime = 0;
    }
    
    var sound = sources.children[index-1];
    sound.play();
    
    addLine(sound.id);
    
    if(effetClick){
        var svg = document.getElementById('canvas'+index).children;
        for(var i=0; i<svg.length; i++){
            svg[i].style.opacity = 0.5;
        }
        setTimeout(function(){
            for(var i=0; i<svg.length; i++){
                svg[i].style.opacity = 1;
            }
        },100);   
    }
}

function hideOrShow(){
    for(var i=1; i<=shapes.length; i++){
        var form = document.getElementById('form'+i);
        if(i<=nbShapes){
            form.classList.remove('hidden');
        }else{
            form.classList.add('hidden');
        }
    }
}

function resizeForms(){
    var largeurWindow = document.body.clientWidth;
    var hauteurWindow = document.body.clientHeight;
    largeur = (largeurWindow - 2*marge);
    hauteur = (hauteurWindow - 2*marge);
    
    switch(nbShapes){
        case 1:
            $("#form1").offset({ top: marge, left: marge});
            $("#form1").width(largeur);
            $("#form1").height(hauteur);
            break;
        case 2:
            largeur = largeur/2;
            $("#form1").offset({ top: marge, left: marge});
            $("#form1").width(largeur);
            $("#form1").height(hauteur);
            $("#form2").offset({ top: marge, left: (marge+largeur)});
            $("#form2").width(largeur);
            $("#form2").height(hauteur);
            break;
        case 3:
            largeur = largeur/3;
            $("#form1").offset({ top: marge, left: marge});
            $("#form1").width(largeur);
            $("#form1").height(hauteur);
            $("#form2").offset({ top: marge, left: (marge+largeur)});
            $("#form2").width(largeur);
            $("#form2").height(hauteur);
            $("#form3").offset({ top: marge, left: (marge+(largeur*2))});
            $("#form3").width(largeur);
            $("#form3").height(hauteur);
            break;
        case 4:
            largeur = largeur/2;
            hauteur = hauteur/2;
            $("#form1").offset({ top: marge, left: marge});
            $("#form1").width(largeur);
            $("#form1").height(hauteur);
            $("#form2").offset({ top: marge, left: (marge+largeur)});
            $("#form2").width(largeur);
            $("#form2").height(hauteur);
            $("#form3").offset({ top: (marge+hauteur), left: marge});
            $("#form3").width(largeur);
            $("#form3").height(hauteur);
            $("#form4").offset({ top: (marge+hauteur), left: (marge+largeur)});
            $("#form4").width(largeur);
            $("#form4").height(hauteur);
            break;
        case 5:
            $("#form1").offset({ top: marge, left: marge+((largeur/2)-(largeur/3))});
            $("#form1").width(largeur/3);
            $("#form1").height(hauteur/2);
            $("#form2").offset({ top: marge, left: (marge+(largeur/2))});
            $("#form2").width(largeur/3);
            $("#form2").height(hauteur/2);
            $("#form3").offset({ top: marge+(hauteur/2), left: marge});
            $("#form3").width(largeur/3);
            $("#form3").height(hauteur/2);
            $("#form4").offset({ top: marge+(hauteur/2), left: (marge+(largeur/3))});
            $("#form4").width(largeur/3);
            $("#form4").height(hauteur/2);
            $("#form5").offset({ top: marge+(hauteur/2), left: (marge+(largeur*(2/3)))});
            $("#form5").width(largeur/3);
            $("#form5").height(hauteur/2);
            largeur = largeur/3;
            hauteur = hauteur/2;
            break;
        case 6:
            $("#form1").offset({ top: marge, left: marge});
            $("#form1").width(largeur/3);
            $("#form1").height(hauteur/2);
            $("#form2").offset({ top: marge, left: (marge+(largeur/3))});
            $("#form2").width(largeur/3);
            $("#form2").height(hauteur/2);
            $("#form3").offset({ top: marge, left: (marge+(largeur*(2/3)))});
            $("#form3").width(largeur/3);
            $("#form3").height(hauteur/2);
            $("#form4").offset({ top: marge+(hauteur/2), left: marge});
            $("#form4").width(largeur/3);
            $("#form4").height(hauteur/2);
            $("#form5").offset({ top: marge+(hauteur/2), left: (marge+(largeur/3))});
            $("#form5").width(largeur/3);
            $("#form5").height(hauteur/2);
            $("#form6").offset({ top: marge+(hauteur/2), left: (marge+(largeur*(2/3)))});
            $("#form6").width(largeur/3);
            $("#form6").height(hauteur/2);
            largeur = largeur/3;
            hauteur=hauteur/2;
            break;
        default:
            alert("Un problème de redimension est survenu, merci de réessayer !");
            break;
    }
}

function shuffleForms(){
    var HTML = new Array();
    for(var i=1; i<=nbShapes;i++){
        var svg = document.getElementById('canvas'+i);
        HTML.push(svg.innerHTML);
    }
    
    var i=1;
    while(HTML.length>0){
        var svg = document.getElementById('canvas'+i);
        var random = Math.round(Math.random()*(HTML.length-1));
        svg.innerHTML = HTML[random];
        HTML.splice(random, 1);
        i++;
    }
    document.getElementById('randomButton').innerHTML = "<i class='fa fa-spinner fa-pulse fa-fw'></i>";
    setTimeout(function(){
        document.getElementById('randomButton').innerHTML = "<i class='fa fa-share-square-o' aria-hidden='true'></i>";    
    },500);
    console.log("shuffleForms()");
}

function shuffleSongs(){
    document.getElementById('randomButton2');
    var indexs = new Array();
    for(var i=1; i<=nbShapes;i++){
        indexs.push(i);
    }
    shuffle(indexs);
    for(var i=0; i<nbShapes;i++){
        var playIndex = indexs[i];
        var canvas = document.getElementById('canvas'+(i+1));
        for(var j=0;j<canvas.children.length;j++){
            canvas.children[j].onclick = new Function("play('"+playIndex+"')"); 
        }
    }
    document.getElementById('randomButton2').innerHTML = "<i class='fa fa-spinner fa-pulse fa-fw'></i>";
    setTimeout(function(){
        document.getElementById('randomButton2').innerHTML = "<i class='fa fa-music' aria-hidden='true'></i>";    
    },500);
    console.log("shuffleSongs()");
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}