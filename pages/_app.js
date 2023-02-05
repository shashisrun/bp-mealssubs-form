import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { LocationProvider } from '../contexts/currentLocation'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LocationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocationProvider>
    </AuthProvider>
  )
}
