function View(params) {
    var view = {
        element: params.element,
        width: params.width,
        height: params.height,
        rows: params.rows,
        columns: params.columns,
        canvas: $('<canvas>'),
        blockWidth: params.width / params.columns,
        blockHeight: params.height / params.rows,
        colors: {
            '1': 'cyan',
            '2': 'blue',
            '3': 'orange',
            '4': 'yellow',
            '5': 'green',
            '6': 'purple',
            '7': 'red'
        },

        _renderCanvas: function () {
            this.canvas[0].width = this.width;
            this.canvas[0].height = this.height;
            this.context = this.canvas[0].getContext('2d');
            this.element.append(this.canvas);
        },

        render: function(params) {
            this.clearScreen();
            this.renderPlayField(params);
            this.renderPanel(params)
        },

        renderPlayField: function({playfied}) {
            for(var y = 0; y < playfied.length; y++) {
                var line  = playfied[y];

                for(var x = 0; x < line.length; x++) {
                    var block = line[x];
                    if(block) {
                        this.renderBlock(x * this.blockWidth , y * this.blockHeight, this.blockWidth, this.blockHeight, this.colors[block])
                    }
                }
            }

        },

        renderPanel({level, score, lines, nextPiece}) {
            this.context.textAlign = 'start';
            this.context.textBaseLine = 'top';
            this.context.font = '14px "Press Start 2P"';
            this.context.fillStyle = 'white';

            this.context.fillText(`level: ${score}`, 0, 14);
            this.context.fillText(`lines: ${lines}`, 0, 34);
            this.context.fillText(`level: ${level}`, 0, 54);
            this.context.fillText(`next:`, 0, 74);

            console.log(nextPiece)

            for(var y = 0; y < nextPiece.blocks.length; y++) {
                for(var x = 0; x < nextPiece.blocks[y].length; x++) {
                    var block = nextPiece.blocks[y][x];

                    if(block) {
                        this.renderBlock(
                            x * this.blockWidth,
                            y * this.blockHeight,
                            this.blockWidth,
                            this.blockHeight,
                            this.colors[block]
                        )
                    }
                }
            }
        },

        clearScreen: function () {
            this.context.clearRect(0, 0, this.width, this.height)
        },

        renderBlock: function (x, y, width, height, color) {
            this.context.fillStyle = color;
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 2;

            this.context.fillRect(x , y, width, height)
            this.context.strokeRect(x , y, width, height)

        }
    }
    view._renderCanvas();
    return view;
}