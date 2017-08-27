const arr = [];


function getData() {

  $(function() {
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
      console.log(data);
      // push data into array
      arr.push(data);
    });

  });

  // console.log(arr);

}

setInterval(getData, 300000);













// // create web audio api context
// var context = new(window.AudioContext || window.webkitAudioContext)();
//
// // create oscillator node inside of context
// var oscillator = context.createOscillator();
// // define waveform type
// oscillator.type = 'sine';
// // set frequency of waveform
// oscillator.frequency.value = 329.6;
// // connect oscillator to destination
// oscillator.connect(context.destination);
// // start the oscillator
// // oscillator.start();
//
// // create adjustable volume
// var gain = context.createGain();
// // connect gain to oscillator
// oscillator.connect(gain);
// gain.connect(context.destination);
//
// var now = context.currentTime;
// gain.gain.setValueAtTime(1, now);
// gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
// oscillator.start(now);
// oscillator.stop(now + 0.5);
