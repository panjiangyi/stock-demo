export function formatNumber(num: number) {
    const absNum = Math.abs(num); // Get the absolute value of the number
    if (absNum >= 1000000000) {
        // If the number is greater than or equal to 1 billion
        return (num / 1000000000).toFixed(1) + 'B'; // Divide by 1 billion and add a 'b' suffix
    } else if (absNum >= 1000000) {
        // If the number is greater than or equal to 1 million
        return (num / 1000000).toFixed(1) + 'M'; // Divide by 1 million and add an 'm' suffix
    } else if (absNum >= 1000) {
        // If the number is greater than or equal to 1 thousand
        return (num / 1000).toFixed(1) + 'K'; // Divide by 1 thousand and add a 'k' suffix
    } else {
        // If the number is less than 1 thousand
        return num.toString(); // Return the number as a string
    }
}