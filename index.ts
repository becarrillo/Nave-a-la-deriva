import { RobotServer } from './robot-server';


// This is a simple HTTP server that responds with "Hello, World!" to any request.
// It listens on port 3000 and logs a message when it starts.
const server = new RobotServer();
// Set a damaged system to simulate the server's state
server.setDamagedSystem('navigation');
server.start();