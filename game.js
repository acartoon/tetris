function Game() {

    var game = {
        score: 0,
        lines: 0,
        level: 0,
        playfied: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        activePiece: {
            x: 0,
            y: 0,
            // blocks: [
            //     [0, 1, 0],
            //     [1, 1, 1],
            //     [0, 0, 0],
            // ],
            get blocks() {
                return this.rotations[this.rotationIndex]
            },
            rotationIndex: 0,
            rotations: [
                [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0],
                ],
                [
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 1, 0],
                ],
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0],
                ],
                [
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 1, 0],
                ],
            ],
        },

        rotatePiece: function() {
            this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0;

            if(this.hasCollision()) {
                this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3;
            }
            return this.activePiece.blocks;
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