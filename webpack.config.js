module.exports = {
    // Other properties and settings here
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify"),
        "fs": false,
        "crypto": false,
        "http": false,
        "https": false,
        "stream": false,
        "zlib": false,
        "util": false,
        "assert": false,
        "buffer": false,
        "url": false,
        "querystring": false,
        "tty": false,
        "net": false,
        "constants": false,
        "timers": false,
        "events": false,
        "child_process": false,
        "string_decoder": false,
      }
    }
  };