$(document).ready(function() {
  // do not need this: event.preventDefault() because there is no event occurring on page other than loading the page
  // ajax call
  var $xhr = $.getJSON('https://api.coinbase.com/v2/exchange-rates');
  // console.log($xhr);

  // this is what will hapen when the get request comes back
  $xhr.done(function(data) {
    // if there is a 200 error, give up
    if ($xhr.status !== 200) {
      return;
    }
    // if there is not, manipulate request data
    console.log(data)
  })
})
