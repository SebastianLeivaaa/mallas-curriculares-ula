"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { intToRoman } from '@/utils/romanUtils';
import { convertYear } from '@/utils/yearUtils';

type Course = {
    name: string;
    semester: number;
    prerequisites: string[];
};

type Data = {
    courses: Record<string, Course>;
    durationSemesters: number;
};

export default function Curricula() {
    const [data, setData] = useState<Data | null>(null);
    const [years, setYears] = useState<number[][]>([]);
    const [courseSelected, setCourseSelected] = useState<string | null>(null);
    const [selectedCoursePrerequisites, setSelectedCoursePrerequisites] = useState<string[]>([]);
    const [coursesWithSelectedAsPrerequisite, setCoursesWithSelectedAsPrerequisite] = useState<string[]>([]);

    const searchParams = useSearchParams();
    const career = searchParams.get('career');

    const fetchData = async () => {
        const response = await fetch(`/api/curricula?career=${career}`);
        const data: Data = await response.json();
        setData(data);

        // Agrupar semestres en años
        const semesters = Array.from({ length: data.durationSemesters }, (_, i) => i + 1);
        const groupedYears = [];
        for (let i = 0; i < semesters.length; i += 2) {
            groupedYears.push(semesters.slice(i, i + 2));
        }
        setYears(groupedYears);
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
        <div className='flex min-h-screen flex-col items-center justify-center 2xl:px-60 xl:px-28 lg:px-16 px-4 md:py-8 bg-white'>
            <section className='w-full'>
                {years.map((yearSemesters, yearIndex) => (
                    <div key={yearIndex} className="mb-4">
                        <div className="bg-blue-500 p-4 m-2 border-2 border-gray-500 rounded w-full">
                            <h1 className="text-2xl font-bold">{convertYear(yearIndex + 1)}</h1>
                        </div>
                        {yearSemesters.map((semester) => (
                            <div key={`semester-${semester}`} className="flex flex-wrap w-full gap-x-1.5 gap-y-1.5 text-black m-2">
                                <div className='p-4 rounded border-2 border-gray-500 items-center text-start bg-blue-200 w-full xl:basis-[10%]'>
                                    Semestre {intToRoman(semester)}
                                </div>
                                {Object.entries(data?.courses || {})
                                    .filter(([_, course]) => course.semester === semester)
                                    .map(([id, course]) => (
                                        <button
                                            key={id}
                                            className={`p-4 rounded border-2 border-gray-500 flex-1 text-start xl:basis-1/12 
                                                ${courseSelected === id ? 'bg-red-300' : ''}
                                                ${selectedCoursePrerequisites.includes(id) ? 'bg-green-300' : ''}
                                                ${coursesWithSelectedAsPrerequisite.includes(id) ? 'bg-yellow-300' : ''}
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
        </div>
    );
}
