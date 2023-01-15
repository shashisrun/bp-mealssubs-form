import Image from "next/image"
import React from "react"
export default function (){
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const slides = [
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
        {
            url: '/assets/plate.png',
            alt: 'plate'
        },
    ]
    return(
        <div>
            <ul className="flex overflow-x-auto items-center">
                {slides.map((slide, index) => {
                    return(
                        <li key={index} className="w-[512px] h-64 mx-5">
                            <Image src={slide.url} alt={slide.alt} width={1080} height={1080} className="w-full" />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}