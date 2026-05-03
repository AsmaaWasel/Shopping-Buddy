// src/components/admin/CartsTable.jsx
import React from "react";
// Component للـ Table Header لتقليل التكرار
const Th = ({ children, className = "" }) => (
    <th
        className={`px-4 py-2 text-left text-gray-600 uppercase text-sm tracking-wider ${className}`}
    >
        {children}
    </th>
);

// Component للـ Table Cell لتقليل التكرار
const Td = ({ children, className = "" }) => (
    <td className={`px-4 py-2 border-t ${className}`}>{children}</td>
);

const CartsTable = ({ carts, getTotalItems, onViewDetails }) => {
    return (
        <div className="overflow-x-auto p-8">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <Th>Cart ID</Th>
                        <Th>User ID</Th>
                        <Th>Number of Products</Th>
                        <Th className="text-center">Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {carts.length === 0 ? (
                        <tr>
                            <Td colSpan="4" className="text-center text-gray-500 py-4">
                                No carts found.
                            </Td>
                        </tr>
                    ) : (
                        carts.map((cart) => (
                            <tr
                                key={cart.id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <Td>{cart.id}</Td>
                                <Td>{cart.userId}</Td>
                                <Td>{getTotalItems(cart.products)}</Td>
                                <Td className="flex justify-center">
                                    <button
                                        onClick={() => onViewDetails && onViewDetails(cart)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                                    >
                                        View Details
                                    </button>

                                </Td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CartsTable;
