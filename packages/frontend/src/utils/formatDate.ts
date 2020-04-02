export default function formatDate(timestamp: string) {
    return new Date(timestamp).toDateString();
}
