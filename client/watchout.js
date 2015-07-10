// start slingin' some d3 here.
var width = 800;
var height = 500;
var data = [1,2,3,4];

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var enemies = svg.selectAll("circle")
  .data(data)
  .attr('class', 'enemy')
  .enter().append("circle")
  .attr("r", 10)
  .attr("cx", function(){return Math.random()* width;})
  .attr("cy", function(){return Math.random()*height;});

var moveEnemies = function(enemies){
  enemies.transition()
    .attr("cx", function(){return Math.random()*width;})
    .attr("cy", function(){return Math.random()*height;})
};

var player = svg.append('circle')
  .attr('class', 'player')
  .attr("r", 10)
  .attr("cx", function(){return Math.random()*width;})
  .attr("cy", function(){return Math.random()*height;})
  .attr('fill', 'red');

setInterval(function(){moveEnemies(enemies);}, 1000);