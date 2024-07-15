// components/admin-panel/Loader.js
import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="loader"></div>  {/* Assuming you have some CSS for the loader */}
        </div>
    );
};

export default Loader;
