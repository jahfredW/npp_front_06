module.exports = {
    pages: {
      // This is our main page which refers to the main Javascript file
      index: "src/main.js", 
      // Next, we list all other pages in the application, 
      // and let all of them refer to the main Javascript file as well.
      other_page: "src/main.js",
    },
    publicPath: process.env.PUBLIC_URL || "/", // <-- this is correct now (and default)
    transpileDependencies: ["vuetify"],
      devServer: {
        allowedHosts: 'all',
        // contentSecurityPolicy: {
        //   headers: {
        //     'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
        //     // Ajoutez d'autres directives selon vos besoins
        //   },
        //   // directives: {
        //   //   defaultSrc: ["'self'"],
        //   //   scriptSrc: ["'self'", "https://js.stripe.com", "https://checkout.stripe.com/"],
        //   //   frameSrc: ["'self'","https://js.stripe.com", "https://checkout.stripe.com"],
        //   // }
        // },
        proxy: {
          '^/users': {
            target: 'https://localhost:8080/',
            ws: true,
            changeOrigin: true
          },
        }
      }
    }