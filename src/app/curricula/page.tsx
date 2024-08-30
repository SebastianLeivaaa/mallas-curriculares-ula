"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { intToRoman } from '@/utils/romanUtils';
import { convertYear } from '@/utils/yearUtils';
import { Navbar } from './components/navbar';
import ClipLoader from "react-spinners/ClipLoader";

type Course = {
    name: string;
    semester: number;
    prerequisites: string[];
};

type Data = {
    courses: Record<string, Course>;
    durationSemesters: number;
    durationYears: number;
    name: string;
    yearCurricula: number;
    years: number[];
};

function CurriculaComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data | null>(null);
    const [years, setYears] = useState<number[][]>([]);
    const [courseSelected, setCourseSelected] = useState<string | null>(null);
    const [selectedCoursePrerequisites, setSelectedCoursePrerequisites] = useState<string[]>([]);
    const [coursesWithSelectedAsPrerequisite, setCoursesWithSelectedAsPrerequisite] = useState<string[]>([]);

    const searchParams = useSearchParams();
    const career = searchParams.get('career');

    const fetchData = async (year?: number) => {
        setLoading(true);
    
        let url = `/api/curricula?career=${career}`;
        if (year) {
            url += `&year=${year}`;
        }
    
        try {
            const response = await fetch(url);
            const data: Data = await response.json();
            console.log(data);
            setData(data);
    
            const semesters = Array.from({ length: data.durationSemesters }, (_, i) => i + 1);
            const groupedYears = [];
            for (let i = 0; i < semesters.length; i += 2) {
                groupedYears.push(semesters.slice(i, i + 2));
            }
            setYears(groupedYears);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [career]);

    const handleCourseClick = (id: string) => {
        if (data) {
            setCourseSelected(id);

            const selectedPrerequisites = data.courses[id]?.prerequisites || [];
            setSelectedCoursePrerequisites(selectedPrerequisites);

            const selectedAsPrerequisite = Object.entries(data.courses)
                .filter(([_, course]) => course.prerequisites.includes(id))
                .map(([id]) => id);
            setCoursesWithSelectedAsPrerequisite(selectedAsPrerequisite);
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center 2xl:px-60 xl:px-28 lg:px-16 px-4 bg-white'>
            {loading ? (
                <div className='text-center text-gray-500'>
                    <ClipLoader color={'#000'} loading={loading} size={100} />
                </div>
            ) : (
              <>
                <Navbar title={data?.name || ''} yearCurricula={data?.yearCurricula || 1} handleYear={fetchData} years={data?.years || []}/>
                <section className='w-full'>
                    <div className='w-full flex flex-wrap gap-y-4 md:gap-x-4 gap-x-1.5 text-black justify-center mb-8 text-xs md:text-base'>
                        <div className='flex items-center'>
                            <div className='w-4 h-4 rounded-full bg-blue-600 mr-2'></div>
                            <span>Seleccionada</span>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-4 h-4 rounded-full bg-green-600 mr-2'></div>
                            <span>Prerequisitos</span>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-4 h-4 rounded-full bg-yellow-500 mr-2'></div>
                            <span>Cursos que dependen</span>
                        </div>
                    </div>
                    {years.map((yearSemesters, yearIndex) => (
                        <div key={yearIndex} className="mb-4">
                            <div className="bg-blue-900 p-4 m-2 border-2 border-blue-900 rounded-t w-full">
                                <h1 className="l:text-2xl text-base font-bold">{convertYear(yearIndex + 1)}</h1>
                            </div>
                            {yearSemesters.map((semester) => (
                                <div key={`semester-${semester}`} className="flex flex-wrap w-full gap-x-1.5 gap-y-1.5 text-black m-2">
                                    <div className='p-4 rounded border-2 border-blue-700 l:text-base text-xs items-center text-start bg-blue-700 text-white w-full xl:basis-[10%]'>
                                        Semestre {intToRoman(semester)}
                                    </div>
                                    {Object.entries(data?.courses || {})
                                        .filter(([_, course]) => course.semester === semester)
                                        .map(([id, course]) => (
                                            <button
                                                key={id}
                                                className={`l:p-4 p-2 rounded border-2 border-gray-500 flex-1 text-start xl:basis-1/12 l:text-base text-xs 
                                                    ${courseSelected === id ? 'bg-blue-600 text-white' : ''}
                                                    ${selectedCoursePrerequisites.includes(id) ? 'bg-green-600 text-white' : ''}
                                                    ${coursesWithSelectedAsPrerequisite.includes(id) ? 'bg-yellow-500 text-gray-900' : ''}
                                                `}
                                                onClick={() => handleCourseClick(id)}
                                            >
                                                {course.name}
                                            </button>
                                        ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
              </>  
            )}
        </div>
    );
}

export default function Curricula() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CurriculaComponent />
        </Suspense>
    );
}
