"use client";
import { useEffect, useState } from 'react';
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
    const [prerequisites, setPrerequisites] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/curricula');
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

        fetchData();
    }, []);

    useEffect(() => {}, [courseSelected, prerequisites]);

    const handleCourseClick = (id: string) => {
        setCourseSelected(id);
        setPrerequisites(data?.courses[id]?.prerequisites || []);
    };

    return (
        <div>
            {years.map((yearSemesters, yearIndex) => (
                <div key={yearIndex} className="mb-4">
                    <div className="bg-blue-500 p-4 m-2 border-2 border-gray-500 rounded w-full">
                        <h1 className="text-4xl font-bold">{convertYear(yearIndex + 1)}</h1>
                    </div>
                    {yearSemesters.map((semester) => (
                        <div key={`semester-${semester}`} className="flex flex-wrap w-full gap-x-0.5 text-black m-2">
                            <div className='p-4 rounded border-2 border-gray-500 items-center justify-center bg-blue-200 w-full xl:basis-1/12'>
                                Semestre {intToRoman(semester)}
                            </div>
                            {Object.entries(data?.courses || {})
                                .filter(([_, course]) => course.semester === semester)
                                .map(([id, course]) => (
                                    <button
                                        key={id}
                                        className={`p-4 rounded border-2 border-gray-500 flex-1 text-start xl:basis-1/12 ${
                                            courseSelected === id ? 'bg-red-300' : 'bg-white'
                                        } ${prerequisites.includes(id) ? 'bg-green-300' : ''}`}
                                        onClick={() => handleCourseClick(id)}
                                    >
                                        {course.name}
                                    </button>
                                ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}