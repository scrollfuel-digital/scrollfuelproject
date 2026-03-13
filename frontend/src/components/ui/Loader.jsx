import React from "react";
import { LoaderPinwheel } from 'lucide-react';
const Loader = () => {
    return (
        <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-primary border-t-primary rounded-full animate-spin ">  <LoaderPinwheel className="w-10 h-10 rounded-full bg-primary "/></div>
        </div>
    );
};

export default Loader;