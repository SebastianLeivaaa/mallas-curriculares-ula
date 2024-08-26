"use client";
import { FaBolt, FaBuilding } from "react-icons/fa6";
import { FaDesktop, FaIndustry } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const handleButtonClick = (career: string) => {
    router.push(`/curricula?career=${encodeURIComponent(career)}`);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center 2xl:px-60 xl:px-28 lg:px-16 px-4 md:py-8 bg-white text-black">
      <section className="flex flex-col w-full h-full items-center justify-center gap-y-8">
        <span className="flex flex-col">
          <h1 className="md:text-4xl font-bold text-center text-2xl">Programas de Grado en Ingeniería</h1>
          <h1 className="md:text-4xl font-bold text-center text-2xl">Universidad de Los Lagos</h1>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 p-8 gap-12">
        <button onClick={() => handleButtonClick('electricalCivilEngineering')} className='flex p-4 w-full flex-row justify-start items-center gap-x-2 border-2 border-white hover:border-gray-800 hover:bg-gray-800 hover:text-white hover:rounded-md'>
            <FaBolt className='text-2xl'/>
            <span className='font-bold md:text-xl text-lg'>Ingeniería Civil Eléctrica</span>
          </button>
          <button onClick={() => handleButtonClick('civilEngineering')} className='flex p-4 w-full flex-row justify-start items-center gap-x-2 border-2 border-white hover:border-gray-800 hover:bg-gray-800 hover:text-white rounded-md'>
            <FaBuilding className='text-2xl'/>
            <span className='font-bold md:text-xl text-lg'>Ingeniería Civil</span>
          </button>
          <button onClick={() => handleButtonClick('computerScienceEngineering')} className='flex p-4 w-full flex-row justify-start items-center gap-x-2 border-2 border-white hover:border-gray-800 hover:bg-gray-800 hover:text-white hover:rounded-md'>
            <FaDesktop className='text-2xl'/>
            <span className='font-bold md:text-xl text-lg'>Ingeniería Civil Informática</span>
          </button>
          <button onClick={() => handleButtonClick('industrialCivilEngineering')} className='flex p-4 w-full flex-row justify-start items-center gap-x-2 border-2 border-white hover:border-gray-800 hover:bg-gray-800 hover:text-white hover:rounded-md'>
            <FaIndustry className='text-2xl'/>
            <span className='font-bold md:text-xl text-lg'>Ingeniería Civil Industrial</span>
          </button>
        </div>
      </section>
    </main>
  );
}