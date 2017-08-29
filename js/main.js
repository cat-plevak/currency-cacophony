// json request
$(document).ready(function() {
  // gather JSON
  const TIMEOUT_MS = 60000;
  const values = [];

  function updateTick() {
    $.get('https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,CADUSD,AUDUSD,GBPUSD,NZDUSD,CHFUSD,USDJPY&api_key=AlZZXbw8bkmXnEiBVKr6zbgzkiKmHJKE', success);
    setTimeout(updateTick, TIMEOUT_MS);
  }

  function success(data) {
    values.length = 0;
    values.push(data);
    console.log(data);

    // make bubbles
    d3.select("#content").attr("align","center");
    var width = 800;
    var height = 600;

    var numNodes = 7;

    var i = 0;
    var nodes = d3.range(numNodes).map((d) => {
      var price = values['0']['0'].price;
      return {
        radius: price
      };
    });

    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(30))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
      }))
      .on('tick', ticked);

    function ticked() {
      var u = d3.select('svg')
        .selectAll('circle')
        .data(nodes)

      u.enter()
        .append('circle')
        .attr('r', function(d) {
          return d.radius
        })
        .merge(u)
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })

      u.exit().remove();
    }
  }


  updateTick();

  console.log(values);



  // when updateTick(), radius of circle nodes = 4th + 5th place





  // // make bubbles
  // d3.select("#content").attr("align","center");
  // var width = 800;
  // var height = 600;
  //
  // var numNodes = 7;
  //
  // // var nodes = d3.range(numNodes).map((d) => {
  // //   return {
  // //     radius: Math.random() * 100
  // //   };
  // // });
  //
  // var i = 0;
  // var nodes = d3.range(numNodes).map((d) => {
  //   return {
  //     radius: values[i++].price
  //   };
  // });


  // var simulation = d3.forceSimulation(nodes)
  //   .force('charge', d3.forceManyBody().strength(30))
  //   .force('center', d3.forceCenter(width / 2, height / 2))
  //   .force('collision', d3.forceCollide().radius(function(d) {
  //     return d.radius
  //   }))
  //   .on('tick', ticked);
  //
  // function ticked() {
  //   var u = d3.select('svg')
  //     .selectAll('circle')
  //     .data(nodes)
  //
  //   u.enter()
  //     .append('circle')
  //     .attr('r', function(d) {
  //       return d.radius
  //     })
  //     .merge(u)
  //     .attr('cx', function(d) {
  //       return d.x
  //     })
  //     .attr('cy', function(d) {
  //       return d.y
  //     })
  //
  //   u.exit().remove();
  // }

})












// //make bubbles on page load
// $(document).ready(function() {
//
// // define bubble container
// var width= 960;
// var height= 500;
//
// // create color array of bubbles
// var colorScale = ['rgb(240, 85, 31)', 'rgb(250, 209, 85)', 'rgb(168, 198, 178)', 'rgb(178, 17, 67)', 'rgb(178, 103, 101)', 'rgb(195, 215, 138)', 'rgb(68, 146, 168)' ];
// // greate gravity center along x-axis
// var xCenter = 450;
//
// // define number of nodes(bubbles) to be generated
//
// // calulate
// // var nodes= d3.range(numNodes).map(function(d, ))
//
// })
