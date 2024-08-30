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
    <main className="flex min-h-screen flex-col items-center justify-center 2xl:px-60 xl:px-28 lg:px-16 px-2 md:py-8 bg-white text-blue-950">
      <section className="flex flex-col w-full h-full items-center justify-center gap-y-8">
        <span className="flex flex-col ">
          <h1 className="md:text-4xl font-bold text-center text-2xl">Programas de Grado en Ingeniería</h1>
          <h1 className="md:text-4xl font-bold text-center text-2xl">Universidad de Los Lagos</h1>
        </span>
        <div className="flex flex-col md:grid md:grid-cols-2 md:p-8 gap-12 p-2 max-md:w-[75%] max-xs:w-full justify-center items-center">
          <button onClick={() => handleButtonClick('electricalCivilEngineering')} className='flex p-4 w-full flex-row justify-center md:justify-start items-center gap-x-2 border-2 border-white hover:border-blue-800 hover:bg-blue-800 hover:text-white hover:rounded-md'>
            <FaBolt className='xs:text-2xl text-lg'/>
            <span className='font-bold xs:text-xl text-base'>Ingeniería Civil Eléctrica</span>
          </button>
          <button onClick={() => handleButtonClick('civilEngineering')} className='flex p-4 w-full flex-row justify-center md:justify-start items-center gap-x-2 border-2 border-white hover:border-blue-800 hover:bg-blue-800 hover:text-white rounded-md'>
            <FaBuilding className='md:text-2xl text-lg'/>
            <span className='font-bold xs:text-xl text-base'>Ingeniería Civil</span>
          </button>
          <button onClick={() => handleButtonClick('computerScienceEngineering')} className='flex p-4 w-full flex-row justify-center md:justify-start items-center gap-x-2 border-2 border-white hover:border-blue-800 hover:bg-blue-800 hover:text-white hover:rounded-md'>
            <FaDesktop className='tmd:text-2xl text-lg'/>
            <span className='font-bold xs:text-xl text-base'>Ingeniería Civil Informática</span>
          </button>
          <button onClick={() => handleButtonClick('industrialCivilEngineering')} className='flex p-4 w-full flex-row justify-center md:justify-start items-center gap-x-2 border-2 border-white hover:border-blue-800 hover:bg-blue-800 hover:text-white hover:rounded-md'>
            <FaIndustry className='md:text-2xl text-lg'/>
            <span className='font-bold xs:text-xl text-base'>Ingeniería Civil Industrial</span>
          </button>
        </div>
      </section>
    </main>
  );
}