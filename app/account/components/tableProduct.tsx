// ProductsTable.tsx
import React from 'react';
import ProductInfo from './productInfo';


const productsData = [
    {
        title: "Jeux Rocket League",
        description: "Je vends ce jeu car je n'y joue plus.",
        productCondition: "MINT",
        platform: "XBOX",
    },
    // Ajoutez d'autres produits ici
];

export default function tableProduct() {
    return (
        <div className="overflow-x-auto">
            {productsData.map((product, index) => (
                <ProductInfo key={index} product={product} />
            ))}
        </div>
    )
}
