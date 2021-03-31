import {stocksymbols , testando} from './modules/test.js'
import {createTable , addRowToTable, addHeaderToRow, addDataToRow, removeTable, createTableFromObject} from './modules/ConvertingObjects.js';

let cabecalho = document.getElementById("cabecalho");
let userProfile = document.getElementById("userProfile");
let openProfileButton = document.getElementById("profileButton");
let closeProfileButton = document.getElementById("closeUserProfile");
let searchBar = document.getElementById("searchbar");
let searchForm = document.getElementById("SearchForm");
let searchedName = document.getElementById("companyName");
let companyImageLink = document.getElementById("companyImage");
let companyOverviewText = document.getElementById("companyOverview");
let personaliseParagrafo = document.getElementById('personaliseParagrafo');
let separadoresAnalise = document.getElementById('SeparadorAnalise');
let overviewDataButton = document.getElementById('overviewDataButton');
let fundamentalDataButton = document.getElementById('fundamental');
let calendarSeparadorButton = document.getElementById('calendarSeparadorButton');
let technicalSeparadorButton = document.getElementById('technicalSeparadorButton')
let overviewDataContainer = document.getElementById("overviewDataContainer");
let fundamentalDataContainer = document.getElementById('fundamentalDataContainer');
let technicalDataContainer = document.getElementById('technicalDataContainer');
let calendarContainer = document.getElementById('calendarContainer');
let overviewSelectOptions = document.getElementsByClassName("overviewSelectOptions");
let incomeStatementOptions = document.getElementById('incomeStatementOption');
let balanceSheetOptions = document.getElementById('balanceSheetOptions');
let cashFlowOptions = document.getElementById('cashFlowOptions')
let companyLogo = document.getElementById("companyLogo");
let AddSquare = document.getElementById("AddSquare");
let companySymbol;
let cashFlowInfo
let balanceSheetInfo;
let incomeStatementInfo;
let balanceSheetRadioValue;
let incomeStatementRadioValue;
let reqInfoIncomeStatementOptions;
let reqInfoBalanceSheetOptions;
let reqInfoCashFlowOptions;
let cashFlowRadioValue;
let buttonToShowCFTable = document.getElementById("buttonToShowCFTable");
let buttonToShowBSTable = document.getElementById("buttonToShowBSTable");
let buttonToShowISTable = document.getElementById('buttonToShowISTable');
let removeCfTable = document.getElementById('removeCfTable');
let removeBsTable = document.getElementById('removeBsTable');
let removeIsTable = document.getElementById('removeIsTable');



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
        TurnVisible(overviewDataContainer);
        TurnVisible(separadoresAnalise);
        TurnVisible(personaliseParagrafo);
    }
)

for(let x = 0; x < overviewSelectOptions.length; x++) 
    {
        overviewSelectOptions[x].addEventListener("change" , function()
        {
            console.log(overviewSelectOptions[x].value)
            getStatistic(companySymbol , overviewSelectOptions[x].value , overviewSelectOptions[x])
        })
    }

if (incomeStatementOptions)
    incomeStatementOptions.addEventListener("change" , function()
    {
        reqInfoIncomeStatementOptions = incomeStatementOptions.value;
        incomeStatementRadioValue = document.forms.incomeStatementRadio.incomeStatementRadioName.value;
        console.log('Income Statement requested info : ' + reqInfoIncomeStatementOptions);
        console.log('Income statement radio value : ' + incomeStatementRadioValue);
        getIncomeStatementInfo(companySymbol, reqInfoIncomeStatementOptions, incomeStatementRadioValue );
    })

if(balanceSheetOptions)
    balanceSheetOptions.addEventListener('change', function()
   {
        reqInfoBalanceSheetOptions = balanceSheetOptions.value;
        balanceSheetRadioValue = document.forms.balanceSheetRadio.balanceSheetRadioName.value;
        console.log('Requested info in balance sheet : ' + reqInfoBalanceSheetOptions);
        console.group('Balance Sheet radio value : ' + balanceSheetRadioValue);
        getBalanceSheetInfo(companySymbol, reqInfoIncomeStatementOptions, incomeStatementRadioValue )
   })

if(cashFlowOptions)
   cashFlowOptions.addEventListener('change' , function()
   {
        reqInfoCashFlowOptions = cashFlowOptions.value;
        cashFlowRadioValue = document.forms.cashFlowRadio.cashFlowRadioName.value
        console.log('Requested info in Cash Flow : ' + reqInfoCashFlowOptions);
        console.log('Cash Flow radio value is : ' + cashFlowRadioValue);
        getCashFlowInfo(companySymbol)
   })

AddSquare.addEventListener("click", createSquare )

overviewDataButton.addEventListener('click', function()
{
    turnDisplayBlock(overviewDataContainer);
    turnDisplayNone(fundamentalDataContainer);
    turnDisplayNone(calendarContainer);
    turnDisplayNone(technicalDataContainer);
    overviewDataButton.style = "text-decoration: overline black;"
    fundamentalDataButton.style = "text-decoration: none;";
    calendarSeparadorButton.style = "text-decoration: none;"
    technicalSeparadorButton.style = "text-decoration: none;";
})

fundamentalDataButton.addEventListener('click', function()
{
    turnDisplayNone(overviewDataContainer);
    turnDisplayBlock(fundamentalDataContainer);
    turnDisplayNone(calendarContainer);
    turnDisplayNone(technicalDataContainer);
    overviewDataButton.style = "text-decoration: none;"
    fundamentalDataButton.style = "text-decoration: overline black;";
    calendarSeparadorButton.style = "text-decoration: none;"
    technicalSeparadorButton.style = "text-decoration: none;";

})

technicalSeparadorButton.addEventListener('click' , function ()
{
    turnDisplayNone(overviewDataContainer);
    turnDisplayNone(fundamentalDataContainer);
    turnDisplayBlock(technicalDataContainer);
    turnDisplayNone(calendarContainer);
    overviewDataButton.style = "text-decoration: none;"
    fundamentalDataButton.style = "text-decoration: none;";
    calendarSeparadorButton.style = "text-decoration: none;";
    technicalSeparadorButton.style = "text-decoration: overline black;";
})



calendarSeparadorButton.addEventListener('click', function()
{
    turnDisplayNone(overviewDataContainer);
    turnDisplayNone(fundamentalDataContainer);
    turnDisplayBlock(calendarContainer);
    turnDisplayNone(technicalDataContainer);
    overviewDataButton.style = "text-decoration: none;"
    fundamentalDataButton.style = "text-decoration: none;";
    calendarSeparadorButton.style = "text-decoration: overline black;";
    technicalSeparadorButton.style = "text-decoration: none;";
    

})

buttonToShowISTable.addEventListener('click' , function()
{

})

buttonToShowBSTable.addEventListener('click', function()
{
    balanceSheetRadioValue = document.forms.balanceSheetRadio.balanceSheetRadioName.value;

    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            balanceSheetInfo = JSON.parse(http.responseText);
            createTableFromObject(balanceSheetInfo[balanceSheetRadioValue][0] , 'generatedBsTable' , balanceSheetTable)
        }
    }
})

removeBsTable.addEventListener('click', function()
{
    removeTable('generatedBsTable');
})

buttonToShowCFTable.addEventListener('click' , function ()
{
    cashFlowRadioValue = document.forms.cashFlowRadio.cashFlowRadioName.value
    
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=CASH_FLOW&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            cashFlowInfo = JSON.parse(http.responseText);
            createTableFromObject(cashFlowInfo[cashFlowRadioValue][0] , 'generatedCfTable' , cashFlowTable)
        }
    }
})

removeCfTable.addEventListener('click', function()
{
    removeTable('generatedCfTable');
})

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

function turnDisplayBlock(element)
{
    element.style.display = "block"
}

function turnDisplayNone(element)
{
    element.style.display = 'none';
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
    let nodelist = document.getElementById("overviewDataContainer").childNodes;
    
    for(let i = 0; i < nodelist.length; i++)
    {
        if (nodelist[i].id === data)
        {
            dragindex = i
        }
    }
    document.getElementById("overviewDataContainer").replaceChild(document.getElementById(data), e.target);
    document.getElementById("overviewDataContainer").insertBefore(clone,document.getElementById("overviewDataContainer").childNodes[dragindex]);
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

function getIncomeStatementInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let incomeStatementInfo = JSON.parse(http.responseText);
            console.log(incomeStatementInfo[incomeStatementRadioValue]);
            console.log(incomeStatementInfo);
            document.getElementById('IncomeStatementSelectedValue').innerHTML = 'O valor de ' + reqInfoIncomeStatementOptions + ' é ' + JSON.stringify(incomeStatementInfo[incomeStatementRadioValue][0][reqInfoIncomeStatementOptions]) + ' .';
            console.log('O valor de ' + reqInfoIncomeStatementOptions + ' é ' + incomeStatementInfo[incomeStatementRadioValue][0][reqInfoIncomeStatementOptions]);
        }
    }
}

function getBalanceSheetInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let balanceSheetInfo = JSON.parse(http.responseText);
            console.log(balanceSheetInfo);
            document.getElementById('balanceSheetSelectedValue').innerHTML = 'O valor de ' + reqInfoBalanceSheetOptions + ' é ' + JSON.stringify(balanceSheetInfo[balanceSheetRadioValue][0][reqInfoBalanceSheetOptions]) + ' .';
            console.log('O valor de ' + reqInfoBalanceSheetOptions + ' é ' + balanceSheetInfo[balanceSheetRadioValue][0][reqInfoBalanceSheetOptions]);
        }
    }
}

function getCashFlowInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=CASH_FLOW&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            cashFlowInfo = JSON.parse(http.responseText);
            console.log('Cash Flow info retornada pela API é : ' + cashFlowInfo);
            document.getElementById('cashFlowSelectedValue').innerHTML = 'O valor de ' + reqInfoCashFlowOptions + ' é ' + JSON.stringify(cashFlowInfo[cashFlowRadioValue][0][reqInfoCashFlowOptions]) + ' .';
            console.log('O valor de ' + reqInfoCashFlowOptions + ' é ' + cashFlowInfo[cashFlowRadioValue][0][reqInfoCashFlowOptions]);
        }
    }
}


function createSquare()
{
    
    let container = document.getElementById("overviewDataContainer");
    let newSquare = document.getElementById("Square1").cloneNode("Square1");
    let addSquare = document.getElementById("AddSquare");
    
    container.removeChild(addSquare);
    container.appendChild(newSquare);
    container.appendChild(addSquare).after(newSquare);

}