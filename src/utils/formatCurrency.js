const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {currency: "USD", style: "currency"})
// This correctly defines numbers into 2 decimal currency format
export function formatCurrency(number){
    return CURRENCY_FORMATTER.format(number)
}