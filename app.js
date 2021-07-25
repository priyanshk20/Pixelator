const grid = document.querySelector(".grid");

const createGrid = () => {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "black";
  });
  grid.appendChild(div);
};

const main = () => {
  for (let i = 0; i < 256; i++) {
    createGrid();
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const getRandomColors = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomGray = () => {
  var v = ((Math.random() * 256) | 0).toString(16); //bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
  return "#" + v + v + v;
};

const slider = document.querySelector("#slider");
const valDiv = document.querySelector(".value");
slider.addEventListener("input", () => {
  let val = slider.value;
  valDiv.textContent = val;
  removeAllChildNodes(grid);
  grid.style = `grid-template-columns: repeat(${val}, 2fr); grid-template-rows: repeat(${val}, 2fr);`;
  for (let i = 0; i < val * val; i++) {
    createGrid();
  }
  var event = new CustomEvent("color", {
    detail: document.getElementById("color"),
  });
  document.dispatchEvent(event);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
  let val = document.getElementById("slider").value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].style.backgroundColor = "white";
  }
});

const gray = document.querySelector("#gray");
gray.addEventListener("click", function () {
  let val = document.getElementById("slider").value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = getRandomGray();
    });
  }
});

const rgb = document.querySelector("#rgb");
rgb.addEventListener("click", function () {
  let val = document.getElementById("slider").value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = getRandomColors();
    });
  }
});

const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
  let val = document.getElementById("slider").value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = "white";
    });
  }
});

const chooseColor = document.querySelector("#color");
chooseColor.addEventListener("input", function () {
  let val = document.getElementById("slider").value;
  let newColor = document.getElementById("color").value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = newColor;
    });
  }
});

document.addEventListener("color", function (e) {
  let val = document.getElementById("slider").value;
  let newColor = e.detail.value;
  let cell = grid.children;
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener("mouseover", function (event) {
      event.target.style.backgroundColor = newColor;
    });
  }
});

main();
