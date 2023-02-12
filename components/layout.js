import Image from "next/image";
import Footer from "./footer";
import Header from "./header";
import Slider from "./slider";
import { useLocation } from "../contexts/currentLocation";
import { useDeliveryPrice } from "../contexts/deliveryPrice";

export default function Layout({ children }) {
    const { location } = useLocation();
    const { deliveryPrice } = useDeliveryPrice();
    return (
        <>
            <Header />
            <main className="h-screen bg-accent pt-[10vh]">
                <div className="container-fluid md:mx-10 mx-2 h-full bg-[url('/assets/bodybg.png')] bg-cover bg-center">
                    <div className="flex md:flex-row flex-col w-full rounded-box overflow-hidden h-[80vh] shadow-2xl">
                        <div className="md:w-3/5 w-full bg-base-100 md:border-l-[16px] md:border-b-0 border-b-[16px] border-secondary md:order-1 order-2 flex-grow overflow-y-auto bg-[url('/assets/bodybg.png')] bg-cover bg-center">
                            {location ?
                                <>
                                    Address: {location.house} {location.street}
                                </>
                                : <></>}
                            {deliveryPrice ? <>
                                <br></br>
                                Delivery City : {deliveryPrice.city}
                                <br></br>
                                Delivery distance : {deliveryPrice.distance}
                                <br></br>
                                Delivery Price : {deliveryPrice.price}
                                <br></br>
                                Delivery From Kitchen : {deliveryPrice.kitchen}
                                <br></br>


                            </> : <></>}
                            <div className="md:pt-[25%] pt-[10%]">
                                {children}
                            </div>
                        </div>
                        <div className="md:w-2/5 md:h-full h-64 bg-secondary bg-[url('/assets/background.png')] bg-cover bg-center md:order-2 order-1 text-white">
                            <div className="h-full w-full flex flex-row md:flex-col">
                                <div className="md:h-1/3 h-full md:w-full w-1/2">
                                    <div className="md:p-5 p-2 md:text-center text-left">
                                        <Image src={'/assets/logo_white.png'} alt="BodyPower" width={826} height={415} className="w-1/2 md:w-1/3 md:mx-auto my-5" />
                                        <h1 className="md:text-3xl text-xl font-bold">Start your Nutritionally Balanced meal plan!</h1>
                                        {/* <p className="md:text-xl">Reference site about Lorem Ipsum, giving information on its origins, as well as a random</p> */}
                                    </div>
                                </div>
                                <div className="md:h-2/3 h-full md:w-full w-1/2">
                                    <div className="w-full h-full">
                                        <Slider />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}