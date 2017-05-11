// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function () {
  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Module dependencies.
   */
  const app = require('../app');
  const debug = require('debug')('tdapp:server');
  const http = require('http');

  // Create http server
  const server = http.createServer(app);

  // Get port from environment and store in Express.
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // const bind = typeof port === 'string'
    //   ? `Pipe ${port}`
    //   : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        // @todo-revise
        // console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        // @todo-revise
        // console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `pipe ${addr.port}`;
    debug(`Listening on ${bind}`);
  }


  /**
   * Setup http server
   */

  // Listen on provided port, on all network interfaces.
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}
