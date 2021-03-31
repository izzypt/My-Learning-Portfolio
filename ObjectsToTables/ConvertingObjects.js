import {stocksymbols , testando} from './bigObject.js'

let select = document.getElementById('chosenObject');
let generateButton = document.getElementById('generateTable');
let removeTableButton = document.getElementById('removeTable');

let nomes = 
{
    Marta : 'Ulrich',
    Matilde : 'Bonvalot',
    Tiago : 'Martins',
    Brad : 'Pitt',
    Megan : 'Fox',
}

let capitais = 
{
    Portugal : 'Lisboa',
    England : 'London',
    Spain : 'Madrid',
    France : 'Paris',
    Italy : 'Rome',
    Ireland :'Dublin',
    Germany : 'Berlin',
    Russia : 'Sao Petesburgo',
    USA : 'Washington DC',
}

let clubes =
{
    "Cristiano Ronaldo" : 'Juventus',
    'Diogo Jota' : 'Liverpool',
    'Joao Felix' : 'Atletico Madrid',
    'Bernardo Silva' : 'Manchester City',
    'Joao Cancelo' : 'Manchester City',
    'Ruben Dias' : 'Manchester City',
    'Raphael Guerreio' : 'Borussia Dortmund',
    'Renato Sanches' : 'Lille',
    'Pepe' : 'FC Porto',
    'Sergio Oliveira' : 'Fc Porto',
    'João Palhinha' : 'Sporting CP'
}

function createTable(id , appendToThisElement)
{
    let table = document.createElement("table");
    table.id = id;
    table.style = "border : 1px solid red"
    appendToThisElement.appendChild(table);
}


let addRowToTable = function(tableId , UserInput)
{
    let tableRow = document.createElement("tr");
    tableRow.id = UserInput;
    document.getElementById(tableId).appendChild(tableRow);
}

let addHeaderToRow = function ( rowId , header)
{
    let th = document.createElement("th");
    th.innerText = header;
    th.style = "border : 1px solid red"
    document.getElementById(rowId).appendChild(th);

}

let addDataToRow = function( rowId , data)
{
    let td = document.createElement("td");
    td.innerText = data;
    td.style = "border : 1px solid red"
    document.getElementById(rowId).appendChild(td);
}


let removeTable = function(tableID)
{
    document.getElementById(tableID).remove();
    console.log(' A tabela com o ID "' + tableID + '" foi removida.')
}






function createTableFromObject(object , tableId , appendToThisElement)
{
    createTable(tableId , appendToThisElement)
    
    let i = 0;
    for ( let element in object)
    {
        addRowToTable(tableId , element);
        addHeaderToRow(element, element);
        addDataToRow(element, Object.values(object)[i]);

        i++;
    }
}


generateButton.addEventListener('click' , function()
{
    console.log(select.value);
    function filterValue(input)
    {
        if(input == 'nomes')
            return nomes;
        else if(input == 'capitais')
            return capitais;
        else if (input == 'clubes')
            return clubes;
    }

    createTableFromObject( filterValue(select.value) , select.value , document.body);
    console.log('A tabela com o ID "' + select.value + '" foi gerada.')
})

removeTableButton.addEventListener('click' , function()
{
    function filterValue(input)
    {
        if(input == 'nomes')
            return nomes;
        else if(input == 'capitais')
            return capitais;
        else if (input == 'clubes')
            return clubes;
    }

    removeTable(select.value);
})

