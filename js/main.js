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
const cat = document.querySelector('.cat');
const catMad = document.querySelector('.cat-mad');

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

///////////////
// SECTION 3 //
///////////////

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BTNS_03 = document.querySelectorAll('.glitch-text');

BTNS_03.forEach(btn => btn.onmouseover = e => {

  let iterations = 0;

  const glitchInterval = setInterval(() => {
    e.target.innerText = e.target.innerText.split('')
      .map((letter, idx) => {
        if (idx < iterations) {
          return e.target.dataset.value[idx]
        }

        return letters[Math.floor(Math.random() * 26)]
      })
      .join('');
     
    if (iterations >= e.target.dataset.value.length) {
      clearInterval(glitchInterval);
    }
    
    iterations += 1 / 3;
  }, 30) 
});

///////////////
///////////////
///////////////

///////////////
// SECTION 4 //
///////////////

let tilesContainer = document.querySelector('.tiles');
let tileSize = 50; // pixels L x H

let columns = Math.floor(tilesContainer.clientWidth / tileSize);
let rows = Math.floor(tilesContainer.clientHeight / tileSize);

tilesContainer.style.setProperty("--columns", columns)
tilesContainer.style.setProperty("--rows", rows)

// const colors = [
//   "rgb(229, 57, 53)",
//   "rgb(253, 216, 53)",
//   "rgb(244, 81, 30)",
//   "rgb(76, 175, 80)",
//   "rgb(33, 150, 243)",
//   "rgb(156, 39, 176)",
// ]

let tilesToggled = false;

// let tileCount = -1;

const handleTileOnClick = index => {
  // tileCount = tileCount + 1;
  tilesToggled = !tilesToggled;

  anime({ 
    targets: '.tile',
    // backgroundColor: colors[tileCount % (colors.length - 1)],
    opacity: tilesToggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  })
}

const createTile = index => {
  const tile = document.createElement('div');

  tile.classList.add('tile');

  tile.onclick = e => handleTileOnClick(index);

  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    tilesContainer.appendChild(createTile(index));
  })
}

createTiles(columns * rows);

const resizeGrid = () => {
  tilesContainer.innerHTML = '';

  columns = Math.floor(tilesContainer.clientWidth / tileSize);
  rows = Math.floor(tilesContainer.clientHeight / tileSize);

  tilesContainer.style.setProperty("--columns", columns)
  tilesContainer.style.setProperty("--rows", rows)

  createTiles(columns * rows);
}

///////////////
///////////////
///////////////

window.onresize = () => {
  resizeGrid();
  resizeTriangleGrid();
};

///////////////
// SECTION 5 //
///////////////

///////////////
///////////////
///////////////