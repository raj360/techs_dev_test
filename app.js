////////////////////////////////////////
//////////////// API ENTRY POINT


const hostname = 'localhost';


const port = 3000;

const server = require('./routes/index'); // import routes 
server.listen(port, hostname, () => {
  console.log(`Server up and running at http://${hostname}:${port}/`);
});
