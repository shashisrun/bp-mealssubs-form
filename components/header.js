import { useRouter } from 'next/router';
import Link from 'next/link'
import { useAuth } from '../contexts/authContext'
import { auth } from "../config/firebase";
export default function Header() {
    const router = useRouter()
    const { user, setUser } = useAuth();
    return (
        <>
            <header className="border-b-2 border-primary shadow-lg mb-5">
                <nav className="navbar bg-base-100 container mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            {/* <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li tabIndex={0}>
                                    <a className="justify-between">
                                        Parent
                                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                    </a>
                                    <ul className="p-2">
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul> */}
                        </div>
                        <Link href="/" className="btn btn-ghost normal-case text-xl">
                            BodyPower
                        </Link>
                    </div>
                    {/* <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><a>Item 1</a></li>
                            <li tabIndex={0}>
                                <a>
                                    Parent
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                </a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div> */}
                    <div className="navbar-end">
                        {!user ?
                            <>
                                <Link href="/login" className="btn btn-primary">
                                   Login
                                </Link>
                            </> :
                            <>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://placeimg.com/80/80/people" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <Link href={'/address'}>
                                                My Addresses
                                            </Link>
                                        </li>
                                        <li><button onClick={() => {
                                            auth.signOut()
                                            router.reload(window.location.pathname)
                                        }}>Logout</button></li>
                                    </ul>
                                </div>
                            </>
                        }
                        
                    </div>
                </nav>
            </header>
        </>
    )
}