import Image from "next/image"
import React from "react"
export default function Slider(){
    let counter = 0;
    let timer;
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

    const updateCount = () => {
        timer = setInterval(() => {
            if (counter + 1 === slides.length) {
                counter = 0;
            } else {
                counter += 1;
            }
            document.querySelector(`[href="#carousel-${counter}"]`).click()
        }, 3000)
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(counter)
        console.log(document.querySelector(`[href="#carousel-${counter}"]`));
        document.querySelector(`[href="#carousel-${counter}"]`).classList.remove('bg-accent')
        document.querySelector(`[href="#carousel-${counter}"]`).classList.add('bg-primary')
        counter = parseInt(event.target.getAttribute('index'));
        console.log(counter)
        console.log(event.target);
        event.target.classList.add('bg-accent');
        event.target.classList.remove('bg-primary');
        document.getElementById(`carousel-${counter}`).scrollIntoView();
    }

    React.useEffect(() => {
        updateCount()

        return () => clearInterval(timer)
    }, [])
    return(
        <div className="md:my-0 my-[25%] px-2">
            <ul className="carousel md:w-3/5 md:px-5 md:py-3 mx-auto gap-7">
                {slides.map((slide, index) => {
                    return(
                        <li key={index} className="carousel-item w-full" id={`carousel-${index}`}>
                            <Image src={slide.url} alt={slide.alt} className="w-full" width={1080} height={1080} />
                        </li>
                    )
                })}
            </ul>
            <div className="md:flex justify-center w-full py-2 gap-2 hidden">
                {slides.map((slide, index) => {
                    return (
                        <a key={index} index={index} href={`#carousel-${index}`} onClick={handleClick} className="w-4 h-4 bg-primary rounded-full"></a>
                    )
                })}
            </div>
        </div>
    )
}