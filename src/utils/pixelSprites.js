// Pixel sprites for game characters and icons
const pixelSprites = {
	// Character sprites (16x16 px)
	characters: {
		player: `
    ....XXXX....
    ...XXXXXX...
    ...XXXXXX...
    ...XX..XX...
    ...XXXXXX...
    ....XXXX....
    ..XXXXXXXX..
    .XX......XX.
    .XX......XX.
    .XX......XX.
    ..XX....XX..
    ...XX..XX...
    ...XX..XX...
    ...XX..XX...
    ...XX..XX...
    ...XX..XX...
    `,
		enemy: `
    ....XXXX....
    ...XXXXXX...
    ..XXXXXXXX..
    .XXXXXXXXXX.
    .XXXXXXXXXX.
    .XXXXXXXXXX.
    .XXXXXXXXXX.
    .XXXXXXXXXX.
    ..XXXXXXXX..
    ...XXXXXX...
    ....XXXX....
    .....XX.....
    `,
	},

	// Item sprites (8x8 px)
	items: {
		potion: `
    ..####..
    .######.
    ########
    ########
    ########
    .######.
    ..####..
    `,
		key: `
    ...##...
    ..####..
    ..####..
    ...##...
    ...##...
    ...##...
    .######.
    .######.
    `,
		book: `
    ########
    ##....##
    ##....##
    ##....##
    ##....##
    ##....##
    ##....##
    ########
    `,
		sword: `
    ...##...
    ...##...
    ...##...
    ...##...
    ...##...
    ..####..
    .######.
    ...##...
    `,
		shield: `
    .######.
    #######@
    ##....@@
    ##....@@
    ##....@@
    .##..@@.
    ..####..
    ...##...
    `,
	},

	// UI elements
	ui: {
		heart: `
    .XX.XX.
    XXXXXXX
    XXXXXXX
    XXXXXXX
    .XXXXX.
    ..XXX..
    ...X...
    `,
		coin: `
    ..XXXX..
    .XXXXXX.
    XXXXXXXX
    XXXXXXXX
    XXXXXXXX
    .XXXXXX.
    ..XXXX..
    `,
	},
};

// Convert ASCII art to canvas drawing commands
function drawPixelSprite(ctx, sprite, x, y, scale = 1, color = "#00ffaa") {
	const rows = sprite.trim().split("\n");
	const height = rows.length;
	const width = Math.max(...rows.map((row) => row.length));

	ctx.fillStyle = color;

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if (rows[row][col] === "X") {
				ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
			}
		}
	}
}

// Animation frames
function animateSprite(ctx, sprite, x, y, frameCount) {
	const frame = frameCount % 2;

	// Basic 2-frame animation with slight y position change
	const offsetY = frame === 0 ? 0 : 1;
	drawPixelSprite(ctx, sprite, x, y + offsetY);
}

export { pixelSprites, drawPixelSprite, animateSprite };
