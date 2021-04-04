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
let ulSeparadoresDeAnalise = document.getElementById('ulSeparadoresDeAnalise').children;
let mainContainer = document.getElementById('mainContainer');
let overviewDataContainer = document.getElementById("overviewDataContainer");
let fundamentalDataContainer = document.getElementById('fundamentalDataContainer');
let technicalDataContainer = document.getElementById('technicalDataContainer');
let calendarContainer = document.getElementById('calendarContainer');
let overviewSelectOptions = document.getElementsByClassName("overviewSelectOptions");
let incomeStatementOptions = document.getElementById('incomeStatementOption');
let balanceSheetOptions = document.getElementById('balanceSheetOptions');
let cashFlowOptions = document.getElementById('cashFlowOptions')
let companyLogo = document.getElementById("companyLogo");
let companySymbol;
let cashFlowInfo;
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
        searchedName.innerText = searchBar.value;  
        changeLogoImage(searchBar.value);
        giveCompanieSymbol(searchBar.value);
        TurnVisible(companyLogo);
        TurnVisible(overviewDataContainer);
        TurnVisible(separadoresAnalise);
        TurnVisible(personaliseParagrafo);
        turnDisplayBlock(mainContainer);
        console.log('This should come first')
        objectForChart();
    }
)

for (let y = 0; y < ulSeparadoresDeAnalise.length ; y++)
    ulSeparadoresDeAnalise[y].addEventListener('click' , function(event){
        for (let x = 0; x < ulSeparadoresDeAnalise.length; x++)
            if (ulSeparadoresDeAnalise[x] == event.target)
            {
                ulSeparadoresDeAnalise[x].style = "text-decoration: overline black;";
                console.log(ulSeparadoresDeAnalise[x].id)
                switch(ulSeparadoresDeAnalise[x].id)
                {
                    case 'overviewDataButton' :
                        turnDisplayBlock(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'fundamental' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayBlock(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'technicalSeparadorButton' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayBlock(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'calendarSeparadorButton' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayBlock(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'recentNewsSeparador' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayBlock(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'nextEventsSeparador' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayBlock(nextEventContainer);
                        break;
                }
            }
            else
                ulSeparadoresDeAnalise[x].style = "text-decoration: none;";
    })

for(let x = 0; x < overviewSelectOptions.length; x++) 
    {
        overviewSelectOptions[x].addEventListener("change" , function()
        {
            console.log(overviewSelectOptions[x].value)
            getOverviewStatistic(companySymbol , overviewSelectOptions[x].value , overviewSelectOptions[x])
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

buttonToShowISTable.addEventListener('click' , function()
{
    incomeStatementRadioValue = document.forms.incomeStatementRadio.incomeStatementRadioName.value;

    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + companySymbol + "&apikey=NK2X3UYDTIVZTR0Q");
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            incomeStatementInfo = JSON.parse(http.responseText);
            createTableFromObject(incomeStatementInfo[incomeStatementRadioValue][0] , 'generatedIsTable' , incomeStatementTable)
        }
    }
})

removeIsTable.addEventListener('click', function()
{
    removeTable('generatedIsTable');
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

function changeLogoImage(str)
{ 
    
    companyImageLink.src = "https://logo.clearbit.com/" + str + ".com"
    
    companyImageLink.addEventListener("error" , function (){ 
        searchedName.innerHTML = "Sorry, we could not find  a logo with that name"
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

function getOverviewStatistic(companySymbol , statistic, square)
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


var ctx = document.getElementById('myChart').getContext('2d');
let arrayOfMonths = [];
let arrayOfPricePerMonth = [];

let arrayOfDays = [];
let arrayOfPricePerDay = [];

function objectForChart()
{
    let http = new XMLHttpRequest();

    http.open('GET' , 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + companySymbol + '&apikey=NK2X3UYDTIVZTR0Q');
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let responseObject = JSON.parse(http.response);

            for(let month in responseObject['Monthly Time Series'] )
            {
                arrayOfMonths.push(month);
                arrayOfPricePerMonth.push(responseObject['Monthly Time Series'][month]['4. close']);
            }
            console.log('This should come 2nd');
            //displayChart();
        }
    }
}

    function displayChart(x, y)
    {   
        let numeroDeMeses = arrayOfMonths.slice(x,y)
        let precoDosMeses = arrayOfPricePerMonth.slice(x,y)
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: numeroDeMeses.reverse(),
                datasets: [{
                    label: searchBar.value + ' (Close Price of the Month)',
                    backgroundColor: 'rgba(17, 141, 69, 0.8)',
                    borderColor: 'black',
                    data: precoDosMeses.reverse(),
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    }

    let chartTimePeriodButtons = document.getElementById('chartTimePeriodButtons').children

    for(let x = 0; x < chartTimePeriodButtons.length; x++) 
    {
        chartTimePeriodButtons[x].addEventListener("click" , function(event)
        {

            if (event.target.innerText == '1 Day')
               console.log('Work here later')
            else if (event.target.innerText == '5 Day')
                console.log('Work here later')
            else if (event.target.innerText == '1 Month')
                displayDailyChart(0, 30)
            else if(event.target.innerText == '3 Month')
                displayDailyChart(0, 90)
            else if(event.target.innerText == '1 Year')
                displayChart(0, 12)
            else if(event.target.innerText == '5 Year')
                displayChart(0, 60)
        })
    }

    function displayDailyChart(x, y)
    {   
        let http = new XMLHttpRequest();

        http.open('GET' , 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ companySymbol + '&apikey=NK2X3UYDTIVZTR0Q');
        http.send();
        http.onreadystatechange = function() 
        {
            if (http.readyState == XMLHttpRequest.DONE) 
            {
                let responseObject = JSON.parse(http.response);

                for(let day in responseObject['Time Series (Daily)'] )
                {
                    arrayOfDays.push(day);
                    arrayOfPricePerDay.push(responseObject['Time Series (Daily)'][day]['4. close']);
                }
            console.log('This is the displayDailyChart function');
            //displayChart();
            }
        }
    
        let numeroDeDias = arrayOfDays.slice(x,y)
        let precoDosDias = arrayOfPricePerDay.slice(x,y)
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: numeroDeDias.reverse(x , y),
                datasets: [{
                    label: searchBar.value + ' (Closing Price of the day)',
                    backgroundColor: 'rgba(17, 141, 69, 0.8)',
                    borderColor: 'black',
                    data: precoDosDias.reverse(x, y),
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    
    }

 /*   const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news?symbols=PLUG");
xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");

xhr.send(data);*/