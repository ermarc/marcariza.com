lockScroll();
calculateCurrentAge();

let idInterval = 0;


setTimeout(function() {
    window.scrollTo({top: 0});
    createSecondCardEnterTextInterval();
}, 100)

function startNavigation() {
    smoothScrollDown();
    setTimeout(function() {
        deleteInitialCard();
        unlockScroll();
        window.clearInterval(idInterval);
        createSecondCardTitleInterval();
        fixSecondCardTitle();
        animationObserver('.completionProgress', 1);
        animationObserver('.presentationContainer', 0);
    }, 550);
}

function deleteInitialCard() {
    document.getElementsByClassName('initialCard')[0].remove();
    window.scrollTo({ top: 0 });
}

function smoothScrollDown() {
    window.scrollTo({ top: document.body.getElementsByClassName("initialCard")[0].scrollHeight, behavior: 'smooth' })
}

function lockScroll() {
    document.getElementsByTagName('body')[0].style = 'overflow: hidden';
}

function unlockScroll() {
    document.getElementsByTagName('body')[0].style = 'overflow: visible';
}

function createSecondCardTitleInterval() {
    setInterval(function() {
        smoothContinuousTitleSwap(document.getElementsByClassName('secondCardTitle')[0], 'contact@marcariza.com', 'MARC ARIZA BARRIOS');
    }, 4000);
}

function createSecondCardEnterTextInterval() {
    idInterval = setInterval(function() {
        smoothContinuousTitleSwap(document.getElementsByClassName('secondCardEnterText')[0], 'HAZ CLICK AQUÍ', 'DESCÚBREME');
    }, 2000);
}

function smoothContinuousTitleSwap(element, text1, text2) {
    element.style = 'animation: fullOpacityToZeroOpacity 0.5s forwards';
    setTimeout(function() {
        element.textContent = (element.textContent == text1) ? text2 : text1;
        element.style = 'animation: zeroOpacityToFullOpacity 0.5s forwards;';
    }, 500);
}

function fixSecondCardTitle() {
    let secondCardTitleContainer = document.getElementsByClassName('secondCardTitleContainer')[0];
    secondCardTitleContainer.style = 'position: fixed';
    let staticPositionRetainer = document.getElementsByClassName('staticPositionRetainer')[0];
    staticPositionRetainer.className = 'secondCardTitleContainer';
}

function switchToEmail() {
    window.location = 'mailto:contact@marcariza.com';
}

function animationObserver(elementType, option) {
    const subjectToObserve = document.querySelectorAll(elementType);

    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.7
    };

    let observer = new IntersectionObserver(elementList => {
        elementList.forEach(element => {
            if (element.isIntersecting) {
                option == 0 ? element.target.classList.add('activatedPresentationContainer') : fillProgressBars();
                return;
            }
        });
    }, observerOptions);

    subjectToObserve.forEach(observating => {
        if (observating) {
            observer.observe(observating);
        }
    })
}

function fillProgressBars() {
    let element = document.getElementsByClassName('completionProgress');
    for (let i = 0; i < element.length; i++) {
        element[i].style = `width: ${element[i].title}%; animation: fillTransformX 1s forwards ease-out;`;
    }
}

function addClassList(element) {
    console.log(element);
}

function calculateCurrentAge() {
    let birthDate = new Date('2002', '2', '30');
    let result = Math.abs(new Date((new Date()) - birthDate).getUTCFullYear() - 1970);
    let element = document.getElementsByClassName('myBirthDate')[0];
    element.textContent = element.textContent + ' (' + result + ' años)';
}