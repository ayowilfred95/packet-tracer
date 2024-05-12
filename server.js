/**
 *  I got this error after deploying the commented code to a cloud
 *  @error ==> Starting service...
Apr 9 08:06:05 AMServer listening on 55455
Apr 9 08:09:50 AM==> No open HTTP ports detected
Apr 9 08:09:50 AM==> https://render.com/docs/web-services#host-and-port-configuration
Apr 9 08:09:57 AMServer listening on 55455
Apr 9 08:10:01 AM==> Your service is live 🎉
 */

// const webSocketServer = require("websocket").server;
// const http = require("http");

// const server = http.createServer();
// server.listen(55455, function () {
//   console.log("Server listening on 55455");
// });
// const wsServer = new webSocketServer({ httpServer: server });

// wsServer.on("request", function (request) {
//   console.log("establishing a new connection with client");
//   var connection = request.accept(null, request.origin);
//   setInterval(() => {
//     connection.sendUTF(new Date().getTime());
//   }, 100);
// });

const express = require("express");
const http = require("http");
const { server: WebSocketServer } = require("websocket");
const dotenv = require("dotenv");
dotenv.config();

// Initialize Express
const app = express();

// Define a simple route for HTTP validation by Render or other platforms
app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Use the PORT environment variable if it's available, otherwise default to 55455
const port = process.env.PORT;
server.listen(port, function () {
  console.log(`Server listening on ${port}`);
});

// Initialize the WebSocket server
const wsServer = new WebSocketServer({ httpServer: server });

wsServer.on("request", function (request) {
  console.log("Establishing a new connection with client");
  var connection = request.accept(null, request.origin);
  setInterval(() => {
    connection.sendUTF(new Date().getTime().toString());
  }, 100);
});
