"use strict";

/////////////variables /////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const position1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav-links");
const tabContainers = document.querySelector(".operations__tab-container"); //container
const tabs = document.querySelectorAll(".operations__tab"); //buttons
const tabContent = document.querySelectorAll(".operations__content"); //content
const navContent = document.querySelector(".navigation");
const nav = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");

///////////////////modal windows///////////////////////
///////////////////open modal///////////////////////////
const openModal = function (e) {
  e.preventDefault();
  /* prevent the ancor jump at the top */
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//////////////////close modal///////////////////////////////
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
/* buttons background blur and button open form 
for each button pass the function openModal when we
click it */
///////////btnsOpenModal only two buttons
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
////////////////overlay blur efect////////////////////
overlay.addEventListener("click", closeModal);

//////////when the user press the scape button it close the modal////////
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
/////////////////////////////////////////////////
/////////////////buttton scrolling//////////////
btnScroll.addEventListener("click", function (e) {
  const positionWindow = position1.getBoundingClientRect();
  // console.log(btnScroll.getBoundingClientRect());
  // console.log(window.pageXOffset, pageYOffset);
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //console.log(positionWindow);
  // window.scrollTo({ top: 100, left: 100, behavior: "smooth" });
  // window.scrollTo(positionWindow.left, positionWindow.top);
  position1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////////
//getAttribute("href") is a method used to get the value of an element’s href attribute.
//For example, if you have an anchor element with an id of “easy”, you can get
//the value of its href attribute and place it in a variable
//called href using the following code:
//let href = document.getElementById('easy').getAttribute('href')
/* navLink.forEach(function (el) {
  el.addEventListener("click", function (event) {
    //To use the preventDefault() it need to pass the event
    //object as a parameter to the function
    event.preventDefault();
    //The this keyword refers to the element on which the current function is being called.
    //if this line of code is inside an event listener that is attached to a link element,
    //this will refer to that link element.
    const id = event.target.getAttribute("href");
    console.log(id);
    //can’t call targetId.scrollIntoView() because targetId is a string,
    //not an element.IT need to use document.querySelector(id)
    //to select the element with the corresponding id,
    //and then call scrollIntoView() on that element.
    //  BUG! = id.scrollIntoView({ behavor: "smooth" });
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
 */
///////////////////////event delegations///////////////////////
navLinks.addEventListener("click", function (el) {
  el.preventDefault();
  if (el.target.classList.contains("nav-link")) {
    // if into classList of Ul are "nav-link" classes
    //console.log(el.target.className); //class name
    // console.log(el.target.classList); //show classes
    // console.log(el.target.tagName); //show the a of anchor
    //console.log(el.target.attributes[1]); //show of the attributes [1]shows href
    const id = el.target.getAttribute("href"); // get a specific atributte
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
////////////////////////operation session///////////////////q

tabs.forEach((button) =>
  button.addEventListener("click", function (listen) {
    const clicked = listen.target.closest(".operations__tab");

    ///////////////////buttons///////////////

    tabs.forEach((button) => {
      button.classList.remove("operations__tab--active");
    });

    clicked.classList.add("operations__tab--active");

    ////////////////content////////////////
    console.log(clicked);
    tabContent.forEach((content) =>
      content.classList.remove("operations__content--active")
    );
    tabContent[clicked.dataset.tab - 1].classList.add(
      "operations__content--active"
    );
  })
);
//////////////////////efect nav using bind////////////////////
const handleNav = function (thisKeyword) {
  if (thisKeyword.target.classList.contains("nav-link")) {
    const link = thisKeyword.target;
    const siblings = link.closest(".navigation").querySelectorAll(".nav-link");
    siblings.forEach((navLinks) => {
      if (navLinks !== link) {
        link.style.transform = `translateY(${this - 1}px)`;
        navLinks.style.opacity = this;
      }
    });
  }
};

navContent.addEventListener("mouseover", handleNav.bind(0.5));
navContent.addEventListener("mouseout", handleNav.bind(2));
/* 
const handss = function (a, b, c) {
  console.log(a, "position 1");
  console.log(b, "position 2");
  console.log(c, "position 3");//event move to the position 3
};

document
  .querySelector(".header")
  .addEventListener("mouseout", handss.bind("a", "b", "c")); */
//////////////adding navigation sticky//////////////////q
//getBoundingClientRect;returns the
//size and position of an element relative to the viewport
/* let windowsTop;

const initialCoords = position1.getBoundingClientRect();
window.addEventListener("scroll", function () {
  //getBoundingClientRect returns has eight
  //properties: left, top, right, bottom, x, y, width, and height
  //console.log(window.scrollY, "top windows"); //get the windows top
  //console.log(initialCoords.top, "initialcords"); //get the position1 top relative to the vh
  windowsTop = window.scrollY;
  if (windowsTop > initialCoords.top - 50) navContent.classList.add("sticky");
  if (windowsTop < initialCoords.top) navContent.classList.remove("sticky");
});

// Create a new intersection observer
const callBackObs = function (entries, observe) {
  entries.forEach((entry) => console.log(entry));
};

const observerOptions = {
  root: null, //is the element we want to intersect in this case the null to check the entire viewport
  threshold: 0.1, //porcentage of intersection o to 1,
  //0.1 =10%
  //in this case we call  the callBackUbs when the function has observe all the viewport
  //and .25, intersectionRatio: is 0.10(0.10 the distance of position1)
};
const observer = new IntersectionObserver(callBackObs, observerOptions);
observer.observe(position1);
 */

const MarginNav = navContent.getBoundingClientRect().height;
//taking the nav height to apply the margin into the object passin in intersectionObserver

const stickyNavigation = function (entries) {
  //console.log(entries); array of IntersectionObserver entries
  const [entry] = entries; //unpack the array and take the object
  //console.log(entry);
  //if entry.intersecting === false
  if (!entry.isIntersecting)
    navContent.classList.add("sticky"); //entry.isIntersecting ==== false
  else navContent.classList.remove("sticky"); //entry.isIntersecting ==== true
  //0= is our intersection define by threshold when we move out of 0% apply
  // the logic !entry.isIntersectinhg
};

const objIntersection = {
  root: null, // check viewport
  threshold: 0, //begin from the same element
  rootMargin: `-${MarginNav}px`, // mandatory pass string and pixel
  // rootmargin aply margin in our intersection (-)margin into the element itself
  //we took the ha
};

const observer = new IntersectionObserver(stickyNavigation, objIntersection);
observer.observe(header); //passing our target to the API

/////////////////////revealing elements scrolling down//////////////

const scrollingSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const revealingSections = new IntersectionObserver(scrollingSections, {
  root: null,
  threshold: 0.19,
});
allSections.forEach((section) => {
  revealingSections.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////lazig loading////////////////////////////////////////
/*<div id="user" data-id="1234567890" 
data-user="carinaanand" data-date-of-birth>Carina Anand</div>
const el = document.querySelector("#user");
el.dataset.id // returns "1234567890"
el.dataset.user // returns "carinaanand"
el.dataset.dateOfBirth // returns ""
 */
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //if not  intersecting return the function
  entry.target.src = entry.target.dataset.src;
  // we change the lazy img assign the [data-src]
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

///////////////////////slider/////////////////////////
const sliders = function () {
  const slide = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const buttonRight = document.querySelector(".slider__btn--right");
  const buttonLeft = document.querySelector(".slider__btn--left");
  const dotsContainer = document.querySelector(".dots");
  let curSlide = 0;
  /////////////////create buttons ///////////////////////////
  /* 
The insertAdjacentHTML() method takes two parameters: position and text. 
The position parameter is a string that specifies where to insert the 
HTML code relative to the element. It can be one of the following 
values: “beforebegin”, “afterbegin”, “beforeend”, or “afterend”. 
const button = document.getElementById("myButton");
let insert = "<span>Some text</span>";
button.insertAdjacentHTML("beforeend", insert);

*/

  //take the empty div with the dots class
  //create buttons with the insertAdjacentHtml
  const createButtons = function () {
    slide.forEach((_, i) => {
      //for each slide insert buttons into the divs class dots
      dotsContainer.insertAdjacentHTML(
        "beforeend", //insert Just inside the element, after its last child.

        `<button class="dots__dot" data-slide="${i}"></button>`
        //create button with predefine classes in css and
        //adding data type named slide looping with the number of slide(i)
      );
    });
  };
  //createButtons();

  ////////////////////////////////////////////////////////////

  const activateColorDots = function (dataSlide) {
    document.querySelectorAll(".dots__dot").forEach((Element) => {
      Element.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${dataSlide}"]`)
      .classList.add("dots__dot--active");
  };
  //activateColorDots(0);
  //////////////////////////////////////////////////////////////
  //listen the dot containers with all new buttons created by createbuttons

  dotsContainer.addEventListener("click", function (e) {
    //e == each button
    if (e.target.classList.contains("dots__dot")) {
      const dataSlide = e.target.dataset.slide;
      //taking the data-slide number and pass as argument to move the slide
      moveSlide(dataSlide); //calling the function and pass data-slide
    }
  });
  ///////////////////////////////////////////////////////////////

  function moveSlide(curSlide) {
    slide.forEach((Element, i) => {
      Element.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
    activateColorDots(curSlide);
  }
  const sumCurSlide = () => {
    curSlide === slide.length - 1 ? (curSlide = 0) : curSlide++;

    moveSlide(curSlide);
    activateColorDots(curSlide);
  };
  const subCurSlide = () => {
    curSlide === 0 ? (curSlide = slide.length - 1) : curSlide--;
    moveSlide(curSlide);
    activateColorDots(curSlide);
  };
  //////////////////////s////////////////////////////////////////
  //moveSlide(0);
  /////////////////////////////////////////////////////////////
  buttonRight.addEventListener("click", sumCurSlide);
  buttonLeft.addEventListener("click", subCurSlide);
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && subCurSlide();
    e.key === "ArrowRight" && sumCurSlide();
  });

  function init() {
    createButtons();
    moveSlide(0);
    activateColorDots(0);
  }
  init();
};
sliders();
