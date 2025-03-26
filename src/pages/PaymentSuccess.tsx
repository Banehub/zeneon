import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Date.now()}`;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckCircleOutline
          sx={{
            fontSize: 64,
            color: 'success.main',
            mb: 2,
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Order Number: {orderNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          You will receive an email confirmation shortly.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/orders')}
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess; 