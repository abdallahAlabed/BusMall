'use strict';
let leftImageElement = document.getElementById('img');
let middleImageElement = document.getElementById('img1');
let rightImageElement = document.getElementById('img2');
let counts = 0;
let maxAttempts = 3;
let leftIndex;
let rightIndex;
let middleIndex;
let arrOfVotes = [];

let arrOfShown = [];
let arrOfnames = [];
let arrOfisShown = [];
BusMall.allImages = [];

let table = document.getElementById('table');
let container = document.getElementById('cont');
let button = document.getElementById('btn');


new BusMall('bag', '../images/bag.jpg');
new BusMall('banana', '../images/banana.jpg');
new BusMall('bathroom', '../images/bathroom.jpg');
new BusMall('boots', '../images/boots.jpg');
new BusMall('breakfast', '../images/breakfast.jpg');
new BusMall('bubblegum', '../images/bubblegum.jpg');
new BusMall('chair', '../images/chair.jpg');
new BusMall('cthulhu', '../images/cthulhu.jpg');
new BusMall('dog-duck', '../images/dog-duck.jpg');
new BusMall('dragon', '../images/dragon.jpg');
new BusMall('pen', '../images/pen.jpg');
new BusMall('pet-sweep', '../images/pet-sweep.jpg');
new BusMall('scissors', '../images/scissors.jpg');
new BusMall('tauntaun', '../images/tauntaun.jpg');
new BusMall('unicorn', '../images/unicorn.jpg');
new BusMall('water-can', '../images/water-can.jpg')
new BusMall('wine-glass', '../images/wine-glass.jpg');

///////////////////////////////////////////////////////////////////

function BusMall(productName, imagePath) {
    this.productName = productName;
    this.imagePath = imagePath;
    this.imageShown = 0;
    this.votes = 0;
    BusMall.allImages.push(this);
    arrOfnames.push(this.productName);

};
getLocalStorage();

///////////////////////////////////////////////////////////////////

function genrateRandomIndex() {
    return Math.floor(Math.random() * BusMall.allImages.length);

}

///////////////////////////////////////////////////////////////////
function saveToLs() {

    let arrStr = JSON.stringify(BusMall.allImages);
    localStorage.setItem('products', arrStr);

}


///////////////////////////////////////////////////////////////////

function getLocalStorage() {
    let data = localStorage.getItem('products');
    let order = JSON.parse(data);
    if (order !== null) {
        BusMall.allImages = order;
    }
}


///////////////////////////////////////////////////////////////////

function renderImages() {
    leftIndex = genrateRandomIndex();
    rightIndex = genrateRandomIndex();
    middleIndex = genrateRandomIndex();
    while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex || arrOfisShown.includes(leftIndex) || arrOfisShown.includes(rightIndex) || arrOfisShown.includes(middleIndex)) {
        leftIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();

    }
    arrOfisShown = [];
    leftImageElement.src = BusMall.allImages[leftIndex].imagePath;
    BusMall.allImages[leftIndex].imageShown++;
    arrOfisShown.push(leftIndex);
    rightImageElement.src = BusMall.allImages[rightIndex].imagePath;
    BusMall.allImages[rightIndex].imageShown++;
    arrOfisShown.push(rightIndex);
    middleImageElement.src = BusMall.allImages[middleIndex].imagePath;
    BusMall.allImages[middleIndex].imageShown++;
    arrOfisShown.push(middleIndex);
}

///////////////////////////////////////////////////////////////////

renderImages();
container.addEventListener('click', handleClicking);


///////////////////////////////////////////////////////////////////

function handleClicking(event) {

    if (maxAttempts >= counts) {
        if (event.target.id === 'img' || event.target.id === 'img1' || event.target.id === 'img2') {
            counts++;
            if (event.target.id === 'img') {
                BusMall.allImages[leftIndex].votes++;
            } else if (event.target.id === 'img1') {
                BusMall.allImages[rightIndex].votes++;
            } else if (event.target.id === 'img2') {
                BusMall.allImages[middleIndex].votes++;
            }

            if (counts != maxAttempts) {
                renderImages();
            } else {

                alert('you have finished');
                saveToLs();
                button.addEventListener('click', tableBtn);
                counts = 0;
                handleClicking();
            }

        } else {
            alert('you should click on the image');

        }

    }

}
///////////////////////////////////////////////////////////////////

function voteRender() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = "votes"
    for (let i = 0; i < BusMall.allImages.length; i++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = BusMall.allImages[i].votes;
        arrOfVotes.push(BusMall.allImages[i].votes);

    }
    imageShownRender()
}

///////////////////////////////////////////////////////////////////
function tableRender() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = "name"

    for (let i = 0; i < BusMall.allImages.length; i++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = BusMall.allImages[i].productName;
    }
    voteRender();
}
///////////////////////////////////////////////////////////////////


function imageShownRender() {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = "imageShown"
    for (let i = 0; i < BusMall.allImages.length; i++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = BusMall.allImages[i].imageShown;
        arrOfShown.push(BusMall.allImages[i].imageShown);
    }
    chart();

}
///////////////////////////////////////////////////////////////////
function chart() {
    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrOfnames,
            datasets: [{
                label: 'NumberOfVotes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgb(0,0,0)',
                ],
                borderWidth: 1
            }, {
                label: '# of Shown',
                data: arrOfShown,
                backgroundColor: [
                    "rgb(200,50,50)"
                ],
                borderWidth: 1
            }]
        }
    })
}

///////////////////////////////////////////////////////////////////



function tableBtn() {
    tableRender();
    button.removeEventListener('click', tableBtn);
}

///////////////////////////////////////////////////////////////////