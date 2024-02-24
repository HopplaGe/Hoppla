import React from 'react';
import UrgentInfoForm from "@/components/administration/forms/UrgentInfoForm";

const AdminWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            <UrgentInfoForm/>
        </div>
    );
};

export default AdminWidgets;
