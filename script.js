const loadingContainer = document.querySelector('.loading');
const loadingText = document.querySelectorAll('.loading__letter');
const siteHeader = document.querySelector('.header');
const siteContainer = document.querySelector('.main-container');
const allSections = document.querySelectorAll('.sections');
const articleBtn = document.querySelectorAll('.article__link');
const articleSpan = document.querySelectorAll('.article__span');
const articleLoader = document.querySelectorAll('.article__link--loading');

//Makes the letters from the loading animation come one after another
for(let i = 0; i < loadingText.length; i++){
    setTimeout(() => {
        loadingText[i].style.animation ="slide-up 1s forwards";
    }, i*500);
}

//Makes the loading screen dissapear when all elements from the page are fully loaded

window.addEventListener('load', () => {
    //I added this setTimeout just so you can see the animation. Without it there would be no chance of seeing it since everything loads in a matter of milliseconds.
    setTimeout(() =>{
    loadingContainer.classList.add('visibility');
    siteHeader.classList.remove('none');
    siteContainer.classList.remove('none');
    }, 4500);
});

//Reveal sections

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.10,
  });
  
  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('hidden');
  });

// Activate/Deactivate button loader on click
articleBtn.forEach(e => {
    e.addEventListener('click', ()=> {
        e.children[0].classList.toggle('visibility');
        e.children[1].classList.toggle('visibility')
    })
});

const imageCarousel = function () {
    const carouselCards = document.querySelectorAll('.carousel__card');
    const btnLeft = document.querySelector('.left-arrow');
    const btnRight = document.querySelector('.right-arrow');
    let currentCard = 3;
    const maxCards = carouselCards.length -5;


    console.log(carouselCards);
    const slide = function (card) {
        carouselCards.forEach(
          (c, i) => (c.style.transform = `translateX(${100 * (i - card)}%)`)
        );
      };
    slide();

    const nextCard = function () {
        if (currentCard === maxCards - 1) {
          currentCard = 0;
        } else {
          currentCard++;
        }
    
        slide(currentCard);
      };
    
      const prevCard = function () {
        if (currentCard === 0) {
          currentCard = maxCards - 1;
        } else {
          currentCard--;
        }
        slide(currentCard);
      };
    
      const init = function () {
        slide(0);
      };
      init();
    
      btnRight.addEventListener('click', nextCard);
      btnLeft.addEventListener('click', prevCard);
    
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevCard();
        e.key === 'ArrowRight' && nextCard();
      });
};

imageCarousel();
