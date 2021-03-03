const game = Game();


var params = {
    element: $('#root'),
    width: 320,
    height: 640,
    rows: 20,
    columns: 10,

}
var view = View(params);

view.renderPlayField(game.playfied)


