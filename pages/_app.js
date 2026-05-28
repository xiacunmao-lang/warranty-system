// pages/_app.js
import '../styles/globals.css' // <--- 必须加上这一行！

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
