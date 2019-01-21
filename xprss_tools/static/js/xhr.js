

function save_name(FILE) {
  console.log(FILE);
	var res = $(FILE).data("string");
	var xhr = new XMLHttpRequest();
            var xhrname = document.getElementById('FILE_'+res);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.DONE) 
              {
                      if (xhr.status === 200) 
                      {  
                      xhrname.innerHTML = xhr.responseText;
                      } 
                      else
                      {
                      xhrname.innerHTML = ('Erreur avec le serveur / Server Error');
                      }
              }  
            };



            var datajson={
              "hidden_name_file": document.getElementById('hidden_name_file_'+res).value,
              "oldnamefile": document.getElementById('oldnamefile_'+res).value,
              "pagination": document.getElementById('pagination_'+res).value,
              "zone": document.getElementById('zone_'+res).value,
            };
            xhr.open('POST', '/getnewname', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(datajson));



}
