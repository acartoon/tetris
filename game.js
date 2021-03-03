function Game() {

    var game = {
        score: 0,
        lines: 0,
        level: 0,
        playfied: this.createPlayfied(),
        // playfied: [
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // ],
        activePiece: {
            x: 0,
            y: 0,
            blocks: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
        },

        getState: function() {
            var playfied = this.createPlayfied();
            return {
                playfied: playfied,
            }
        },

        createPlayfied: function() {
            var playfied = [];
            for(var y = 0; y < 20; y++) {
                playfied[y] = []
                for(var x = 0; x < y; x++) {
                    playfied[y][x] = 0;
                }
            }

            return playfied;
        },

        rotatePiece: function() {
            this.rotateBlocks();

            if(this.hasCollision()) {
                this.rotateBlocks(false);
            }
        },

        rotateBlocks: function(clockwise = true) {
            var blocks = this.activePiece.blocks;
            var length = blocks.length;
            var x = Math.floor(length /2 );
            var y = length - 1;

            for (var i = 0; i < x; i ++) {
                for (var j = i; j < y - i; j++) {
                    var temp = blocks[i][j];

                    if(clockwise) {
                        blocks[i][j] = blocks[y - j][i]
                        blocks[y - j][i] = blocks[y - i][y - j]
                        blocks[y - i][y - j] = blocks[j][y - i]
                        blocks[j][y - i] = temp;
                    } else {
                        blocks[i][j] = blocks[j][y - i]
                        blocks[j][y - i] = blocks[y - i][y - j]
                        blocks[y - i][y - j] = blocks[y - i][j]
                        blocks[y - j][i] = temp;
                    }
                }
            }
        },

        hasCollision: function() {
            var pieceY = this.activePiece.y;
            var pieceX = this.activePiece.x;
            var blocks = this.activePiece.blocks;

            for(var y = 0; y < blocks.length; y++) {
                for (var x = 0; x < blocks[y].length; x++) {
                    if(
                        blocks[y][x] &&
                        ((this.playfied[pieceY + y] === undefined || this.playfied[pieceY + y][pieceX + x] === undefined) ||
                        this.playfied[pieceY + y][pieceX + x])
                    ) {
                        return true;
                    }
                }
            }

            return false;
        },

        movePieceLeft: function() {
            this.activePiece.x -= 1;

            if(this.hasCollision()) {
                this.activePiece.x += 1;
            }
        },

        movePieceRight: function() {
            this.activePiece.x += 1;
            if(this.hasCollision()) {
                this.activePiece.x -= 1;
            }

        },

        movePieceDown: function() {
            this.activePiece.y += 1;

            if(this.hasCollision()) {
                this.activePiece.y -= 1;
                this.lockPiece();
            }
        },

        lockPiece: function () {
            var blocks = this.activePiece.blocks;
            var pieceX = this.activePiece.x;
            var pieceY = this.activePiece.y;

            for(var y = 0; y < blocks.length; y++) {
                for (var x = 0; x < blocks[y].length; x++) {
                    if(blocks[y][x]) {
                        this.playfied[pieceY + y][pieceX + x] = blocks[y][x];
                    }
                }
            }
        },
    };

    return game;

}