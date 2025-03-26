import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

// Mock clothing data
const clothingProducts = [
  {
    id: 1,
    name: 'Cotton T-Shirt',
    price: 24.99,
    image: 'https://source.unsplash.com/400x300/?tshirt',
    description: 'Comfortable cotton t-shirt in various colors.',
  },
  {
    id: 2,
    name: 'Denim Jeans',
    price: 49.99,
    image: 'https://source.unsplash.com/400x300/?jeans',
    description: 'Classic denim jeans with perfect fit.',
  },
  {
    id: 3,
    name: 'Hooded Sweatshirt',
    price: 39.99,
    image: 'https://source.unsplash.com/400x300/?hoodie',
    description: 'Warm and cozy hooded sweatshirt.',
  },
  {
    id: 4,
    name: 'Summer Dress',
    price: 59.99,
    image: 'https://source.unsplash.com/400x300/?dress',
    description: 'Light and stylish summer dress.',
  },
];

export default function Clothing() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Clothing
        </Typography>
        
        <Grid container spacing={3}>
          {clothingProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // Add to cart functionality will be implemented later
                      alert('Added to cart!');
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 