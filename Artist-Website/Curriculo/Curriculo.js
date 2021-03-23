//Definir height da coluna Direita igual ao da Coluna Esquerda

let ColunaDireita = document.getElementById("ColunaDireita");
let ColunaEsquerda = document.getElementById("ColunaEsquerda");

function ColunaDireitaHeight(){
    ColunaDireita.style.height = (ColunaEsquerda.style.height);
}

ColunaDireitaHeight();


//lógica para slide de galeria
let i = 0;
let quadro = document.getElementsByClassName("Quadros");
console.log(quadro.length)


//A cada 4 segundos , chama a função setaDireita()
let AutoDireita = setInterval(function(){
    setaDireita();
    }, 4000)
//Função abaixo pára o Intervalo acima.
    function StopAutoDireita(){
        clearInterval(AutoDireita)
        console.log("Já mandei parar que andes para a direita.")
    }
//Executada a cada 4 segundos , pára de ser chamada quando chega à ultima foto.
    function setaDireita(){
        i++;
        console.log(i)
        CurrentSlide();
        PreviousSlide();
    if(i == quadro.length-1)
    i = -1;
    quadro[quadro.length-1].style.display = "none";
}


function CurrentSlide(){
    quadro[i].style.display = "block";

}

function PreviousSlide(){
    quadro[i-1].style.display = "none";
}

function NextSlide(){
    quadro[i+1].style.display = "none";
}



//video play e pause on mouseover
let video = document.getElementById("video");

function play(){
   return video.play();
};

function pause(){
    return video.pause();
};

console.log("Teste...teste... Está a funcionar!")