// let detailBtns = document.getElementsByClassName('section-details_toggle');

// for (let i=0; i < detailBtns.length; i++ ) {
//   detailBtns[i].addEventListener('click', () => {
//     if (!detailBtns[i].classList.contains('open')) {
//       detailBtns[i].classList.add('open');
//       detailBtns[i].nextElementSibling.classList.add('show')
//     } else {
//       detailBtns[i].classList.remove('open')
//       detailBtns[i].nextElementSibling.classList.remove('show')
//     }
//   });
// }

///////////////
// SECTION 1 //
///////////////

let timesPerSecond = 8;
let wait = false;

const blob = document.querySelector('.blob');
const blobContainer = document.querySelector('.blob-container');
const rect = blobContainer.getBoundingClientRect();
blob.style.left = `${rect.width / 2}px`;
blob.style.top = `${rect.height / 2}px`;

blobContainer.onpointermove = e => {
  if (!wait) {
    const { clientX, clientY } = e;
    const rect = blobContainer.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    blob.animate({
      left: `${clientX - x}px`,
      top: `${clientY - y}px`,
    }, { duration: 1500, fill: "forwards" });

    // Throttle mouse movement events
    wait = true;
    setTimeout(() => {
      wait = false;
    }, 1000 / timesPerSecond)
  }
}

blobContainer.onpointerleave = () => {
  const rect = blobContainer.getBoundingClientRect();
  setTimeout(() => {
    blob.animate({
      left: `${rect.width / 2}px`,
      top: `${rect.height / 2}px`,
    }, { duration: 2000, fill: "forwards" });
  }, 1000)
}

///////////////
///////////////
///////////////

///////////////
// SECTION 2 //
///////////////

const catContainer = document.querySelector('.section-02');
const pupils = document.querySelectorAll('.pupil'); 

const catPerimeter = document.querySelector('.cat-perimeter');
const cat = document.querySelector('.cat');
const catMad = document.querySelector('.cat-mad');

catPerimeter.onmouseenter = () => {

}

catContainer.onpointermove = e => {
  const { clientX, clientY } = e;
  const rect = catContainer.getBoundingClientRect();

  // const mouseX = clientX - rect.left;
  // const mouseY = clientY - rect.top;
  const x = ((clientX - rect.left) * 100) / rect.width;
  const y = ((clientY - rect.top) * 100) / rect.height;
  // console.log('mouseX = ', clientX, 'mouseY = ', clientY, 'rectWidth = ', rect.width, 'rectHeight = ', rect.height, x, y)

  pupils.forEach(pupil => {
    pupil.style.left = x + "%";
    pupil.style.top = y + "%";
  })

  if ( x > 30 && x < 70 && y > 30 && y < 70 ) {
    catMad.style.opacity = 1;
    cat.style.opacity = 0;

    pupils.forEach(pupil => {
      pupil.classList.add('pupil-mad')
    })
    
  } else {
    catMad.style.opacity = 0;
    cat.style.opacity = 1;

    pupils.forEach(pupil => {
      pupil.classList.remove('pupil-mad')
    })
  }
}

///////////////
///////////////
///////////////