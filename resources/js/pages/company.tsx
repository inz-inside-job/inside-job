import { Head } from '@inertiajs/react';

export default function CompanyPage({ company }: { company: App.Data.CompanyData }) {
    console.log(company);
    return (
        <>
            <Head title={company.name} />
        </>
    );
}
