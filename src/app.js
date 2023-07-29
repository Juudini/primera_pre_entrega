import Express from "express";
import { PORT } from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api", cartsRoutes);
app.use("/api", productsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
