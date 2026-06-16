import ProductsGrid from "@/Components/ProductsGrid";
import Header from "@/Components/Header";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Home({ categories, products }) {
    return (
        <>
            <AuthenticatedLayout categories={categories}>

                <Head title="Home"></Head>
                <Banner products={products}></Banner>
       <ProductsGrid
                    products={products}
                    categories={categories}                
                ></ProductsGrid>
   
            </AuthenticatedLayout>

   
        </>
    );
}