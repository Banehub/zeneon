import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { RootState } from '../features/store';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        R {item.price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">
                        R {(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Grid container justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>R {calculateTotal().toFixed(2)}</Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography>Shipping</Typography>
                    <Typography>Free</Typography>
                  </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">R {calculateTotal().toFixed(2)}</Typography>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart; 