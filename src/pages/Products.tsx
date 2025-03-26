import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CardActionArea,
  SelectChangeEvent,
  Button,
  Rating,
  Paper,
} from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Product } from '../features/products/productsSlice';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );

  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilterCategory(category);
    }
  }, [searchParams]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;
    setFilterCategory(newCategory);
    if (newCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));
  };

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesCategory =
        filterCategory === 'all' ||
        product.category === filterCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, md: 4 },
              fontWeight: 700,
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            {filterCategory === 'all' ? 'All Products' : filterCategory}
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.default',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filterCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                    sx={{
                      bgcolor: 'background.default',
                    }}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                    sx={{
                      bgcolor: 'background.default',
                    }}
                  >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {filteredAndSortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    '& .product-image': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/products/${product.id}`)}
                  sx={{ flexGrow: 1 }}
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
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={product.rating} precision={0.1} readOnly size="small" />
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
                      variant="body2"
                      sx={{
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        color: 'text.secondary',
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 'auto',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 700,
                        color: 'primary.main',
                      }}
                    >
                      R {product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleAddToCart(product, e)}
                    sx={{
                      py: 1.5,
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredAndSortedProducts.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 6, md: 8 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.secondary',
              }}
            >
              No products found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Products; 