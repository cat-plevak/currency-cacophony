// json request
$(document).ready(function() {
  // gather JSON
  const TIMEOUT_MS = 60000;

  function updateTick() {
    $.get('https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,CADUSD,AUDUSD,GBPUSD,NZDUSD,CHFUSD&api_key=AlZZXbw8bkmXnEiBVKr6zbgzkiKmHJKE', success);
    setTimeout(updateTick, TIMEOUT_MS);
  }

  function success(data) {
    // make bubbles
    d3.select("#content").attr("align","center");
    var width = 800;
    var height = 600;

    var numNodes = 7;

    // var i = 0;
    // var nodes = d3.range(numNodes).map((d) => {
    //   var price = data[i++].price;
    //   return {
    //     radius: price
    //   };
    // });

    var nodes = data.map((el) => {
      return {
        radius: el.price
      }
    });

    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(30))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius;
      }))
      .on('tick', ticked);

    function ticked() {
      var u = d3.select('svg')
        .selectAll('circle')
        .data(nodes);

      u.enter()
        .append('circle')
        .attr('r', function(d) {
          return d.radius;
        })
        .merge(u)
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });

      u.exit().remove();
    }
  }

  updateTick();

  console.log(values);
});
