const fs = require("fs");

class Product {
    constructor(title, description, price, thumbnail, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }

    /*todos los métodos que quieras agregarle*/
}

class ProductManager {
    static id = 0;

    dataInit = [
        {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25,
            id: 1,
        },
        {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123456",
            stock: 25,
            id: 2,
        },
        {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25,
            id: 3,
        },
        {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123456",
            stock: 25,
            id: 4,
        },
        {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25,
            id: 5,
        },
    ];

    constructor(path) {
        this.path = path;
    }

    async fileCreator() {
        if (!fs.existsSync(this.path)) {
            /*Si no existe el archivo te lo crea*/

            let emptyDataJSON = JSON.stringify(this.dataInit, null, 2);

            try {
                await fs.promises.writeFile(this.path, emptyDataJSON);
            } catch (error) {
                console.log({ error });
            }
        }
    }

    async readFileProducts() {
        const productos = await fs.promises.readFile(this.path, "utf-8");
        const data = await JSON.parse(productos);

        return { data };
    }
}

module.exports = {
    ProductManager,
    Product,
};

