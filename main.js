// correct and best way - callbacks
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`

}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// caling the function to write to the document, the type ie: people, film, starships etc
function writeToDocument(url) {
    var el =document.getElementById("data");
    el.innerHTML = "";

    getData(url, function(data) {

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        }

        var tableRows = [];
       // console.dir(data); - removed and overwritten
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0,15)
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            // el.innerHTML += "<p>" + item.name + "</p>";
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
        // document.getElementById("data").innerHTML = data.results; - cut and used in forEach loop.
    });
}

/*
getData(function(data) {
    console.log(data);
});

// another way of doing it is to create another function that logs to console. 
function printDataToConsole(data) {
    console.log(data);
}
getData(printDataToConsole); */ // remove this once we have the correcxt data to the console. 



/*var xhr = new XMLHttpRequest();


var data;
*/
/*
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};
*/

/*
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(typeof(JSON.parse(this.responseText)));
    }
};
*/

/*xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
    }
};*/

/*xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
    }
};

console.log(data); // wrong
*/

/*
xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");

xhr.send();
*/

/*
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = this.responseText;
        console.log(data);
    }
};
*/

/*
function setData(jsonData) {
    data = jsonData;
    console.log(data);
}

xhr.onreadystatechange = function () {
    console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));
    }
};
*/

/*
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
    }
};

setTimeout(function () {
    console.log(data);
}, 500);
*/