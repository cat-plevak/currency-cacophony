$(document).ready(function() {
  // get json every 3 sec
  const TIMEOUT_MS = 300000;
  // radius multiplier
  const RADIUS_COEFF = 100;

  openNav();

  // get json data on updateTick
  function updateTick() {
    $.get('https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,CADUSD,AUDUSD,GBPUSD,NZDUSD,CHFUSD&api_key=8O9bzHMif3AT4u6ODy3yhRIalXnJWiI8', success);
    setTimeout(updateTick, TIMEOUT_MS);
  }


  function success(data) {

    // position content box
    d3.select("#content").attr("align", "center");
    var width = 800;
    var height = 600;


    // find max rate in array
    var maxPrice = data.reduce((last, current) => Math.max(current.price, last), Number.MIN_SAFE_INTEGER);

    // create radius for each bubble from data
    var nodes = data.map((el) => {
      return {
        radius: el.price / maxPrice * RADIUS_COEFF
      };
    });

    // const ts = [];
    // const price = [];
    // const dp = [];
    //
    // data.forEach((el) => {
    //   ts.push(el.timestamp);
    //   price.push(el.price);
    // });
    //
    //
    // for(i=1; i<ts.length; i++) {
    //   let derivative = (price[i] - price[i-1]) / (ts[i] - ts[i-1]);
    //   dp.push(derivative);
    // }
    //
    // ts.unshift();
    // price.unshift();
    //
    // console.log(dp);

    // forcelayout
    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(30))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius;
      }))
      .on('tick', ticked);

    // select all bubbles and append node data
    function ticked() {
      var u = d3.select('svg')
        .selectAll('circle')
        .data(nodes);


      // change bubble colors
      var colors = ['rgba(240, 85, 31, 0.8)', 'rgba(250, 209, 85, 0.8)', 'rgba(168, 198, 178, 0.8)', 'rgba(178, 17, 67, 0.7)', 'rgba(195, 215, 138, 0.8)', 'rgba(68, 146, 168, 0.8)'];

      //change transparency and show name/value on mouseover
      $('circle').mouseover(function() {
        //append el.price
        //append name
        //change transparency
      })

      // append circles and style nodes
      u.enter()
        .append('circle')
        .attr('r', function(d) {
          return d.radius;
        })
        .style("fill", function(d, i) {
          return colors[i];
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

});







// splash page
/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  $('.text').empty();
}
