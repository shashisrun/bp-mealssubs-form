import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { LocationProvider } from '../contexts/currentLocation'
import { DeliveryPriceProvider } from '../contexts/deliveryPrice'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LocationProvider>
        <DeliveryPriceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DeliveryPriceProvider>
      </LocationProvider>
    </AuthProvider>
  )
}
