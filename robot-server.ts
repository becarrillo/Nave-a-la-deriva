import * as http from 'http';
import DAMAGED_SYSTEM_TABLE from './database/damage-system-table';


type DamagedSystemKey = keyof typeof DAMAGED_SYSTEM_TABLE;

export class RobotServer {
    private damagedSystem: DamagedSystemKey | null = null;

    constructor(private readonly serverHttp: typeof http = http) { }

    setDamagedSystem(system: DamagedSystemKey): void {
        this.damagedSystem = system;
    }
    /**
     * Starts the HTTP server and listens on port 3000.
     * Logs a welcome message and the headers of the response.
     */
    start() {
        const portNumber = 3000;
        // Create an HTTP server that listens for requests
        this.serverHttp.createServer((req, res) => {
            console.log('Bienvenido(a) a la API de Nave a la Deriva\n');
            console.info(req.headers);
        })
            .on('request', (req, res) => {   // Handle incoming requests
                if (req.method === 'GET') {
                    switch (req.url) {
                        case '/status':
                            if (this.damagedSystem !== null) {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                // Respond with the current damaged system
                                res.end(JSON.stringify({
                                    "damaged_system": this.damagedSystem,
                                }));
                            } else return;
                            break;
                        case '/repair-bay':
                            if (this.damagedSystem !== null) {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(
                                    `
                                    <!DOCTYPE html>
                                    <html>
                                        <head>
                                            <title>Repair</title>
                                        </head>
                                        <body>
                                            <div class="anchor-point">
                                                ${DAMAGED_SYSTEM_TABLE[this.damagedSystem as DamagedSystemKey]}
                                            </div>
                                        </body>
                                    </html>
                                `
                                );
                            }  else return;
                    }
                }
                if (req.method === 'POST' && req.url==='/teapot') {
                    res.statusCode = 418; // I'm a teapot;
                    res.end();
                }
            })
            .listen(portNumber, () => {
                console.log(`Servidor ejecutándose en http://localhost:${portNumber}/`);
            });
    }
}