const http = require('http')
const net = require('net')

const server = http.createServer((req, res) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:3000' },
  }

  const proxy = http.request(options, (targetRes) => {
    res.writeHead(targetRes.statusCode, targetRes.headers)
    targetRes.pipe(res, { end: true })
  })

  proxy.on('error', () => {
    res.writeHead(502)
    res.end('Vite server on port 3000 not reachable')
  })

  req.pipe(proxy, { end: true })
})

// Handle WebSocket upgrade for Vite HMR
server.on('upgrade', (req, socket, head) => {
  const proxySocket = net.connect(3000, 'localhost', () => {
    proxySocket.write(
      `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n` +
        Object.keys(req.headers)
          .map((key) => `${key}: ${req.headers[key]}`)
          .join('\r\n') +
        '\r\n\r\n'
    )
    if (head && head.length) proxySocket.write(head)
    proxySocket.pipe(socket)
    socket.pipe(proxySocket)
  })

  proxySocket.on('error', () => socket.destroy())
  socket.on('error', () => proxySocket.destroy())
})

server.listen(3001, () => {
  console.log('Mirror proxy running on http://localhost:3001 -> http://localhost:3000')
})
