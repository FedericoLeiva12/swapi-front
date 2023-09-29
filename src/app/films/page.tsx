"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import type { IFilm } from "@/app/api/films/types";
import { NavBar } from "@/components/commons/nav-bar";
import { SwapiTable, SwapiTableColumn } from "@/components/commons/swapi-table";
import { SwapiCard } from "@/components/commons/swapi-card";

const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then(res => res.json());

const columns: [SwapiTableColumn, SwapiTableColumn, SwapiTableColumn] = [
    {
        key: 'title',
        label: 'Title'
    },
    {
        key: 'director',
        label: 'Director'
    },
    {
        key: 'release_date',
        label: 'Release Date'
    },
];

const selectedColumns = [
    { key: 'title', label: 'Title' },
    { key: 'director', label: 'Director' },
    { key: 'release_date', label: 'Release Date' },
    { key: 'producer', label: 'Producer' },
    { key: 'opening_crawl', label: 'Opening crawl' },
];

const CharactersPage = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = useSWR(`/api/films?page=${page}`, fetcher);
    const films: IFilm[] = data?.body?.films || [];
    const [selectedFilm, setSelectedFilm] = useState<IFilm | null>(null);

    const handleSelectFilm = (film: IFilm) => {
        if (selectedFilm?.id === film.id) {
            setSelectedFilm(null);
            return;
        }
        // I know that the character data is not going to change so I can save the data
        // in the state to allow me to keep showing it even if the user is not longer on the table
        setSelectedFilm(film);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (films.length > 0) {
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
                    data={films}
                    handleSelect={handleSelectFilm}
                    isLoading={isLoading}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    page={page}
                />
                <div className="flex-1">
                    <AnimatePresence>
                        {selectedFilm && (
                            <SwapiCard
                                data={selectedFilm}
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
