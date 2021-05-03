function Game() {

    var game = {
        score: 0,
        lines: 19,
        level: 0,
        points: {
            '1': 40,
            '2': 100,
            '3': 300,
            '4': 1200,
        },

        getLevel: function() {
            return Math.floor(this.lines * 0.1);
        },

        get playfied() {
            if(!this._createPlayfied) {
                this._createPlayfied = this.createPlayfied();
            }
            return this._createPlayfied;

        },

        get activePiece() {
            if(!this._activePiece) {
                this._activePiece = this.createPiece();
            }
            return this._activePiece;
        },

        set activePiece(piece) {
            this._activePiece = piece;
        },

        get nextPiece() {
            if(!this._nextPiece) {
                this._nextPiece = this.createPiece();
            }
            return this._nextPiece;
        },

        set nextPiece(piece) {
            this._nextPiece =  piece;
        },

        getState: function() {
            console.log(this.level)
            var playfied = this.createPlayfied();
            var {y: pieceY, x: pieceX, blocks} = this.activePiece;


            for(var y = 0; y < this.playfied.length; y++) {
                playfied[y] = [];
                for(var x = 0; x < this.playfied[y].length; x++) {
                    playfied[y][x] = this.playfied[y][x];
                }
            }
            for(var y = 0; y < blocks.length; y++) {
                for (var x = 0; x < blocks[y].length; x++) {
                    if(blocks[y][x]) {
                        playfied[pieceY + y][pieceX + x] = blocks[y][x];
                    }
                }
            }


            return {
                score: this.score,
                level: this.level,
                lines: this.lines,
                nextPiece: this.nextPiece,
                playfied,
            }
        },

        createPlayfied: function () {
            var playfied = [];

            for(var y = 0; y < 20; y++) {
                playfied[y] = []
                for(var x = 0; x < 10; x++) {
                    playfied[y][x] = 0;
                }
            }

            return playfied;
        },

        createPiece: function() {
            var index = Math.floor(Math.random() * 7);
            var type = 'IJLOSTZ'[index];
            var piece = {};

            switch (type) {
                case 'I':
                    piece.blocks = [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ];
                    break;

                case 'J':
                    piece.blocks = [
                        [0, 0, 0],
                        [2, 2, 2],
                        [0, 0, 2],
                        [0, 0, 0]
                    ];
                     break;

                case 'L':
                    piece.blocks = [
                        [0, 0, 0],
                        [3, 3, 3],
                        [0, 0, 0],
                        [0, 0, 0]
                    ];
                    break;

                case 'O':
                    piece.blocks = [
                        [0, 0, 0, 0],
                        [0, 4, 4, 0],
                        [0, 4, 4, 0],
                        [0, 0, 0, 0]
                    ];

                        break;

                case 'S':
                    piece.blocks = [
                        [0, 0, 0],
                        [0, 5, 5],
                        [5, 5, 0],
                    ];

                    break;

                case 'T':
                    piece.blocks = [
                        [0, 0, 0],
                        [6, 6, 6],
                        [0, 6, 0],
                    ];

                    break;

                case 'Z':
                    piece.blocks = [
                        [0, 0, 0],
                        [7, 7, 0],
                        [0, 7, 7],
                    ];

                    break;
                default:
                    throw new Error('Неизвестный тип фигуры')
            }


            piece.x = Math.floor((10  - piece.blocks[0].length) / 2);
            piece.y = -1;

            return piece;
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
                        blocks[y - i][y - j] = blocks[y - j][i]
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
            console.log(this.level)
            this.activePiece.y += 1;
            if(this.hasCollision()) {
                this.activePiece.y -= 1;
                this.lockPiece();
                var clearLines = this.clearLines();
                this.updateScore(clearLines);
                this.updatePieces();
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

        clearLines() {
            var rows = 20;
            var columns = 10;
            var lines = [];
            for(var y = rows - 1; y >= 0; y --) {
                var numberOfBlocks = 0;

                for (var x = 0; x < columns; x++) {
                    if(this.playfied[y][x]) {
                        numberOfBlocks +=1
                    }
                }
                if(numberOfBlocks === 0) {
                    break;
                } else if(numberOfBlocks < columns) {
                    continue
                } else if(numberOfBlocks = columns) {
                    lines.unshift(y)
                }
            }

            for(var index of lines) {
                this.playfied.splice(index, 1);
                this.playfied.unshift(new Array(columns).fill(0));
            }


            return lines.length;
        },

        updateScore: function(clearLiners) {
            if(clearLiners > 0) {
                this.score += this.points[clearLiners] * this.getLevel() + 1;
                this.lines += clearLiners;
            }
        },

        updatePieces: function () {
            this.activePiece = this.nextPiece;
            this.nextPiece = this.createPiece();
        }
    };

    return game;

}