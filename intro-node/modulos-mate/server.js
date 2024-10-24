const http = require('http');
const url = require('url');
const operacionesMatematicas = require('./modules/operacionesMatematicas');
const PORT = 3000;
const server = http.createServer((req, res) => {
    const query =url.parse(req.url, true).query;
    const {operacion, a,b}=query;
    let resultado;
    try{
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch (operacion){
            case 'sumar':
                resultado = operacionesMatematicas.sumar(numA,numB);
                break;
            case 'restar':
                resultado = operacionesMatematicas.restar(numA,numB);
                break;
            case 'multiplicar':
                resultado = operacionesMatematicas.multiplicar(numA,numB);
                break;
            case 'dividir':
                resultado = operacionesMatematicas.dividir(numA,numB);
                break;
            default:
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Operación no valida');
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({resultado}));
    } catch (error){
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`ERROR: ${error.message}`);
    }
})

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});