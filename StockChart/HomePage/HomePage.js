import {stocksymbols} from './modules/test.js'

let cabecalho = document.getElementById("cabecalho");
let userProfile = document.getElementById("userProfile");
let openProfileButton = document.getElementById("profileButton");
let closeProfileButton = document.getElementById("closeUserProfile");
let searchBar = document.getElementById("searchbar");
let searchForm = document.getElementById("SearchForm");
let searchedName = document.getElementById("companyName");
let companyImageLink = document.getElementById("companyImage");
let companyOverviewText = document.getElementById("companyOverview");
let squareCharts = document.getElementById("squareCharts");
let opcoes = document.getElementsByClassName("opcoes")
let opcoesArray = [...opcoes]; 
let companyLogo = document.getElementById("companyLogo");
let AddSquare = document.getElementById("AddSquare");
let companySymbol;
let dragindex = 0;
let clone = " ";

cabecalho.addEventListener("mouseover", changeToInlineBlock);
cabecalho.addEventListener("mouseout" , changeToNone);

openProfileButton.addEventListener("click", function()
    {
        if(openProfileButton)
            TurnVisible(userProfile)
    }
)

closeProfileButton.addEventListener("click", function()
    {
        if(closeProfileButton)
            TurnHidden(userProfile)
    }
)

searchForm.addEventListener("submit" , function(event)
    {
        event.preventDefault(); // Evita a submissão normal do formulário
        searchedName.innerHTML = searchBar.value;  
        changeLogoImage(searchBar.value);
        giveCompanieSymbol(searchBar.value);
        TurnVisible(companyLogo);
        TurnVisible(squareCharts);
    }
)

for(let x = 0; x < opcoes.length; x++) 
    {
        opcoes[x].addEventListener("change" , function()
        {
            console.log(opcoes[x].value)
            getStatistic(companySymbol , opcoes[x].value , opcoes[x])
        })
    }

AddSquare.addEventListener("click", createSquare )

function changeToInlineBlock()
{
    document.getElementById("ulcabecalho").style.display = "inline-block";
}

function changeToNone()
{
    document.getElementById("ulcabecalho").style.display = "none";
}

function TurnVisible(element)
{
    element.style.visibility = "visible";
    element.style.opacity = 1;
}

function TurnHidden(element)
{
    element.style.visibility = "hidden";
    element.style.opacity = 0;
}


function drag(e)
{
    e.dataTransfer.setData("text", e.target.id); //setting the id of the div containing Note1 for type “text” via setData() of the DataTransfer object. DataTransfer object is used to hold the data that is being dragged during a drag and drop operation.
}

function allowDrop(e)
{
    e.preventDefault();
}


function drop(e)
{
    e.preventDefault();
    clone = e.target.cloneNode(true);
    let data = e.dataTransfer.getData("text");
    let nodelist = document.getElementById("SquareCharts").childNodes;
    
    for(let i = 0; i < nodelist.length; i++)
    {
        if (nodelist[i].id === data)
        {
            dragindex = i
        }
    }
    document.getElementById("SquareCharts").replaceChild(document.getElementById(data), e.target);
    document.getElementById("SquareCharts").insertBefore(clone,document.getElementById("SquareCharts").childNodes[dragindex]);
}



function changeLogoImage(str)
{ 
    
    companyImageLink.src = "https://logo.clearbit.com/" + str + ".com"
    
    companyImageLink.addEventListener("error" , function (){ 
        searchedName.innerHTML = "Sorry, we could not find  a company with that name"
     })
}

function giveCompanieSymbol(name)
{
    if (stocksymbols.hasOwnProperty(name))
    {
        companySymbol = stocksymbols[name];
        companyOverview(companySymbol);
    }
    else
        companyOverviewText.innerHTML = "We couldn't find an overview. Try different name or remove white space.";
}



function companyOverview(symbol)
{
    let http = new XMLHttpRequest();

    http.open("GET" , "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+ symbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let companyInfo = JSON.parse(http.responseText);
            companyOverviewText.innerHTML = companyInfo.Description;
        }
    }
}

function getStatistic(companySymbol , statistic, square)
{

    let http = new XMLHttpRequest();

    http.open("GET" , "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+ companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let companyInfo = JSON.parse(http.responseText);
            square.nextSibling.nextSibling.innerHTML = companyInfo[statistic];
        }
    }
    

    console.log(statistic);
}


function createSquare()
{
    
    let container = document.getElementById("squareCharts");
    let newSquare = document.getElementById("Square1").cloneNode("Square1");
    let addSquare = document.getElementById("AddSquare");
    
    container.removeChild(addSquare);
    container.appendChild(newSquare);
    container.appendChild(addSquare).after(newSquare);


}
