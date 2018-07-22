var fs = require("fs");
var path = require("path");

function logger(err, res) {
  if (err) console.log(err);

  console.log(JSON.stringify(res));
}

// send directory to parse and what to do with json after - logger or return
// kudos - https://stackoverflow.com/a/31831122/1377969
var directoryTreeToObj = function(dir, done) {
  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    var pending = list.length;

    if (!pending)
      return done(null, {
        name: path.basename(dir),
        type: "folder",
        children: results
      });

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          directoryTreeToObj(file, function(err, res) {
            results.push({
              name: path.basename(file),
              type: "folder",
              children: res
            });
            if (!--pending) done(null, results);
          });
        } else {
          results.push({
            type: "file",
            name: path.basename(file)
          });
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
