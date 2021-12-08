// minifyOnSave: true, filenamePattern: ../../js/$1.min.$2
$(document).ready(function(){


  // TESTES
  // $('#nome').val("Leandro de Assis Gabriel");
  // marcaSexo("M");
  // $('#nascimento').val("29/10/1979");
  // $('#telefone').val("(48) 9933-9104");
  // $('#cidade').val("Florianópolis");
  // $('#estado').val("SC");
  // $('#email').val("lassisg@gmail.com");
  // marcaCamisa("Camiseta M");
  // $('#tempo10km').val("55:12");
  // $('#local').val(montaData());
  //*****************************************

  atletas = null;

  $('#atletas').change(function(){
    var idAtleta = $('#atletas').val();

    if (idAtleta != '-1' ){
      preencheFicha(atletas[idAtleta]);
    }
  });

  $('#txtFileUpload').change(function(evt){

    var data = null;
    var file = evt.target.files[0];
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function(event) {
      var csvData = event.target.result;
      atletas = Papa.parse(csvData,{
                            		header: true,
                                skipEmptyLines: true
                            	}).data;

      preencheOption(atletas);
    };
  });


  $('#cmd').click(function(){
    // var pdf = new jsPDF();
    // var options = {
    //   pagesplit: true
    // };
    //
    // pdf.addHTML($('#usersData'), 0, 0, options, function(){
    //   pdf.save("test.pdf");
    // });

    // var newDoc = new jsPDF();
    // newDoc.text(20, 20, 'Hello world!');
    // newDoc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    // newDoc.addPage();
    // newDoc.text(20, 20, 'Do you like that?');
    // newDoc.save('FichaFR.pdf');
    // console.log("Finito!");


    html2canvas(
      $("#usersData"),
      {
        onrendered: function(canvas) {
          var imgData = canvas.toDataURL('image/png');
          var doc = new jsPDF('p', 'mm');
          doc.addImage(imgData, 'PNG', 10, 10);
          doc.save('FichaFR-'+$('#nome').val()+'.pdf');
      }
    });

    console.log("Finito!");
    return false;

  });

});

function preencheOption(listaAtletas){

  var options = "";

  $.each (listaAtletas, function (idAtleta) {
    options += '<option value="' + idAtleta + '">' + listaAtletas[idAtleta].Nome + '</option>';
  });

  $("#atletas").append(options);

}

function preencheFicha(atleta){

  $('#nome').val(atleta.Nome);
  marcaSexo(atleta.Sexo);
  $('#nascimento').val(atleta.Nascimento);
  $('#telefone').val(atleta.Telefone);
  $('#estado').val(atleta.Estado);
  $('#cidade').val(atleta.Cidade);
  $('#email').val(atleta.Email);
  marcaCamisa(atleta.Camisa);
  $('#tempo10km').val(atleta.Tempo10km);
  $('#local').val(montaData());

}

function marcaSexo(sexo){

  if(sexo == "M"){
    $('#sexoM').prop('checked', true);
    $('#sexoF').prop('checked', false);
  }else if(sexo == "F"){
    $('#sexoM').prop('checked', false);
    $('#sexoF').prop('checked', true);
  }else{
    $('#sexoM').prop('checked', false);
    $('#sexoF').prop('checked', false);
  }

}

function marcaCamisa(camisa){

  var isBabyLook = (camisa.indexOf("Baby") >= 0) ? true : false;
  var isCamisa = !isBabyLook;
  var shirtSize = camisa[camisa.length -1];
  $('#camisaP').siblings().prop('checked', false);
  $('#camisaP').prop('checked', false);
  $('#babylookP').siblings().prop('checked', false);
  $('#babylookP').prop('checked', false);

  switch(isBabyLook) {
    case true:
      switch(shirtSize) {
        case "P":
          $('#babylookP').prop('checked', true);
          break;
        case "M":
          $('#babylookM').prop('checked', true);
          break;
      }
      break;
    case false:
      switch(shirtSize) {
        case "P":
          $('#camisaP').prop('checked', true);
          break;
        case "M":
          $('#camisaM').prop('checked', true);
          break;
        case "G":
          $('#camisaG').prop('checked', true);
          break;
        case "GG":
          $('#camisaGG').prop('checked', true);
          break;
      }
      break;
    }
}

function montaData(){
  var curDate;
  var now = new Date();
  var curMonth  = now.getMonth() + 1;
  var curDay    = now.getDate();
  var curYear   = now.getFullYear();
  curDate   = (curDay<10 ? '0' : '') + curDay;
  curDate   += "/";
  curDate   += (curMonth<10 ? '0' : '') + curMonth;
  curDate   += "/";
  curDate   += curYear;
  return "Florianópolis, " + curDate;
}
