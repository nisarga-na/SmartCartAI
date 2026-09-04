class Product {
    constructor({
        id,
        name,
        brand,
        quantity,
        unit,
        price,
        platform,
        image
    }) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.quantity = quantity;
        this.unit = unit;
        this.price = price;
        this.platform = platform;
        this.image = image;
    }
}

module.exports = Product;