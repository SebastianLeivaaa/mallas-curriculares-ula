import React from 'react';
import { useRouter } from 'next/navigation';
import { IoMdHome } from "react-icons/io";

export function Navbar({ title, yearCurricula, handleYear, years }: { title: string, yearCurricula: number, handleYear: (year: number) => void, years: number[] }) {
    
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/');
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = Number(event.target.value);
        handleYear(selectedYear);
    };

    return (
        <header className="flex sm:flex-row flex-col w-full p-4 gap-y-4 items-center justify-between">
            <h1 className='font-bold text-center text-xl xs:text-2xl sm:text-xl md:text-2xl text-blue-700'>{title}</h1>
            <div className='flex sm:flex-row items-center gap-x-2 md:gap-x-8 flex-col gap-y-4'>
                <select className='bg-blue-700 px-2 py-2 rounded l:text-lg text-base  w-fit' onChange={handleSelectChange} value={yearCurricula}>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <button onClick={handleButtonClick} className='flex p-2 w-full l:text-lg text-base  flex-row justify-start items-center gap-x-2 border-2 text-blue-700 border-white hover:border-blue-700 hover:bg-blue-700 hover:text-white hover:rounded-md'>
                    <IoMdHome className='text-2xl'/> Volver al Inicio
                </button>
            </div>
        </header>
    );
}
