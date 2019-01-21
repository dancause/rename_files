function verif_cookie(){
    var photo_list='';
        photo_list = getCookie('List_photo');
         if (photo_list ==''){
             setCookie('List_photo','');
         }
    return photo_list;
}


function build_list(id_photo){

    var PHOTO = document.getElementById(id_photo);
    var liste = verif_cookie();

    if (PHOTO.style.backgroundColor == "lightgrey") {
            PHOTO.style.backgroundColor = "";
            var res = removephotolist(liste,id_photo);
            setCookie('List_photo',res);
        } else {
            PHOTO.style.backgroundColor='lightgrey';
            liste = validlist(liste, id_photo);
            setCookie('List_photo',liste);
        }
}


function validlist( photo_list , id_photo){
    if ( photo_list.indexOf(id_photo) == -1){
        photo_list = photo_list + id_photo + ',';
    }
    return photo_list;
}


function removephotolist(photo_list , id_photo){

var res = photo_list.replace(id_photo+',', "");
return res;
}

window.onload = function(){
    deleteCoookie('List_photo');
};

function reset() {
    deleteCoookie('List_photo');
    document.getElementById("gallery_html").value="";
    console.log(document.getElementsByName("photo_gallery"));

    var element = document.getElementsByName("photo_gallery");


    for (var i = 0; i<element.length; i++) {
        if (element[i].style.backgroundColor == "lightgrey") {

            element[i].style.backgroundColor = "";
        }

    }

}


function create(){

    var a = verif_cookie().split(",");
    var colonne = radiocheck('colonne');
    var style = radiocheck('style');
    var compteur=1;
    console.log(colonne);
    console.log(style);
    var cols = 12 / colonne;
    var j=0;

    console.log(a.length);
    var tempgall = "";
    var gallery = '<div class="row ">';

    for (i in a) {
        if (a[i] != "") {
                    gallery = gallery +'<div class=" gallery_ligne col-md-' + cols + '"><a href="/images/' + a[i] + '" target="_blank"><img class="img-responsive ' + style + '" src="/images/' + a[i] + '" alt="' + a[i] + '"  ></a></div>';
                            if(compteur < colonne){

                                compteur++;
                            } else{
                                gallery = gallery +'</div><div class="row ">';
                                compteur=1;
                            }
        }
    }
    gallery=gallery+'</div>';

document.getElementById("gallery_html").value = gallery;
}

function radiocheck(rname) {
    return document.querySelector('input[name='+rname +']:checked').value;
}


function photoentete(id_photo,index){

 var element = document.getElementsByName("header_photo");
    for (var i = 0; i<element.length; i++) {
        if (element[i].style.visibility == "visible") {

            element[i].style.visibility = "hidden";
        }

    }
document.getElementById("photo").value = id_photo;
document.getElementById("entete_"+index).style.visibility = "visible";
console.log(document.getElementById("entete_"+index).style.visibility );

}




function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function deleteCoookie(cname) {
    document.cookie = cname + "=" + "" + "; path=/"
}


function setCookie(cname, value) {
    var cvalue = escape(value)
    document.cookie = cname + "=" + cvalue + "; path=/";
}



function build_JSON(){
    var a = verif_cookie().split(",");

    var zonable = document.getElementById('Zonable').value;
    var set = document.getElementById('set').value;
    var liste=''; 
    var temp1 = '<app-image-picker class="app-image-picker" callbackXMPieFunction="'+set+'" defaultValue="#DIAL_VALUE#" displayName="#DIAL_DISPLAY_NAME#" isZonable="'+zonable+'" imagesFlyer="[';
    var temp2 = ']""> <img src="/api/images/uStore/loader.gif"> </app-image-picker>';
        for (i in a) {
        if (a[i] != "") {
            liste = liste+'{"fileName":"'+a[i]+'","zone":"'+getZone(a[i])+'"},\n';
        }
    }
    tempo = htmlEncode(temp1+liste+temp2);
document.getElementById("json_result").innerHTML = tempo;


}

function getZone(file){
var zone ="x";
if (file.search('_Z1.') > 1){
    zone = '1';
} else if (file.search('_Z2.') > 1){
    zone = '2';
}
return zone
}



function htmlEncode ( html )
{
    html = $.trim(html);
    return html.replace(/[&"'\<\>]/g, function(c) 
    {
          switch (c) 
          {
              case "&":
                return "&amp;";
              case "'":
                return "&#39;";
              case '"':
                return "&quot;";
              case "<":
                return "&lt;";
              default:
                return "&gt;";
          }
    });
};

