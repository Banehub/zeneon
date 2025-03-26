import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Breadcrumbs,
  Link,
  Rating,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Home
          </Link>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/products')}
            sx={{ cursor: 'pointer' }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </Typography>
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}
            >
              R {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetail; 