$(document).ready(function() {
  // get json every 5 sec
  const TIMEOUT_MS = 5000;
  const ALPHA = 1e6;
  const RADIUS_COEFF = 100;
  let fired = false;
  let latestRates = null;
  let maxPrice = 0;


  // call for splash page
  openNav();

  // get json data on updateTick
  // other key nhBbxgo7i7D3d2Q81xbyKX9x5PAeaVhH. 8O9bzHMif3AT4u6ODy3yhRIalXnJWiI8, rRD8K1ujRdP5ruyrsIrAAWsUFsx341hX

  function updateTick() {
    $.get('https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,CADUSD,AUDUSD,GBPUSD,NZDUSD,CHFUSD&api_key=rRD8K1ujRdP5ruyrsIrAAWsUFsx341hX', success);
    if (!fired) {
      setTimeout(updateTick, TIMEOUT_MS);
      // fired = true;
    }
  }


  function success(data) {

    // format content box
    d3.select("#content").attr("align", "center");
    var width = 800;
    var height = 600;



    if (latestRates !== null) {
      let withDP = [];
      data.forEach((el, idx) => {
        pf = el.price;
        pi = latestRates[idx].price;
        tf = el.timestamp;
        ti = latestRates[idx].timestamp;
        dPrice = (tf - ti === 0) ? 0 : (pf - pi) / (tf - ti);
        alphaDPrice = ALPHA * Math.abs(dPrice);
        withDP.push({
          price: el.price,
          timestamp: el.timestamp,
          symbol: el.symbol,
          tf: tf,
          ti: ti,
          pf: pf,
          pi: pi,
          dPrice: dPrice,
          alphaDPrice: alphaDPrice
        });
      });
      latestRates = withDP;
      console.log(withDP);

      // find max rate in array
      var maxPrice = latestRates.reduce((last, current) => {
        let things = Math.max(current.alphaDPrice, last);
        return things;
      }, 0);

      plotLatestRates();
    } else {
      latestRates = data;
      console.log('FIRST PASS', latestRates);
    }

    function plotLatestRates() {
      // create radius for each bubble from data
      var nodes = latestRates.map((el) => {
        // const radius = el.price + el.alphaDPrice / maxPrice * RADIUS_COEFF;


        // HOW IS THIS RETURNING ANYTHING WITH RADIUS LESS THAN 100??
        let radius = (1.0 + el.alphaDPrice) / maxPrice * RADIUS_COEFF;
        if (radius < 1.0 || isNaN(radius)) {
          alert(`Radius ${radius} BOOM`)
          radius = 1.0
        }
        return {
          radius: radius
        };
      });



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

        //change transparency on mouseover
        $('circle').mouseover(function() {
          $(this).css('opacity', 0.6)
        })

        $('circle').mouseleave(function() {
          $(this).css('opacity', 1)
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
  $('.text, .header').empty();
}
