import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/products.interface';

const Product = () => {
  const [data] = useLoaderData() as Product[];
  return <div>Product-{data.price}</div>;
};

export default Product;
