"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from 'react'
gsap.registerPlugin(ScrollTrigger);
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Hero = () => {
    const [value, onChange] = useState(new Date());
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (button && text) {
            button.addEventListener("mouseenter", () => {
                gsap.fromTo(
                    text,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: .9, ease: "power3.out" }
                );
            });
        }
    }, []);

    useLayoutEffect(() => {
        const tx = gsap.context(() => {
            let ol = gsap.timeline();
            ScrollTrigger.create({
                trigger: ".teamSection",
                start: "-30% 50%",
                end: "bottom 100%",
                animation: ol,
                toggleActions: 'play',
            });
            ol.from(".teamAnimation", {
                scale: 0,
                stagger: 0.5,
            })
        })
        return () => tx.revert();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen teamSection">
            <h1 className="pb-5 font-bold teamAnimation">Calendar</h1>
            <Calendar className="!border-blue-700 !rounded-xl teamAnimation" onChange={onChange} value={value} />
            <div className="teamAnimation">
                <button
                    ref={buttonRef}
                    className="bg-blue-300 px-5 py-2 mt-5 text-white duration-300 hover:text-black hover:bg-blue-500 relative overflow-hidden"
                >
                    <span ref={textRef} className="block">
                        Text
                    </span>
                </button>
            </div>
            <p data-aos="flip-left" className="text-center max-w-[550px] mx-auto pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi recusandae consectetur odit molestiae iure provident voluptatum, possimus doloremque eos. Tempore maiores beatae magni, voluptatum assumenda repudiandae et ipsam laborum accusantium?</p>
        </div>
    );
};

export default Hero;