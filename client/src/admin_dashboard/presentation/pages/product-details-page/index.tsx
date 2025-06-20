import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";
import { getProductById } from "../../../../infra/http/api-calls/products/getProductById";
import styles from "./ProductDetailsPage.module.css";
import AdminBaseButton from "../../components/base/admin-base-button";
import AdminBaseModalWindow from "../../components/base/admin-base-modal-window";
import EditProductForm from "./components/editProductForm";

const ProductDetailsPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  async function getProductByIdFn() {
    if (id) {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getProductByIdFn();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!product) return <p className={styles.error}>Product not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.details}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div className={styles.info}>
          <p>
            <strong>ID:</strong> {product._id}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          {product.createdAt && (
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </p>
          )}
          {product.updatedAt && (
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(product.updatedAt).toLocaleString()}
            </p>
          )}
          <AdminBaseButton
            type={"button"}
            content={"EditProduct"}
            onClick={() => setIsModalVisible(true)}
          />

          <AdminBaseModalWindow
            title={`Edit Product ${product.title}`}
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <EditProductForm
              productId={product._id}
              defaultValue={product}
              setProductsData={setProduct}
              setIsModalVisible={setIsModalVisible}
            />
          </AdminBaseModalWindow>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
