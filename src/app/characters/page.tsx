"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { ICharacter } from "@/services/characters/types";
import { NavBar } from "@/components/commons/nav-bar";
import { SwapiTable, SwapiTableColumn } from "@/components/commons/swapi-table";
import { SwapiCard } from "@/components/commons/swapi-card";
import { useQuery } from "react-query";
import { getAllCharacters } from "@/services/characters";

const columns: [SwapiTableColumn, SwapiTableColumn, SwapiTableColumn] = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'birth_year',
        label: 'Birth year'
    },
    {
        key: 'gender',
        label: 'Gender'
    },
];

const selectedColumns = [
    { key: 'name', label: 'Name' },
    { key: 'birth_year', label: 'Birth year' },
    { key: 'gender', label: 'Gender' },
    { key: 'height', label: 'Height' },
    { key: 'mass', label: 'Mass' },
    { key: 'hair_color', label: 'Hair color' },
    { key: 'skin_color', label: 'Skin color' },
    { key: 'eye_color', label: 'Eye color' }
];

const CharactersPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = useQuery(['getAllCharacters', page], () => getAllCharacters(page));
    const characters = useMemo(() => data || [], [data]);
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);

    const handleSelectCharacter = (character: ICharacter) => {
        if (selectedCharacter?.id === character.id) {
            setSelectedCharacter(null);
            return;
        }
        // I know that the character data is not going to change so I can save the data
        // in the state to allow me to keep showing it even if the user is not longer on the table
        setSelectedCharacter(character);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (characters.length > 0) {
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
                    data={characters}
                    handleSelect={handleSelectCharacter}
                    isLoading={isLoading}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    page={page}
                />
                <div className="flex-1">
                    <AnimatePresence>
                        {selectedCharacter && (
                            <SwapiCard
                                data={selectedCharacter}
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
