// Dependencies
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const randomColor = require('randomcolor');

// Global variables
const inputArg = process.argv.slice(2);
let width =
  inputArg.length === 0 ? 'a' : parseInt(inputArg[0].split('x')[0], 10);
let height =
  inputArg.length === 0 ? 'a' : parseInt(inputArg[0].split('x')[1], 10);
let color = randomColor({
  hue: inputArg.length !== 1 ? inputArg[1] : inputArg[0],
  luminosity: inputArg.length === 3 ? inputArg[2] : inputArg[1]
});

// Correcting the variables depending on input
if (!isNaN(width) && inputArg.length === 1) {
  color = randomColor();
} else if (isNaN(width)) {
  width = 31;
  height = 9;
  color = randomColor({
    hue: inputArg[0],
    luminosity: inputArg[1]
  });
}

// Including the option for 'ask' as an argument
if (process.argv[2] === 'ask') {
  color = randomColor({
    hue: prompt('Which color would you like? ', 'random'),
    luminosity: prompt('Which luminosity would you like? ', 'random')
  });
  width = prompt('How wide should the grid be? ', 31);
  height = prompt('How tall should the grid be? ', 9);
}

for (let i = 1; i <= height; i++) {
  const grid = [];

  for (let j = 1; j <= width; j++) {
    grid.push('#');
  }

  const halfLength = Math.round(grid.length / 2);
  const borderWidth = Math.round(width / 6);

  if (
    i === Math.round(height / 2 - 1) ||
    i === Math.round(height / 2 + 1) ||
    i === Math.round(height / 2)
  ) {
    for (let k = borderWidth; k <= width - borderWidth - 1; k++) {
      grid.splice(k, 1, ' ');
    }
  }

  if (i === Math.round(height / 2)) {
    grid.splice(halfLength - 4, 7, color);
  }

  console.log(chalk.hex(color)(grid.join('')));
}
