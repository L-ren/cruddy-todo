const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};


//reads the counter file and returns the count (unique todo id)
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

// writes the count (unique todo id) to a file called counter.txt
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
exports.getNextUniqueId = () => {
  if (fs.existsSync(exports.counterFile)) {
    // if counter.txt exists read it to get current unique ID
    readCounter((undefined, data) => {
      console.log('readCounter invoked! data: ', data);
      var counter = data + 1;

      writeCounter(counter, (undefined, data) => {
        console.log('call to writeCounter: ', data);
        console.log('writecounter: ', counter);
      });
    });
    // readCounter((arg, data) => {
    //   // assign current count to counter
    //   //counter = data;
    //   //console.log(data);
    //   console.log('counter.txt exists! retrieved data: ', data)
  } else {
    // var counter = 0;

    writeCounter(counter, (arg, data) => {
      console.log('call to writeCounter: ', data);
      console.log('writecounter: ', counter);
    });
  }

  // (condition) ? (if yes) : (if no)
  // incriment current counterN
  // counter = (fs.existsSyn) ? readCounter(data) : 0
  // console.log('counter: ', zeroPaddedNumber(counter));
  counter = counter + 1;

  return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
