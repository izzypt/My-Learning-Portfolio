//Abrir fotografias noutra janela´
let Galeria = document.getElementById("CaixaGaleria");
let GaleriaPhoto = document.getElementById("CaixaGaleria").children;


for(let i = 0; i< GaleriaPhoto.length; i++) {
    GaleriaPhoto[i].addEventListener("click" , function(event){
        window.open(event.target.getAttribute("src"));
      })};




//Filtrar a galeria de acordo com os critérios
let ChosenValue = function GetValue(SelectedOption){return  document.getElementById(SelectedOption).value};


 function filtrar(){
    console.log(ChosenValue("tamanho") + ChosenValue("tecnica") + ChosenValue("estilo"));
    for (let i = 0; i < GaleriaPhoto.length; i++) {
        GaleriaPhoto[i].style.display = "block";
        if (GaleriaPhoto[i].getAttribute("data-tecnica") !== ChosenValue("tecnica"))
            GaleriaPhoto[i].style.display = "none";
        else if (GaleriaPhoto[i].getAttribute("data-estilo") !== ChosenValue("estilo"))
            GaleriaPhoto[i].style.display = "none";
        else if(GaleriaPhoto[i].getAttribute("data-tamanho") !== ChosenValue("tamanho"))
             GaleriaPhoto[i].style.display = "none";
 }};

 function repor(){
     return window.location.reload();
 }

