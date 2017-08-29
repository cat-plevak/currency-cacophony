// json request
$(document).ready(function() {
  // gather JSON
  const TIMEOUT_MS = 3000;
  const RADIUS_COEFF = 25;


  // get json data
  function updateTick() {
    $.get('https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,CADUSD,AUDUSD,GBPUSD,NZDUSD,CHFUSD&api_key=AlZZXbw8bkmXnEiBVKr6zbgzkiKmHJKE', success);
    setTimeout(updateTick, TIMEOUT_MS);
  }


  function success(data) {
    // make bubbles
    d3.select("#content").attr("align", "center");
    var width = 800;
    var height = 600;

    var numNodes = 7;

    var maxPrice = data.reduce((last, current) => Math.max(current.price, last), Number.MIN_SAFE_INTEGER);

    var nodes = data.map((el) => {
      return {
        radius: el.price / maxPrice * RADIUS_COEFF
      };
    });

    const ts = [];
    const price = [];
    const dp = [];

    data.forEach((el) => {
      ts.push(el.timestamp);
      price.push(el.price);
    });

    function derivatives(ts, price) {
      for(i=1; i<ts.length; i++) {
        let derivative = (price[i] - price[i-1]) / (ts[i] - ts[i-1]);
        dp.push(derivative);
      }
    }

    ts.unshift();
    price.unshift();

    console.log(dp);

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

  // console.log(values);
});
