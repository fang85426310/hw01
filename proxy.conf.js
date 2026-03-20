const PROXY_CONFIG = [
  {
    context: [
      "/open-api"
    ],
    target: "https://www.travel.taipei",
    secure: true,
    changeOrigin: true,
    logLevel: "debug",
    // headers: {
    //   "Accept": "application/json",
    //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    // },
    // onProxyReq: function(proxyReq, req, res) {
    //   // Remove headers that might trigger Cloudflare bots detection
    //   proxyReq.removeHeader('x-forwarded-for');
    //   proxyReq.removeHeader('x-forwarded-host');
    //   proxyReq.removeHeader('x-forwarded-proto');
    // }
  }
];

module.exports = PROXY_CONFIG;
