import Layout from "@/Layouts/Layout";
import ShowProduct from "@/Components/ShowProduct";

export default function ShowProductPage({ categories, product }) {
    return(
    <Layout categories={categories}>
        <ShowProduct product={product}></ShowProduct>
    </Layout>
    )
}