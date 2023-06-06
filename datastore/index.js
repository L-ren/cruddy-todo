const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Change to save items to file instead of to local object.
var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

//refactor this to write to file instead of local object
exports.create = (text, callback) => {
  var id = counter.getNextUniqueId();

  var file = path.join(exports.dataDir, id);
  fs.writeFile(file, text, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, { id, text });
    }
  });
};

// iterate over all files and return their names
exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var file = path.join(exports.dataDir, id);
  console.log('read: ', file);
  // if file does no exist
  if (!fs.existsSync(file)) {
    // throw error
    callback(new Error(`No item with id: ${id}`));

  // else file exists
  } else {

    // read the file
    fs.readFile(file, (err, fileData) => {
      // if file contains nothing, error
      if (err) {
        callback(null, { id, fileData });
      }
      // else return data (maybe)
      else {
        callback(null, { id, fileData });
        return fileData;
      }
    });
  }
};

exports.update = (id, text, callback) => {
  // var item =  // read the item from
  //console.log('update function calls read one function');
  //exports.readOne(id, callback);

  var file = path.join(exports.dataDir, id);

  if (!fs.existsSync(file)) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    fs.writeFile(file, text, (err) => {
      if (err) {
        throw ('error writing counter');
      } else {
        callback(null, { id, text });
      }
    });
  }
};

exports.delete = (id, callback) => {
  console.log('deleted: ', id);

  var file =  path.join(exports.dataDir, id);

  // var item = items[id];
  // delete items[id];
  if (!fs.existsSync(file)) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {

    // delete operation
    fs.unlink(file, callback)

  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
