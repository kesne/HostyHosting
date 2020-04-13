export default function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}
