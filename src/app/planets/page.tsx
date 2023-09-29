"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import type { IPlanet } from "@/app/api/planets/types";
import { NavBar } from "@/components/commons/nav-bar";
import { SwapiTable, SwapiTableColumn } from "@/components/commons/swapi-table";
import { SwapiCard } from "@/components/commons/swapi-card";

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json());

const columns: [SwapiTableColumn, SwapiTableColumn, SwapiTableColumn] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'population',
        label: 'Population'
    },
    {
        key: 'terrain',
        label: 'Terrain'
    },
];

const selectedColumns = [
    { key: 'name', label: 'Name' },
    { key: 'residents', label: 'Residents' },
    { key: 'terrain', label: 'Terrain' },
    { key: 'population', label: 'Population' },
    { key: 'climate', label: 'Climate' },
    { key: 'gravity', label: 'Gravity' },
    { key: 'diameter', label: 'Diameter' },
];

const CharactersPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = useSWR(`/api/planets?page=${page}`, fetcher);
    const planets: IPlanet[] = data?.body?.planets || [];
    const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(null);

    const handleSelectPlanet = (planet: IPlanet) => {
        if (selectedPlanet?.id === planet.id) {
            setSelectedPlanet(null);
            return;
        }
        // I know that the character data is not going to change so I can save the data
        // in the state to allow me to keep showing it even if the user is not longer on the table
        setSelectedPlanet(planet);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (planets.length > 0) {
            setPage(page + 1);
        }
    }

    return (
        <div className='relative flex flex-col w-full min-h-screen max-h-screen items-center bg-slate-400 dark:bg-gray-900'>
            <NavBar />
            <main className="h-screen w-full flex flex-col md:flex-row items-start justify-start p-8 dark:text-white gap-8">
                <div className="flex-1"></div>
                <SwapiTable
                    columns={columns}
                    data={planets}
                    handleSelect={handleSelectPlanet}
                    isLoading={isLoading}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    page={page}
                />
                <div className="flex-1">
                    <AnimatePresence>
                        {selectedPlanet && (
                            <SwapiCard
                                data={selectedPlanet}
                                columns={selectedColumns}
                            />
                        )}
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
};
export default CharactersPage;
