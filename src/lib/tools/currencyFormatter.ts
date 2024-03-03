

const currencyFormatter = new Intl.NumberFormat('ka-GE', {
    style: 'currency',
    currency: 'GEL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const formatCurrency = (amount: number) => currencyFormatter.format(amount);