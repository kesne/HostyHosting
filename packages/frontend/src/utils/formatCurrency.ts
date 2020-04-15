export default function formatCurrency(amount: number) {
    return (amount / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}
