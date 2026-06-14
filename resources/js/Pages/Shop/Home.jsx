import ProductsGrid from "@/Components/ProductsGrid";
import Header from "@/Components/Header";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import Banner from "@/Components/Banner";

export default function Home({ categories, products }) {
    return (
        <>
            <Layout categories={categories}>

                <Head title="Home"></Head>
                <Banner products={products}></Banner>
                <ProductsGrid products={products} />
   
            </Layout>

   
        </>
    );
}