var actionAndAdventureFilms = document.querySelector('#action-and-adventure');
var animationFilms = document.querySelector('#animation');
var biographyFilms = document.querySelector('#biography');
var comedyFilms = document.querySelector('#comedy');
var dramaFilms = document.querySelector('#drama');
var fantasyFilms = document.querySelector('#fantasy');
var scienceFictionFilms = document.querySelector('#science-fiction');
var childrenFilms = document.querySelector('#children');
var musicalFilms = document.querySelector('#musical');
var horrorFilms = document.querySelector('#horror');
var thrillerFilms = document.querySelector('#thriller');
var btnContrast = document.querySelector('.btn-contrast');
var btnIncreaseFont = document.querySelector('.btn-increase-font');
var btnDecreaseFont = document.querySelector('.btn-decrease-font');
var btnsLinkGroup = document.querySelectorAll('.btn-link-group');
var html = document.querySelector('html');

var themeDefault = 'theme_default';
var themeDark = 'theme_default_dark';
var maxFontSize = 14;
var minFontSize = 6;
var currentFontSize;
var currentWidthWindow;

var allCategories = [
  'Ação e Aventura',
  'Animação',
  'Biografia',
  'Comédia',
  'Infantil',
  'Drama',
  'Fantasia',
  'Terror',
  'Musical',
  'Ficção Científica',
  'Suspense'
];

/* Acessando a API, Criando os itens do carroussel e populando os itens */
var xhr = new XMLHttpRequest();
var url = 'https://sky-frontend.herokuapp.com/movies';

xhr.onreadystatechange = function() {
  if (this.status === 200 && this.readyState === 4) {
      filterResponse(JSON.parse(this.responseText));
      initCarousel();
  }
};

xhr.open('GET', url, true);
xhr.send();

function filterResponse(res) {
  var mainMovies = res.filter(function(resMainMovies) {
    return resMainMovies.type === 'highlights';
  });

  createHighlight(mainMovies[0].items);

  var allMovies = res.filter(function(r) {
    return r.type === 'carousel-portrait' }
  );

  allCategories.forEach(function(category) {
    var movies = allMovies[0].movies.filter(function(cat) {
      return cat.categories.indexOf(category) !== -1;
    });

    createFilm(movies, category);
  });
}

function createFilm(movies, titleCategory) {
  if (movies.length > 0) {
    createItensCarousel(movies, false, titleCategory);
  }
}

function createItensCarousel(movies, highlight, titleCategory) {
  var carousel = document.createElement('div');
  carousel.setAttribute('class', highlight ? 'carousel-highlight' : 'carousel');
  
  movies.forEach(function(movie) {
    var createLink = document.createElement('a');
    createLink.setAttribute('href', '#' + movie.title);
    createLink.setAttribute('title', movie.title);
    
    var createImg = document.createElement('img');
    createImg.setAttribute('class', 'movie');
    createImg.setAttribute('alt', movie.title);
    createImg.setAttribute('src', movie.images[0].url);
    
    createLink.appendChild(createImg);
    
    if (!highlight) {
      var createIcon = document.createElement('i');
      createIcon.setAttribute('class', 'icon-cart');
      createIcon.setAttribute('aria-hidden', 'true');
      createLink.appendChild(createIcon);
    }

    var createItemCarousel = document.createElement('div');
    createItemCarousel.setAttribute('class', 'item-carousel');
    createItemCarousel.appendChild(createLink);

    carousel.appendChild(createItemCarousel);
  });

  if (!highlight && titleCategory) {
    var createTitleCategory = document.createElement('p');
    createTitleCategory.setAttribute('class', 'category text_primary');
    createTitleCategory.innerHTML = titleCategory;

    switch(titleCategory) {
      case 'Ação e Aventura':
          actionAndAdventureFilms.appendChild(createTitleCategory);
          actionAndAdventureFilms.appendChild(carousel);
        break;
      case 'Animação':
          animationFilms.appendChild(createTitleCategory);
          animationFilms.appendChild(carousel);
        break;
      case 'Biografia':
          biographyFilms.appendChild(createTitleCategory);
          biographyFilms.appendChild(carousel);
        break;
      case 'Comédia':
          comedyFilms.appendChild(createTitleCategory);
          comedyFilms.appendChild(carousel);
        break;
      case 'Drama':
          dramaFilms.appendChild(createTitleCategory);
          dramaFilms.appendChild(carousel);
        break;
      case 'Fantasia':
          fantasyFilms.appendChild(createTitleCategory);
          fantasyFilms.appendChild(carousel);
        break;
      case 'Ficção Cientifica':
          scienceFictionFilms.appendChild(createTitleCategory);
          scienceFictionFilms.appendChild(carousel);
        break;
      case 'Infantil':
          childrenFilms.appendChild(createTitleCategory);
          childrenFilms.appendChild(carousel);
        break;
      case 'Musical':
          musicalFilms.appendChild(createTitleCategory);
          musicalFilms.appendChild(carousel);
        break;
      case 'Suspense':
          thrillerFilms.appendChild(createTitleCategory);
          thrillerFilms.appendChild(carousel);
        break;
      case 'Terror':
          horrorFilms.appendChild(createTitleCategory);
          horrorFilms.appendChild(carousel);
        break;
      default:
        break;
    }
  } else {
    document.querySelector('#highlight').appendChild(carousel);
  }
}

function createHighlight(highlight) {
  createItensCarousel(highlight, true, false);
}

function initCarousel() {
  carouselHighlight();
  carouselCategories();
}

function carouselCategories() {
  $('.carousel').slick({
    infinite: false,
    variableWidth: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8
        }
      }
    ]
  });
}

function carouselHighlight() {
  $('.carousel-highlight').slick({
    variableWidth: true,
    mobileFirst: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          dots: true
        }
      }
    ]
  });
}

/* Controles do Header */
btnContrast.addEventListener('click', function() {
  var body = document.body;
  body.setAttribute('class', body.getAttribute('class') === themeDefault ? themeDark : themeDefault);
});

btnIncreaseFont.addEventListener('click', function() {
  currentFontSize = parseInt(html.style.fontSize.replace('px', ''));

  if (currentFontSize !== maxFontSize) {
    currentFontSize++

    html.style.fontSize = currentFontSize + 'px';
  }
});

btnDecreaseFont.addEventListener('click', function() {
  currentFontSize = parseInt(html.style.fontSize.replace('px', ''));

  if (currentFontSize !== minFontSize) {
    currentFontSize--

    html.style.fontSize = currentFontSize + 'px';
  }
});

/* Accordion Footer */
window.onload = function() {
  currentWidthWindow = window.innerWidth;
  initAccordion();
};

function initAccordion() {
  btnsLinkGroup.forEach(function(btn) {
    if (currentWidthWindow < 1024 && btn.nextElementSibling) {
        btn.nextElementSibling.querySelectorAll('.link-accordion').forEach(function(linkAccordion) {
          linkAccordion.setAttribute('tabindex', '-1');
        });

      btn.addEventListener('click', function(e) {
        handleClick(e);
      });
    } else if (btn.nextElementSibling) {
        btn.nextElementSibling.querySelectorAll('.link-accordion').forEach(function(linkAccordion) {
          linkAccordion.removeAttribute('tabindex');
        });

      btn.removeEventListener('click',  function(e) {
        handleClick(e);
      });
    }
  });
}

function handleClick(e) {
  var target = e.target;

  if (target.getAttribute('class').indexOf('active') === -1) {
    target.classList.add('active');
    target.nextElementSibling.classList.add('active');
    target.setAttribute('aria-expanded', 'true');
    target.nextElementSibling.setAttribute('aria-hidden', 'false');
    target.nextElementSibling.querySelectorAll('.link-accordion').forEach(function(linkAccordion) {
      linkAccordion.removeAttribute('tabindex');
    });
  } else {
    target.classList.remove('active');
    target.nextElementSibling.classList.remove('active');
    target.setAttribute('aria-expanded', 'false');
    target.nextElementSibling.setAttribute('aria-hidden', 'true');

    target.nextElementSibling.querySelectorAll('.link-accordion').forEach(function(linkAccordion) {
      linkAccordion.setAttribute('tabindex', '-1');
    });
  }
}

function setAttributeAccordion() {
  btnsLinkGroup.forEach(function(btn) {
    if (currentWidthWindow < 1024) {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('active');

      if (btn.nextElementSibling) {
        btn.nextElementSibling.setAttribute('aria-hidden', 'true');
        btn.nextElementSibling.classList.remove('active');
      }
    } else {
      btn.classList.remove('active');
      btn.removeAttribute('aria-expanded', 'true');

      if (btn.nextElementSibling) {
        btn.nextElementSibling.querySelectorAll('.link-accordion').forEach(function(linkAccordion) {
          linkAccordion.removeAttribute('tabindex', '-1');
        });
        btn.nextElementSibling.classList.remove('active');
        btn.nextElementSibling.removeAttribute('aria-hidden', 'false');
      }
    }
  });
}

window.addEventListener('resize', function() {
  currentWidthWindow = window.innerWidth;

  if (currentWidthWindow < 1024) {
    initAccordion();
  }

  setAttributeAccordion();
});
