# Random Color Generator

> A node.js app which prints out a colored box to the console.

## Dependencies

- [prompt-sync](https://www.npmjs.com/package/prompt-sync)
- [chalk](https://www.npmjs.com/package/chalk)
- [randomcolor](https://www.npmjs.com/package/randomcolor)

## Usage

The script can be run without any arguments. If done so a box in the size of 31x9 will be drawn in a random color.

```terminal
node index.js
```

![Random colored box](./images/standard.png)

You can specify the size, hue and luminosity as arguments.The order does not matter in which you specify them. However the color of the box will always get a random shade of the specified color.

### Hue

- red
- orange
- yellow
- green
- blue
- purple
- pink
- monochrome

### Lightness

- bright
- light
- dark

Please input the size in this format "width"x"height". If not the standard size (31x9) will be drawn.

```terminal
node index.js blue light
```

![Light blue colored box](./images/blue_light.png)

```terminal
node index.js red
```

![Red colored box](./images/red.png)

```terminal
node index.js light
```

![Box in a light random color](./images/light.png)

```terminal
node index.js 25x5 green
```

![Green colored 25x5 box](./images/green.png)

There is also a possibility to be guided through the input.For this please type in 'ask' as an argument.

```terminal
node index.js ask
```

![Preview of output with ask as argument](./images/ask.png)

To get a short explanation directly inside the terminal pass in 'help' or '--help' as an argument.

```terminal
node index.js help
```

![Preview of output with help as argument](./images/help.png)
