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

// SECTION 1 //

let timesPerSecond = 10;
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
