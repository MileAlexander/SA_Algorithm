const studentCard = (student) => {
    return `
        <div class="container py-4">
            <p>${student}</p>
        </div>
        <button id="refresh" class="btn btn-primary mt-1" onclick="window.location.reload()">Refresh</button>
    `
};

const rootElement = document.getElementById("root");

const getCSVData = async ()=>{
    const response = await fetch("csv", {
        method: 'get',
        headers: {
            'content-type': 'text/csv;charset=UTF-8',
        }
    });
    const responseJson = await response.json();
    
    let greatest = -Infinity;
    let key;
    let secondaryKey;
    let student;
    for (let x in responseJson) {
        if (parseInt(responseJson[x][2]) > greatest) {
            key = responseJson[x][2];
            secondaryKey = responseJson[x][1];
            student = responseJson[x][0];
            greatest = responseJson[x][2];
        } else 
        if(parseInt(responseJson[x][2]) === parseInt(greatest) && parseInt(responseJson[x][1]) > parseInt(secondaryKey)) {
            key = responseJson[x][2];
            secondaryKey = responseJson[x][1];
            student = responseJson[x][0];
            greatest = responseJson[x][2];
        };
        /*
        else 
        if(parseInt(responseJson[x][2]) === parseInt(greatest) && parseInt(responseJson[x][1]) === parseInt(secondaryKey)) {

        }
        */
    };
        
    rootElement.insertAdjacentHTML("beforeend", studentCard(student));
};
getCSVData();

/*
let file = null
const formData = new FormData()
formData.append(file, file)

fetch('/csv', {
    method: 'POST',
    body: formData
})
.then((response) => response.json())
.then(({ data }) => {
if (data.length) {
    const columns = data[0]
    const rows = data.splice(1).map((arr) => {
    const obj = {}
        columns.forEach((column, index) => {
            obj[column] = arr[index]
        })
        return obj
    })

    console.log(rows, columns)

    } else {
        alert('The CSV is empty')
    }
})
.catch((e) => alert(e.message))
*/
