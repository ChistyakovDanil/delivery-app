import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/products.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import Loading from '../../components/Loading/Loading';

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для поискового запроса
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Состояние для отфильтрованных продуктов

  useEffect(() => {
    filterProducts(searchQuery);
  }, [searchQuery, products]);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  const filterProducts = (query: string) => {
    if (query.trim() === '') {
      // Если запрос пустой, показать все продукты
      setFilteredProducts(products);
    } else {
      // Иначе фильтровать продукты, у которых название начинается с запроса
      const filtered = products.filter((product) => product.title.toLowerCase().startsWith(query.toLowerCase()));
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Heading>Меню</Heading>
        <Search
          placeholder='Введіть страву чи склад'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {error && <>{error}</>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          {filteredProducts.map((el) => {
            return (
              <ProductCard
                key={el.id}
                id={el.id}
                img={el.img}
                price={el.price}
                rating={el.rating}
                title={el.title}
                description={el.description}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Menu;
