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

        _renderCanvas: function () {
            this.canvas[0].width = this.width;
            this.canvas[0].height = this.height;
            this.context = this.canvas[0].getContext('2d');
            this.element.append(this.canvas);
        },

        renderPlayField: function(playField) {
            console.log(playField)
            for(var y = 0; y < playField.length; y++) {
                var line  = playField[y];

                for(var x = 0; x < line.length; x++) {
                    var block = line[x];
                    if(block) {
                        this.context.fillStyle = 'red';
                        this.context.strokeStyle = 'green';
                        this.context.lineWidth = 2;


                        this.context.fillRect(x * this.blockWidth , y * this.blockHeight, this.blockWidth, this.blockHeight)
                    }
                }
            }
        }

    }
    view._renderCanvas();
    return view;
}