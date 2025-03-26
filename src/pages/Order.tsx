import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  Inventory,
  CheckCircle,
} from '@mui/icons-material';

// Mock order data (replace with actual data from your backend)
const orderData = {
  orderId: "ORD-2024-001",
  status: "processing", // pending, processing, shipped, delivered
  date: "2024-03-20",
  items: [
    {
      id: 1,
      name: "Product 1",
      quantity: 2,
      price: 299.99,
    },
    {
      id: 2,
      name: "Product 2",
      quantity: 1,
      price: 149.99,
    }
  ],
  shipping: {
    name: "John Doe",
    address: "123 Main St",
    city: "Cape Town",
    province: "Western Cape",
    postalCode: "8001",
    phone: "0123456789"
  },
  payment: {
    method: "Credit Card",
    status: "Paid",
    total: 749.97
  }
};

const Order = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Order status steps
  const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf('Processing'); // Replace with actual status logic

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 } }}>
      {/* Order Header */}
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Order #{orderData.orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placed on {orderData.date}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
            <Chip
              label={orderData.status.toUpperCase()}
              color={getStatusColor(orderData.status) as any}
              sx={{ fontWeight: 'medium' }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Order Progress */}
      <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Status
        </Typography>
        <Stepper 
          activeStep={currentStep} 
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{ mt: 3 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        {/* Order Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <List>
              {orderData.items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity}`}
                    />
                    <Typography variant="body2">
                      R {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Typography variant="subtitle1">
                Total: R {orderData.payment.total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Shipping and Payment Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h6" gutterBottom>
              Shipping Details
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1">
                {orderData.shipping.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {orderData.shipping.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {orderData.shipping.city}, {orderData.shipping.province}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {orderData.shipping.postalCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {orderData.shipping.phone}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Box>
              <Typography variant="body2">
                Method: {orderData.payment.method}
              </Typography>
              <Typography variant="body2">
                Status: {orderData.payment.status}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Order; 