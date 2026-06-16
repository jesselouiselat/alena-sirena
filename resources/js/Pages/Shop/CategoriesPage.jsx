import ProductsGrid from "@/Components/ProductsGrid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Layout from "@/Layouts/Layout";

export default function CategoriesPage({ products, categories, currentCategory}) {
    return (
        <>
            <AuthenticatedLayout categories={categories}>
                <ProductsGrid
                    products={products}
                    currentCategory={currentCategory}
                    categories={categories}                
                ></ProductsGrid>
                
        </AuthenticatedLayout>
        </>
    )
    
}