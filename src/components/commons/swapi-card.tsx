import { motion } from 'framer-motion';

type Column = {
    key: string;
    label: string;
}

type SwapiCardProps = {
    data: any;
    columns: Column[];
}

export const SwapiCard = ({data, columns}: SwapiCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-md p-4 bg-white rounded-lg shadow-lg mt-8 dark:bg-gray-800 dark:text-white"
        >
            <h2 className="text-lg font-medium mb-4">{data[columns[0].key]}</h2>
            {columns.slice(1).map((column, index) => (
                <p key={index} className="text-sm text-gray-500 mb-2"><strong>{column.label}:</strong> {data[column.key]}</p>
            ))}
        </motion.div>
    )
}