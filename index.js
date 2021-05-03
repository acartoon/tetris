const game = Game();


var params = {
    element: $('#root'),
    width: 320,
    height: 640,
    rows: 20,
    columns: 10,

}
var view = View(params);

view.render(game.getState());

$(document).on('keydown', function (evt) {

    switch (evt.keyCode) {
        case 37: //left arrow
            game.movePieceLeft();
            view.render(game.getState());
            break;

        case 38: //up arrow
            game.rotatePiece();
            view.render(game.getState());
            break;

        case 39: //right arrow
            game.movePieceRight();
            view.render(game.getState());
            break;

        case 40: //right arrow
            game.movePieceDown();
            view.render(game.getState());
            break;
    }
})


