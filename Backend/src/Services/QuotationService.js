module.exports.getQuotation = function ({height, width, length, weight}, deliveryType) {
    const numericLength = parseFloat(length);
    const numericWidth = parseFloat(width);
    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    // Basic pricing components
    const basePrice = 10;
    const sizeFactor = 0.02;
    const weightFactor = 0.05;

    // Dimensional weight calculation
    const dimensionalWeight = (numericLength * numericWidth * numericHeight) / 5000; // Dimensional factor could vary
    const chargeableWeight = Math.max(numericWeight, dimensionalWeight);

    // Calculate dimensional sum and price based on weight
    const dimensionalSum = numericLength + numericWidth + numericHeight;
    let price = basePrice + (dimensionalSum * sizeFactor) + (chargeableWeight * weightFactor);

    // Urgency pricing
    if (deliveryType === "normal") {
        price += 5; // Normal delivery surcharge
    } else if (deliveryType === "express") {
        price += 5; // Express delivery surcharge
    }

    console.log(price)
    return price;
}
