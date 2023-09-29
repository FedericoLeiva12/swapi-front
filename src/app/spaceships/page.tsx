"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { ISpaceship } from "@/services/spaceships/types";
import { NavBar } from "@/components/commons/nav-bar";
import { SwapiTable, SwapiTableColumn } from "@/components/commons/swapi-table";
import { SwapiCard } from "@/components/commons/swapi-card";
import { useQuery } from "react-query";
import { getAllSpaceships } from "@/services/spaceships";

const columns: [SwapiTableColumn, SwapiTableColumn, SwapiTableColumn] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'manufacturer',
        label: 'Manufacturer'
    },
    {
        key: 'model',
        label: 'Model'
    },
];

const selectedColumns = [
    { key: 'name', label: 'Name' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'model', label: 'Model' },
    { key: 'starship_class', label: 'Starship class' },
    { key: 'cost_in_credits', label: 'Cost in credits' },
    { key: 'length', label: 'Length' },
    { key: 'crew', label: 'Crew' },
    { key: 'passengers', label: 'Passengers' },
    { key: 'max_atmosphering_speed', label: 'Max atmosphering speed' },
    { key: 'hyperdrive_rating', label: 'Hyperdrive rating' },
    { key: 'MGLT', label: 'MGLT' },
    { key: 'cargo_capacity', label: 'Cargo capacity' },
    { key: 'consumables', label: 'Consumables' },
];

const SpaceshipsPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = useQuery(['getAllSpaceships', page], () => getAllSpaceships(page));
    const spaceships: ISpaceship[] = data || [];
    const [selectedSpaceship, setSelectedSpaceship] = useState<ISpaceship | null>(null);

    const handleSelectCharacter = (character: ISpaceship) => {
        if (selectedSpaceship?.id === character.id) {
            setSelectedSpaceship(null);
            return;
        }
        // I know that the character data is not going to change so I can save the data
        // in the state to allow me to keep showing it even if the user is not longer on the table
        setSelectedSpaceship(character);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (spaceships.length > 0) {
            setPage(page + 1);
        }
    }

    return (
        <div className='relative flex flex-col w-full min-h-screen items-center bg-slate-400 dark:bg-gray-900'>
            <NavBar />
            <main className="min-h-screen w-full flex flex-col md:flex-row items-start justify-start p-8 dark:text-white gap-8">
                <div className="flex-1"></div>
                <SwapiTable
                    columns={columns}
                    data={spaceships}
                    handleSelect={handleSelectCharacter}
                    isLoading={isLoading}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    page={page}
                    maxWidth="max-w-5xl"
                />
                <div className="flex-1">
                    <AnimatePresence>
                        {selectedSpaceship && (
                            <SwapiCard
                                data={selectedSpaceship}
                                columns={selectedColumns}
                            />
                        )}
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
};
export default SpaceshipsPage;
