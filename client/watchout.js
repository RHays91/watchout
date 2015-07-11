// start slingin' some d3 here.
var width = d3.select('body').style('width').replace('px', ''),
    height = d3.select('body').style('height').replace('px', ''),
    margins = 100,
    data = [1,2,3,4,5,6,7,8,9];

// helper functions
var randomXOnSvg = function(){ return (Math.random() * (width - margins)) + margins; };
var randomYOnSvg = function(){ return (Math.random() * (height - margins)) + margins; };


var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var enemies = svg.selectAll("circle")
  .data(data, function(d){ return d; })
  .attr('class', 'enemy')
  .enter().append("circle")
  .attr("r", 10)
  .attr("cx", randomXOnSvg)
  .attr("cy", randomYOnSvg);


var moveEnemies = function(enemies){
  enemies
    .each(function(d, i){
      this.futureX = randomXOnSvg();
      this.futureY = randomYOnSvg();
    })
    .transition().duration(2000)
    .attr("cx", function(){ return this.futureX; })
    .attr("cy", function(){ return this.futureY; })
    .tween('custom', function(){
      var enemy = d3.select(this);
      var startX = +enemy.attr('cx'),
          startY = +enemy.attr('cy'),
          endX = this.futureX,
          endY = this.futureY;
      return function(t){
        checkForCollisions(startX + (endX - startX)*t, startY + (endY - startY)*t);
        d3.select(this).attr('cx', startX + (endX - startX)*t );
        d3.select(this).attr('cy', startY + (endY - startY)*t );
      };
    });
};


// Collision monitoring
var checkForCollisions = function(x,y){
  var playerX = +player.attr('cx'),
      playerY = +player.attr('cy'),
      distanceFromPlayerX = playerX - x,
      distanceFromPlayerY = playerY - y,
      distanceToPlayer = Math.sqrt(Math.pow(distanceFromPlayerX, 2) + Math.pow(distanceFromPlayerY, 2));

  // console.log(distanceToPlayer);
  if(distanceToPlayer < 20){
    var collisionScoreBoard = d3.select('div.collisions span');
    collisionScoreBoard.text(+collisionScoreBoard.text() + 1);
    collided = true;
  }
};

// Player Creation
var player = svg.append('circle')
  .attr('class', 'player')
  .attr("r", 10)
  .attr("cx", randomXOnSvg)
  .attr("cy", randomYOnSvg)
  .attr('fill', '#aff');

// Player drag functionality
player.call(d3.behavior.drag().on('drag', function(d){
  player
    .attr('cx', d3.event.dx + +player.attr('cx'))
    .attr('cy', d3.event.dy + +player.attr('cy'));
}));



// Scoreboard Management
var collided = false;
var updateScore = function(){
  var playerScoreBoard = d3.select('div.current span');
  var highScore = d3.select('div.high span');

  //playerScoreBoard.timer(function(){
    // when a collision occurs
    if (collided){
      // reset collided variable
      collided = false;
      // score achieved
      var score = +playerScoreBoard.text();
      // if score > high score --> set as new high score
      if (score > +highScore.text() || +highScore.text() === 0){
        highScore.text(score)
      }
      // reset player score
      playerScoreBoard.text(0);
    } else {
    // otherwise continuously increment the score
    //setInterval(function(){
    playerScoreBoard.text(+playerScoreBoard.text() + 1);
  }
  return;
    //}, 200);
};
setInterval(function(){moveEnemies(enemies);}, 1000);
setInterval(function(){updateScore();}, 100);
