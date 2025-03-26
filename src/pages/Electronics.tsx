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

// Mock electronics data
const electronicsProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://source.unsplash.com/400x300/?headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://source.unsplash.com/400x300/?smartwatch',
    description: 'Feature-rich smartwatch with health tracking.',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://source.unsplash.com/400x300/?speaker',
    description: 'Portable bluetooth speaker with amazing sound quality.',
  },
  {
    id: 4,
    name: 'Laptop',
    price: 999.99,
    image: 'https://source.unsplash.com/400x300/?laptop',
    description: 'Powerful laptop for work and entertainment.',
  },
];

export default function Electronics() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Electronics
        </Typography>
        
        <Grid container spacing={3}>
          {electronicsProducts.map((product) => (
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