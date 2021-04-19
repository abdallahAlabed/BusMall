'use strict';
let x = 0;
let y = 0;
let leftImageElement = document.getElementById('img');
let middleImageElement = document.getElementById('img1');
let rightImageElement = document.getElementById('img2');
let counts = 0;
let maxAttempts = 20;
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

///////////////////////////////////////////////////////////////////

function genrateRandomIndex() {
    return Math.floor(Math.random() * BusMall.allImages.length);

}

///////////////////////////////////////////////////////////////////

function renderImages() {
    leftIndex = genrateRandomIndex();
    rightIndex = genrateRandomIndex();
    middleIndex = genrateRandomIndex();
    while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex || arrOfShown.includes(leftIndex) || arrOfShown.includes(rightIndex) || arrOfShown.includes(middleIndex)) {
        leftIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();

    }
    arrOfShown = [];
    leftImageElement.src = BusMall.allImages[leftIndex].imagePath;
    BusMall.allImages[leftIndex].imageShown++;
    arrOfShown.push(leftIndex);
    rightImageElement.src = BusMall.allImages[rightIndex].imagePath;
    BusMall.allImages[rightIndex].imageShown++;
    arrOfShown.push(rightIndex);
    middleImageElement.src = BusMall.allImages[middleIndex].imagePath;
    BusMall.allImages[middleIndex].imageShown++;
    arrOfShown.push(middleIndex);
}
console.log(arrOfShown);
///////////////////////////////////////////////////////////////////

renderImages();
container.addEventListener('click', handleClicking);


///////////////////////////////////////////////////////////////////

function handleClicking(event) {

    if (event.target.id === 'img' || event.target.id === 'img1' || event.target.id === 'img2') {
        counts++;
        if (maxAttempts >= counts) {
            if (event.target.id === 'img') {
                BusMall.allImages[leftIndex].votes++;
                y++;
            } else if (event.target.id === 'img1') {
                BusMall.allImages[rightIndex].votes++;
                y++;
            } else if (event.target.id === 'img2') {
                BusMall.allImages[middleIndex].votes++;
                y++;
            }
            if (counts != maxAttempts)
                renderImages();
            else {
                alert('you have finished');

                container.removeEventListener('click', handleClicking);
            }

        }
    } else {
        alert('you should click on the image');
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

let button = document.getElementById('btn');
button.addEventListener('click', tableRender);

function tableRender() {
    voteRender();
    chart();

    button.removeEventListener('click', tableRender);
}