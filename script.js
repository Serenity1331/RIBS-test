init();

function init() {
    navigateImagesListener();
    slideNumsListener();
    shadowyLineListener();
}

function shadowyLineListener() {
    let redProject = document.querySelector('.redRect__title');
    let blackLine = document.querySelector('.shadowyLine');
    let links = document.querySelectorAll('.nav ul li');

    redProject.addEventListener('mouseover', () => blackLine.style.visibility = 'visible');
    redProject.addEventListener('mouseleave', () => blackLine.style.visibility = 'hidden');

    links.forEach(link => {

        link.addEventListener('mouseleave', () => {
            blackLine.style.visibility = 'hidden';
            blackLine.style.width = '150px';
        });

        link.addEventListener('mouseover', () => {
            blackLine.style.visibility = 'visible';
            blackLine.style.width = link.offsetWidth + 'px';
        });
    })
}

// prevents clicks during the animation phase
function preventClicks() {
    
    let slideNums = document.querySelectorAll('.slideNums ul li');
    slideNums.forEach(number => {
        number.style.pointerEvents = 'none';
        setTimeout(() => number.style.pointerEvents = 'auto', 1200);
    });

    let navBtns = document.querySelectorAll('.btn');
    navBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        setTimeout(() => btn.style.pointerEvents = 'auto', 1200);
    })

}

function slideNumsListener() {

    let imageCollection = getImageUrlCollection();
    let slideNums = document.querySelectorAll('.slideNums ul li');

    slideNums.forEach(slide => {
        slide.addEventListener('click', function() {

            //getting the current and the new image number 
            let currentNumber = getChosenImageNum();
            let newNumber = this.getAttribute('num');
            let src = imageCollection[newNumber][0];
            let newProjectId = imageCollection[newNumber][1];

            // choosing new image and displaying it
            unselectImages();
            this.classList.add('chosen');

            if (currentNumber < newNumber) showNextImage(src);
            if (currentNumber > newNumber) showPreviousImage(src);

            preventClicks();
            updateProjectNumber(newProjectId);

        })
    })
}

function getChosenImageNum() {
    let chosen = document.querySelector('.chosen');
    let num = chosen.getAttribute('num');
    return +num;
}

function navigateImagesListener() {
    
    let btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            preventClicks();
            navigateImages(e);
        })
    });
}

// unselect all -> no image is chosen
function unselectImages() {
    let chosen = document.querySelector('.chosen');
    chosen.classList.remove('chosen');
}

function createImage(link) {

    let newImage = document.createElement('img');
    newImage.classList.add('image');
    newImage.setAttribute('src', link);
    return newImage;

}

function insertImage(elem, position) {

    let container = document.querySelector('.img-container');  
    if (position === 'next') container.insertAdjacentElement('beforeend', elem);
    if (position === 'previous') container.insertAdjacentElement('afterbegin', elem);

}

function showPreviousImage(link) {
    
    let newImage = createImage(link);
    insertImage(newImage, 'previous');

    let images = document.querySelectorAll('.image');
    images.forEach(img => img.style.transform = `translate(-100%)`);

    // scaling up phase
    setTimeout(() => {
        images.forEach(img => {
            img.style.transform = `translate(-80%) scale(1.1) `;
            img.style.transition = "transform 0.5s ease-in";
            img.classList.add('scale');
        });
    }, 200);

    // scaling down phase
    setTimeout(() => {
        images.forEach(img => {
            img.style.transform = `translate(0) scale(1) `;
            img.style.transition = "transform 0.5s ease";
            img.classList.add('scale');
        });
    }, 700);

    setTimeout(function() {
        images[1].remove();
        newImage.style.transform = 'translate(0)';
        newImage.style.transition = 'none';
    }, 1200);

}

function showNextImage(link) {

    let newImage = createImage(link);
    insertImage(newImage, 'next');

    let images = document.querySelectorAll('.image');

    // scaling up phase
    setTimeout(() => {
        images.forEach(img => {
            img.style.transform = `translate(-20%) scale(1.1)`;
            img.style.transition = "transform 0.5s ease-in";
            img.classList.add('scale');
        });
    }, 200);

    // scaling down phase
    setTimeout(() => {
        images.forEach(img => {
            img.style.transform = `translate(-100%) scale(1)`;
            img.style.transition = "transform 0.5s ease";
            img.classList.add('scale');
        });
    }, 700);

    setTimeout(function() {
        images[0].remove();
        newImage.style.transform = 'translate(0)';
        newImage.style.transition = 'none';
    }, 1200);

}

function navigateImages(e) {

    let next = document.querySelector('.btns__arrow_next');
    let prev = document.querySelector('.btns__arrow_prev');
    let currentNumber = getChosenImageNum();
    let src;

    // hardcoded for now, but can be easily changed in future
    if (e.target === next && currentNumber === 4) return;
    if (e.target === prev && currentNumber === 1) return;

    let imageCollection = getImageUrlCollection();

    if (e.target === next) {
        currentNumber += 1;
        src = imageCollection[currentNumber][0];
        showNextImage(src);
    }
    
    if (e.target === prev) {
        currentNumber -= 1;
        src = imageCollection[currentNumber][0];
        showPreviousImage(src);
    }
    
    // updating project and image number
    let projectId = imageCollection[currentNumber][1];
    updateProjectNumber(projectId);
    updateImageNumber(currentNumber);

}

function updateProjectNumber(projectId) {

    let project = document.querySelector('.projectNum div');
    project.innerHTML = `${projectId}`;

}

function updateImageNumber(num) {

    unselectImages();
    let slideNums = document.querySelectorAll('.slideNums ul li');
    slideNums[num-1].classList.add('chosen'); 

}

function getImageUrlCollection() {
    return {
        1: ["images/house-min.jpg", "S047"],
        2: ["images/diningRoom-min.jpg", "S045"],
        3: ["images/studio-min.jpg", "S016"],
        4: ["images/milan-min.jpg", "S001"],
    }
}



