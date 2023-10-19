"use client"
import React from 'react';
import ProfileInfo from './components/profileInfo';
import AddressInfo from './components/addressInfo';
import ProductInfo from './components/productInfo';
import TableProduct from './components/tableProduct';

export default function Account() {
    return (

        <div className="container mx-auto p-4">
            <div className="flex items-center space-x-2">
                <div className="avatar online placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16 ">
                        <span className="text-xl">JO</span>
                    </div>
                </div>
                <h1 className="text-2xl font-semibold mb-4 mt-5"> Username </h1>
            </div>

            <ProfileInfo />
            <AddressInfo />
            <h2 className="text-2xl font-semibold mb-2 mt-4 text-center"> Articles mis en ventes</h2>
            <TableProduct />

        </div>
    );
}