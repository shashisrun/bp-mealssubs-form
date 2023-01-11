import Footer from "./footer";
import Header from "./header";

export default function Layout({children}) {
    return (
        <>
            <Header />
            <main className="container mx-auto my-5">
                {children}
            </main>
            <Footer />
        </>
    )
}