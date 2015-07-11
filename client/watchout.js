// start slingin' some d3 here.
var width = d3.select('body').style('width').replace('px', ''),
    height = d3.select('body').style('height').replace('px', ''),
    margins = 100,
    data = [{id: 1},{id: 2},{id: 3},{id: 4}];

// helper functions
var randomXOnSvg = function(){ return (Math.random() * (width - margins)) + margins; };
var randomYOnSvg = function(){ return (Math.random() * (height - margins)) + margins; };


var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var enemies = svg.selectAll("circle")
  .data(data, function(d){ return d.id; })
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
    .transition()
    .attr("cx", function(){ return this.futureX; })
    .attr("cy", function(){ return this.futureY; })
    .tween('custom', function(){
      var enemy = d3.select(this);
      var startX = +enemy.attr('cx'),
          startY = +enemy.attr('cy'),
          endX = this.futureX,
          endY = this.futureY;
      return function(t){
        d3.select(this).attr('cx', startX + (endX - startX)*t );
        d3.select(this).attr('cy', startY + (endY - startY)*t );
      };
    });
};

var checkForCollisions = function(){

}

var player = svg.append('circle')
  .attr('class', 'player')
  .attr("r", 10)
  .attr("cx", randomXOnSvg)
  .attr("cy", randomYOnSvg)
  .attr('fill', '#aff');


player.call(d3.behavior.drag().on('drag', function(d){
  player
    .attr('cx', d3.event.dx + +player.attr('cx'))
    .attr('cy', d3.event.dy + +player.attr('cy'));
}));
// player.on('drag', function(d){
//   player.attr('cx', d3.event.dx + player.attr('cx'))
//     .attr('cy', d3.event.dy + player.attr('cy'));
// });


setInterval(function(){moveEnemies(enemies);}, 1000);
