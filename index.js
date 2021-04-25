// Dependencies
const prompt = require('prompt-sync')();
const chalk = require('chalk');
const randomColor = require('randomcolor');

// Global variables
const inputArg = process.argv.slice(2);
const supportedHue = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'monochrome',
];
const supportedLuminosity = ['bright', 'light', 'dark'];
let hue, luminosity, width, height;

// Function to draw a Rectangle in a given color
function drawBox(boxWidth, boxHeight, boxHue, boxLuminosity) {
  // Set border color with given hue and luminosity
  const color = randomColor({
    hue: boxHue,
    luminosity: boxLuminosity,
  });

  for (let i = 1; i <= boxHeight; i++) {
    // Variable to store the drawn rows
    const grid = [];

    // Draw full lines
    for (let j = 1; j <= boxWidth; j++) {
      grid.push('#');
    }

    // Helper variables
    const halfBoxWidth = Math.round(grid.length / 2);
    const borderWidth = Math.round(boxWidth / 6);
    const borderHeight = Math.round(boxHeight / 6);

    // Replacing with empty space if condition met
    if (i > borderHeight + 1 && i < boxHeight - borderHeight) {
      for (let k = borderWidth; k <= boxWidth - borderWidth - 1; k++) {
        grid.splice(k, 1, ' ');
      }
    }

    // Insert the hex value of the color in the middle of the box
    if (i === Math.round(boxHeight / 2)) {
      grid.splice(halfBoxWidth - 4, 7, color);
    }

    // Print the finished lines to the console
    console.log(chalk.hex(color)(grid.join('')));
  }
}

// Include the option for '--help' or 'help' as an argument
// Program ends if asked for help
if (inputArg.includes('help') || inputArg.includes('--help')) {
  console.log(`
  The program can be run without any arguments.
  If done so a box in the size of 31x9 will be drawn in a random color.

  You can specify the size, hue and luminosity as arguments.
  The order does not matter in which you specify them.
  e.g. (node index.js 30x8 blue light) or (node index.js red)

  There is also a possibility to be guided through the input.
  For this please type in 'ask' as an argument.
  e.g. (node index.js ask)

  Please input the size in this format "width"x"height".
  If not the standard size (31x9) will be drawn.
  `);
} else {
  // Include the option for 'ask' as an argument
  if (inputArg.includes('ask')) {
    hue = prompt('Which color would you like? ', 'random');
    luminosity = prompt('Which luminosity would you like? ', 'random');
    width = prompt('How wide should the box be? ', 31);
    height = prompt('How tall should the box be? ', 9);
  } else {
    // If the argument 'ask' is not given
    // then the program starts to look for input arguments for
    // hue, luminosity and box size

    // Set hue if user gives a supported hue as argument
    hue = inputArg.find((element) => supportedHue.includes(element));

    // Set luminosity if user gives a supported luminosity as argument
    luminosity = inputArg.find((element) =>
      supportedLuminosity.includes(element),
    );

    // Set boxSize if user gives a size as argument
    const boxSize = inputArg.find(
      (element) => !Number.isNaN(parseInt(element.split('x')[0], 10)),
    );

    // Set width and height if boxSize is defined
    if (boxSize) {
      width = parseInt(boxSize.split('x')[0], 10);
      height = parseInt(boxSize.split('x')[1], 10);
    }

    if (!width || !height) {
      // Base value for width and height if the input is wrong and a error message
      console.log(
        'Your width and/or height property were wrong, so I generated a random box size for you',
      );

      width = 31;
      height = 9;
    }
  }

  // Function call to draw the box
  drawBox(width, height, hue, luminosity);
}
