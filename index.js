const wrapper = document.getElementById("tiles");
// To calculate how many squares
let columns = 0,
    rows = 0,
    toggled = false;

let orderClick = 0;
const MAX_CLICK = 3;

const COLORS = [
  {
    g1: 'rgb(43, 0, 234)',
    g2: 'rgb(236, 176, 64)'
  },
  {
    g1: 'rgb(199, 234, 0)',
    g2: 'rgb(64, 144, 236)'
  },
  {
    g1: 'rgb(230, 230, 230)',
    g2: 'rgb(119, 119, 119)'
  }
]

const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

const changeColors = () => {
  document.documentElement.style.setProperty('--g1', COLORS[orderClick%COLORS.length]?.g1);
  document.documentElement.style.setProperty('--g2', COLORS[orderClick%COLORS.length]?.g2);
}

const calcNumbersForResume = () => {
  const ageSpan = document.getElementById('age');
  const workExperienceSpan = document.getElementById('work-experience');
  const year = new Date().getFullYear();
  ageSpan.innerText = year - 1996;
  workExperienceSpan.innerText = year - 2018;
}

const handleOnClick = (index, notFirst) => {
  if(orderClick >= MAX_CLICK) {
    const tiles = document.getElementById('tiles');
    const resumeContainer = document.getElementById('resume_container');
    document.body.removeChild(tiles);
    document.body.classList.toggle("resume_visible");
    resumeContainer.classList.toggle("resume_visible");
    
    return;
  }
  toggle();
  if(!notFirst) {
    setTimeout(() => handleOnClick(index, true), 1000);
    orderClick += 1;
  } else {
    setTimeout(() => changeColors(), 1000);
  }

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();