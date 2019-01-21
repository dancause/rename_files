function new_name() {
var tempo = document.getElementById("newnamefile").value; 

for( var i=0; i < document.getElementsByName("oldnamefile").length;i++){
	document.getElementsByName("oldnamefile")[i].value=tempo.toUpperCase();
	}

}

function hide(ligne) {
var res = $(ligne).data("string");
 var TR_LIGNE = document.getElementById("FILE_"+res);
TR_LIGNE.style.display = "none";
}

