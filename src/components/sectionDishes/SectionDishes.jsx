import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "../assets/eyeshadow.jpg";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard/Makeup";
import { useFetchDishes } from "../../hooks/useFetchDishes";


const Products = () => {
  // const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { products, lipstick, nailpolish } = useFetchDishes();

  console.log(products);

  const [filtered, setFiltered] = useState([...nailpolish, ...lipstick]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = {
    All: products,
    lipstick: lipstick,
    nailpolish: nailpolish,
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setFiltered(filters[filter]);
  };

  const ProductsArray = filtered?.length > 0 ? filtered : products;

  console.log(ProductsArray);

  return (
    <>
      <PageHeader headerImg={headerImg} title="Products" />
      <div>
        <Button buttonText="All" onClick={() => handleFilterChange("All")} />
        <Button
          buttonText="lipstick"
          onClick={() => handleFilterChange("lipstick")}
        />
        <Button
          buttonText="nail polish"
          onClick={() => handleFilterChange("nailpolish")}
        />
      </div>
      {ProductsArray.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default Products;
