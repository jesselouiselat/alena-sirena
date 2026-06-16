import Layout from "@/Layouts/Layout";
import ShowProduct from "@/Components/ShowProduct";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ShowProductPage({ categories, product }) {
    return(
        <AuthenticatedLayout categories={categories}>
            <Head title={product.name}></Head>
        <ShowProduct product={product}></ShowProduct>
    </AuthenticatedLayout>
    )
}