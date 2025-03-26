import { useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../features/products/productsSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = [
    {
      title: 'Electronics',
      path: '/products?category=Electronics',
    },
    {
      title: 'Fashion',
      path: '/products?category=Fashion',
    },
    {
      title: 'Home & Living',
      path: '/products?category=Home & Living',
    },
    {
      title: 'Sports & Outdoors',
      path: '/products?category=Sports & Outdoors',
    },
    {
      title: 'Books & Stationery',
      path: '/products?category=Books & Stationery',
    },
    {
      title: 'Beauty & Personal Care',
      path: '/products?category=Beauty & Personal Care',
    },
    {
      title: 'Jewelry & Accessories',
      path: '/products?category=Jewelry & Accessories',
    },
    {
      title: 'Food & Beverages',
      path: '/products?category=Food & Beverages',
    },
    {
      title: 'Toys & Games',
      path: '/products?category=Toys & Games',
    },
    {
      title: 'Pet Supplies',
      path: '/products?category=Pet Supplies',
    },
  ];

  // Sort products by rating and get top 8
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(44,54,57,0.95) 0%, rgba(63,78,79,0.95) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: 'white',
            }}
          >
            Welcome to Our Store
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: 'sm',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              opacity: 0.9,
              color: 'white',
            }}
          >
            Discover amazing products at great prices
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              px: 6,
              py: 2,
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 600,
              color: '#ffffff !important',
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {categories.map((category) => (
            <Grid item key={category.title} xs={12} sm={6} md={4} lg={3}>
              <Card
                onClick={() => navigate(category.path)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    bgcolor: 'secondary.light',
                    '& .category-title': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  className="category-title"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {category.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          Top Rated Products
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    '& .product-image': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  className="product-image"
                  sx={{
                    transition: 'transform 0.3s ease',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} readOnly />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        ml: 1,
                        color: 'text.secondary',
                      }}
                    >
                      ({product.numReviews})
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{
                      color: 'primary.main',
                      fontWeight: 700,
                    }}
                  >
                    R {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 