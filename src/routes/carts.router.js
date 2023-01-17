import { Router } from "express";
import cartManager from "../cart.manager.js";
import productManager from "../product.manager.js";

const router = Router();
const carritos = new cartManager("carts.json");
const productos = new productManager("products.json");
//CREAR NUEVO CARRITO

router.post("/", async (req, res) => {
    const { id } = await carritos.addCart();
    res.send({ status: "ok", message: "Carrito creado", idcarrito: id });
});

/*
    Elijo hacerme un endpoint para verificar que es lo que tengo hasta ahora
*/

router.get("/", async (req, res) => {
    const carritos_ = await carritos.getCarts();
    res.json({ carritos_ });
});

//TRAER PRODUCTOS DE UN CARRITO QUE SELECCIONAMOS CON PARAMS
router.get("/:cid", async (req, res) => {
    const cartId = Number(req.params.cid);

    const arrayCarritos = await carritos.getCarts();

    const carrito = arrayCarritos.find((cart) => cart.id === cartId);

    carrito
        ? res.send(carrito.products)
        : res
              .status(400)
              .send({ status: "error", error: "El carrito no existe" });
});

//AGREGAR PRODUCTO A CARRITO QUE ELIJAMOS

/*
    ACA TE CONVIENE DARLE EL ID DEL PRODUCTO ENVIANDOLO POR MEDIO DEL BODY EN LUGAR DE UN PARAMETRO
 
*/

router.post("/:cid/add", async (req, res) => {
    const product = req.body;

    /*
        Con esto ya podés trabajar con la cantidad 
        de elementos y con los productos que se vayan a 
        descontar y etc
    */

    const arrayCarritos = await carritos.getCarts();

    const arrayProductos = await productos.getProducts();

    let carritoIndex = await arrayCarritos.findIndex(
        (cart) => cart.id == req.params.cid
    );

    let productoIndex = await arrayProductos.findIndex(
        (p) => p.id === product.id
    );

    if (carritoIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "El carrito no existe",
        });

        return;
    }

    if (productoIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "El producto no existe",
        });

        return;
    }

    await carritos.addProductToCart(Number(req.params.cid), product.id);
    res.send({ status: "ok", message: "Producto agregado" });
});

/*

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const arrayCarritos = await carritos.getCarts();
    const arrayProductos = await productos.getProducts();
    let carritoIndex = arrayCarritos.findIndex((cart) => cart.id === cartId);
    let productoIndex = arrayProductos.findIndex((p) => p.id === productId);
    if (carritoIndex != -1) {
        if (productoIndex != -1) {
            await carritos.addProductToCart(cartId, productId);
            res.send({ status: "ok", message: "Producto agregado" });
        } else {
            res.status(400).send({
                status: "error",
                error: "El producto no existe",
            });
        }
    } else {
        res.status(400).send({
            status: "error",
            error: "El carrito no existe",
        });
    }
});

*/

export default router;
