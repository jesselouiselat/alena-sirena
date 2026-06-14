import ProductsGrid from "@/Components/ProductsGrid";
import Header from "@/Components/Header";

export default function Layout({ categories, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header categories={categories} />

            <main className="grow">
                {children}
            </main>
            
        </div>
    );
}