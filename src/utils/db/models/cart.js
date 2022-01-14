import sequelize from "../index.js";

import s from "sequelize";

const { DataTypes } = s;

const Cart = sequelize.define("cart", {
    productId: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

export default Cart;