import Title from './Title';

export default function Card({
    header,
    title,
    actions,
    children
}: {
    header?: React.ReactNode;
    title?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                {header ?? (
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <Title>{title}</Title>
                        </div>
                        <div>{actions}</div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}
