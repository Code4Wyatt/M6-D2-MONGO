import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";
import Category from "./category.js";
import ProductCategory from "./productCategory.js";
import Cart from "./cart.js";

// One to many product to reviews, one product, many reviews
Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

// One to many product to productCategories, one product, many productCategories
Product.hasMany(ProductCategory, { onDelete: "CASCADE" });
ProductCategory.belongsTo(Product, { onDelete: "CASCADE" });

// One to many between users and product
User.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(User, { onDelete: "CASCADE" });

// One to many between cart and users
Cart.hasMany(User, { onDelete: "CASCADE" });
User.belongsTo(Cart, { onDelete: "CASCADE" });

// One to many user to reviews, one user, many reviews
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

// Many to many products to categories, products can have many categories and vice versa
Product.belongsToMany(Category, { 
    through: ProductCategory,
    onDelete: "CASCADE",
});
Category.belongsToMany(Product, {
    through: ProductCategory,
    onDelete: "CASCADE",
});

export { Category, Product, Review, User, ProductCategory, Cart };