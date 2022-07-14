class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addScore(size = 1) {
    this.score = this.score + size;
  }
}

class Game {
  constructor(m, k, playerList) {
    this.m = m;
    this.k = k;
    this.playerList = playerList;
    this.lines = {};
    this.turnIndex = 0;
  }
  isFinished = function () {
    let scores = 0;
    for (let i = 0; i < this.playerList.length; i++) {
      scores += this.playerList[i].score;
    }
    return scores >= (this.m - 1) * (this.k - 1);
  };

  turn = function () {
    return this.playerList[this.turnIndex];
  };
  standardLine = function (x, y, a, b) {
    if (x < a) {
      return `${x}/${y} ${a}/${b}`;
    }
    if (a < x) {
      return `${a}/${b} ${x}/${y}`;
    }
    if (y < b) {
      return `${x}/${y} ${a}/${b}`;
    }
    if (y > b) {
      return `${a}/${b} ${x}/${y}`;
    }
  };

  lineExists(x,y,a,b){
    const line = this.standardLine(x,y,a,b);
    return (line in this.lines)
  }
  newSquare = function(x,y,a,b){
    let score = 0;
    let vertical = x === a;
    if (vertical){
        if (this.lineExists(x-1,y,a-1,b) && this.lineExists(x-1,y,x,y) && this.lineExists(a-1,b,a,b)){
            score++;
        }
        if (this.lineExists(x+1,y,x+1,b) && this.lineExists(x+1,y,x,y) && this.lineExists(a+1,b,a,b)){
            score++;
        }
    }else{
        if (this.lineExists(a,b-1,a,b) && this.lineExists(x,y-1,x,y) && this.lineExists(x,y-1,a,b-1)){
            score++;
        }
        if (this.lineExists(x,y+1,x,y) && this.lineExists(a,b+1,a,b) && this.lineExists(a,b+1,x,y+1)){
            score++;
        }
    }

    return score;
  }


  draw(x, y, a, b) {
    if(this.isFinished()){
        return
    }
    let key = this.standardLine(x,y,a,b)
    this.lines [key] = this.turn();
    let newSquares = this.newSquare(x,y,a,b)
    if(newSquares > 0){
        this.turn().addScore(newSquares);
    }else{
        if(this.turnIndex + 1 < this.playerList.length){
            this.turnIndex ++
        }else{
            this.turnIndex = 0
        }
    }
  }
}

ali = new Player('Ali')
hasan = new Player('Hassan')
mamad = new Player('Mohamad')

my_game = new Game(5,5,[ali,hasan,mamad])

my_game.draw(0,0,0,1)
my_game.draw(0,0,1,0)
my_game.draw(1,0,1,1)
my_game.draw(1,0,1,1)

console.log(my_game)