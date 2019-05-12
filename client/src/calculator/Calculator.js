class Calculator {

    calculateParts(width, height) {
        var louverCount = Math.ceil(height / 20);
        var widthMultiplier = Math.ceil(width / 60);

        var parts = {
            "louvers": (widthMultiplier * louverCount),
            "louverPins": (widthMultiplier * (louverCount - 1)),
            "hinges": (widthMultiplier * (2 * (louverCount - 1))),
            "tiltBar": widthMultiplier,
            "glue": widthMultiplier,
        };

        return(parts);
    }

    calculatePrice(parts) {
        var price =
            parts.louvers * 20 +
            parts.louverPins * 10 +
            parts.hinges * 3 +
            parts.tiltBar * 15 +
            parts.glue * 20;

        return(price);
    }

}

export default new Calculator();