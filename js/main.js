'use strict';
let x = 0;
let y = 0;
let leftImageElement = document.getElementById('img');
let middleImageElement = document.getElementById('img1');
let rightImageElement = document.getElementById('img2');
let counts = 0;
let maxAttempts = 25;
let leftIndex;
let rightIndex;
let middleIndex;
BusMall.allImages = [];
let table = document.getElementById('table');

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
    while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex) {
        leftIndex = genrateRandomIndex();
        rightIndex = genrateRandomIndex();
        middleIndex = genrateRandomIndex();

    }

    leftImageElement.src = BusMall.allImages[leftIndex].imagePath;
    BusMall.allImages[leftIndex].imageShown++;
    x++;
    rightImageElement.src = BusMall.allImages[rightIndex].imagePath;
    BusMall.allImages[rightIndex].imageShown++;
    x++;
    middleImageElement.src = BusMall.allImages[middleIndex].imagePath;
    BusMall.allImages[middleIndex].imageShown++;
    x++;
}

///////////////////////////////////////////////////////////////////

renderImages();
leftImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);
middleImageElement.addEventListener('click', handleClicking);

///////////////////////////////////////////////////////////////////

function handleClicking(event) {

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
            tableRender();
            leftImageElement.removeEventListener('click', handleClicking);
            rightImageElement.removeEventListener('click', handleClicking);
            middleImageElement.removeEventListener('click', handleClicking);

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
        td.textContent = BusMall.allImages[i].votes
    }
    imageShownRender()
}

///////////////////////////////////////////////////////////////////
function tableRender(){
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
        td.textContent = BusMall.allImages[i].imageShown
    }
}
