module.exports.calculatePriceForDimension = function ({height,width,length,weight}) {
    // Convert string inputs to numbers
    const numericLength = parseFloat(length);
    const numericWidth = parseFloat(width);
    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    // Example pricing strategy: base price + (dimension sum * weight factor)
    const basePrice = 10; // Base price for handling and processing
    const sizeFactor = 0.02; // Price per unit of combined dimensions
    const weightFactor = 0.05; // Price per unit of weight

    // Calculate dimensional sum
    const dimensionalSum = numericLength + numericWidth + numericHeight;

    // Calculate total price
    return basePrice + (dimensionalSum * sizeFactor) + (numericWeight * weightFactor);
}
