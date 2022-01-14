import sequelize from "../index.js";

import s from "sequelize";

const { DataTypes } = s;

const ProductCategory = sequelize.define("productCategory", {
    favourited: {
        type: DataTypes.BOOLEAN,
    },
},
    {
        timestamps: false,
    }
);

export default ProductCategory;