export default function Card({
    header,
    children
}: {
    header: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">{header}</div>
            {children}
        </div>
    );
}
