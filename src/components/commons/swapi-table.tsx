import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils";

export type SwapiTableColumn = {
    key: string;
    label: string;
}

type SwapiTableProps = {
    data: any[];
    handleSelect: (item: any) => void;
    isLoading: boolean;
    columns: [SwapiTableColumn, SwapiTableColumn, SwapiTableColumn];
    handlePrevPage: () => void;
    handleNextPage: () => void;
    page: number;
    maxWidth?: string;
}

export const SwapiTable = ({ data, handleSelect, isLoading, columns, handlePrevPage, handleNextPage, page, maxWidth }: SwapiTableProps) => {
    return (
        <div className={cn("max-w-2xl w-full h-full flex flex-col", maxWidth || "max-w-2xl")}>
            <table className={cn("max-w-2xl w-full h-full border-collapse border border-gray-300 dark:border-gray-700 max-h-[806px] overflow-y-hidden", maxWidth || "max-w-2xl")} >
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{columns[0].label}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{columns[1].label}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{columns[2].label}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* I'm doing it on this way to avoid the table to change the content size on next page loading */}
                    {new Array(10).fill(0).map((_, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 max-h-8"
                            aria-disabled={isLoading}
                            onClick={() => !isLoading && handleSelect(data[index])}
                        >
                            <AnimatePresence>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
                                >
                                    {!isLoading &&
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.05, delay: (data.length - index) * 0.025 }}
                                            exit={{ opacity: 0 }}
                                            className="whitespace-break-spaces"
                                        >
                                            {data[index]?.[columns[0].key] as string || ''}
                                        </motion.p>
                                    }
                                    {isLoading && <Skeleton className="w-full h-4" />}
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
                                >
                                    {!isLoading &&
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.05, delay: (data.length - index) * 0.025 }}
                                            exit={{ opacity: 0 }}
                                            className="whitespace-break-spaces"
                                        >
                                            {data[index]?.[columns[1].key] as string || ''}
                                        </motion.p>
                                    }
                                    {isLoading && <Skeleton className="w-full h-4" />}
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 dark:hover:text-gray-200"
                                >
                                    {!isLoading &&
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.05, delay: (data.length - index) * 0.025 }}
                                            exit={{ opacity: 0 }}
                                            className="whitespace-break-spaces"
                                        >
                                            {data[index]?.[columns[2].key] as string}
                                        </motion.p>
                                    }
                                    {isLoading && <Skeleton className="w-full h-4" />}
                                </td>
                            </AnimatePresence>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center mt-4">
                <div className="flex items-center justify-center">
                    <Button onClick={handlePrevPage} disabled={page === 1}>
                        <MoveLeft size={16} className="mr-2" />
                        Prev
                    </Button>
                    <span className="mx-4 text-gray-500 dark:text-gray-400">{page}</span>
                    <Button onClick={handleNextPage} disabled={isLoading || data.length < 10}>
                        Next
                        <MoveRight size={16} className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}