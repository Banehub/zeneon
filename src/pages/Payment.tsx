import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

interface PaymentState {
  method: string;
  orderData: {
    amount: number;
    items: any[];
    shipping: any;
  };
}

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const paymentState = location.state as PaymentState;

  useEffect(() => {
    if (!paymentState?.method) {
      navigate('/checkout');
    }
  }, [paymentState, navigate]);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayFastPayment = async () => {
    setLoading(true);
    try {
      // Here you would integrate with PayFast API
      // This is a placeholder for the actual integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch(clearCart());
      navigate('/payment-success');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    setLoading(true);
    try {
      // Here you would integrate with your card payment processor
      // This is a placeholder for the actual integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch(clearCart());
      navigate('/payment-success');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethod = () => {
    switch (paymentState?.method) {
      case 'payfast':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              PayFast Payment
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You will be redirected to PayFast to complete your payment.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayFastPayment}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Pay with PayFast'}
            </Button>
          </Box>
        );

      case 'card':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Card Payment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Cardholder Name"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCardPayment}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay Now'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'bank-transfer':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Bank Transfer Details
            </Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Please use the following bank details to make your payment:
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant="body2">Bank: Standard Bank</Typography>
                <Typography variant="body2">Account Name: EcomStore</Typography>
                <Typography variant="body2">Account Number: 000123456789</Typography>
                <Typography variant="body2">Branch Code: 051001</Typography>
                <Typography variant="body2">Reference: {`ORDER-${Date.now()}`}</Typography>
              </Box>
              <Alert severity="info">
                Please use your order number as reference when making the payment.
              </Alert>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/payment-success')}
            >
              I've Made the Payment
            </Button>
          </Box>
        );

      case 'eft':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              EFT Payment
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You will be redirected to your bank's secure EFT payment page.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                // Here you would integrate with the bank's EFT system
                alert('Redirecting to bank EFT system...');
              }}
            >
              Proceed to EFT Payment
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Complete Your Payment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Amount to pay: R {paymentState?.orderData.amount.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />
        
        {renderPaymentMethod()}
      </Paper>
    </Container>
  );
};

export default Payment; 