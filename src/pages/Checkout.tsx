import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  Payment as PaymentIcon, 
  CreditCard, 
  AccountBalance, 
  SwapHoriz 
} from '@mui/icons-material';

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Shipping', 'Payment', 'Review'];

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate shipping info
      const requiredFields = ['firstName', 'lastName', 'address1', 'city', 'province', 'postalCode', 'phone', 'email'];
      const isValid = requiredFields.every(field => shippingData[field as keyof typeof shippingData]);
      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }
    }

    if (activeStep === 1) {
      // Validate payment method selection
      if (!selectedPaymentMethod) {
        setPaymentError('Please select a payment method');
        return;
      }
      setPaymentError('');

      // Handle different payment methods
      switch (selectedPaymentMethod) {
        case 'payfast':
          // Redirect to PayFast
          navigate('/payment', { 
            state: { 
              method: 'payfast',
              orderData: {
                amount: calculateTotal(),
                items: cart.items,
                shipping: shippingData
              }
            }
          });
          break;
        case 'card':
          // Proceed to card payment form
          navigate('/payment', { 
            state: { 
              method: 'card',
              orderData: {
                amount: calculateTotal(),
                items: cart.items,
                shipping: shippingData
              }
            }
          });
          break;
        case 'bank-transfer':
          // Show bank details
          navigate('/payment', { 
            state: { 
              method: 'bank-transfer',
              orderData: {
                amount: calculateTotal(),
                items: cart.items,
                shipping: shippingData
              }
            }
          });
          break;
        case 'eft':
          // Redirect to EFT payment
          navigate('/payment', { 
            state: { 
              method: 'eft',
              orderData: {
                amount: calculateTotal(),
                items: cart.items,
                shipping: shippingData
              }
            }
          });
          break;
        default:
          setPaymentError('Invalid payment method');
          return;
      }
      return;
    }
    
    if (activeStep === steps.length - 1) {
      // Process the order
      navigate('/payment');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, sm: 4, md: 8 },
        px: { xs: 1, sm: 2, md: 3 }
      }}
    >
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 0, sm: 1 }
        }}
      >
        <Typography 
          component="h1" 
          variant={isMobile ? "h5" : "h4"} 
          align="center" 
          gutterBottom
        >
          Checkout
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 5 },
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }
          }}
          alternativeLabel={!isMobile}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {activeStep === 0 && (
              <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                  Shipping Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address Line 1"
                      name="address1"
                      value={shippingData.address1}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="address2"
                      value={shippingData.address2}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Province"
                      name="province"
                      value={shippingData.province}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Postal Code"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={shippingData.email}
                      onChange={handleInputChange}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                  Payment Method
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {paymentError && (
                      <Typography color="error" sx={{ mb: 2 }}>
                        {paymentError}
                      </Typography>
                    )}
                    <Paper sx={{ p: 3, mb: 2 }}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="payment-method"
                          name="payment-method"
                          value={selectedPaymentMethod}
                          onChange={(e) => {
                            setSelectedPaymentMethod(e.target.value);
                            setPaymentError('');
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Paper 
                                variant="outlined" 
                                sx={{ 
                                  p: 2, 
                                  mb: 1,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    bgcolor: 'action.hover'
                                  }
                                }}
                              >
                                <FormControlLabel
                                  value="payfast"
                                  control={<Radio />}
                                  label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <PaymentIcon sx={{ mr: 2, color: 'primary.main' }} />
                                      <Typography>PayFast</Typography>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            <Grid item xs={12}>
                              <Paper 
                                variant="outlined" 
                                sx={{ 
                                  p: 2, 
                                  mb: 1,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    bgcolor: 'action.hover'
                                  }
                                }}
                              >
                                <FormControlLabel
                                  value="card"
                                  control={<Radio />}
                                  label={
                                    <Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CreditCard sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography>Credit/Debit Card</Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            <Grid item xs={12}>
                              <Paper 
                                variant="outlined" 
                                sx={{ 
                                  p: 2, 
                                  mb: 1,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    bgcolor: 'action.hover'
                                  }
                                }}
                              >
                                <FormControlLabel
                                  value="bank-transfer"
                                  control={<Radio />}
                                  label={
                                    <Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography>Bank Transfer</Typography>
                                      </Box>
                                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                        Direct bank transfer to our account
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>

                            <Grid item xs={12}>
                              <Paper 
                                variant="outlined" 
                                sx={{ 
                                  p: 2,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    bgcolor: 'action.hover'
                                  }
                                }}
                              >
                                <FormControlLabel
                                  value="eft"
                                  control={<Radio />}
                                  label={
                                    <Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SwapHoriz sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography>EFT (Electronic Funds Transfer)</Typography>
                                      </Box>
                                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                        Secure electronic funds transfer
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </Paper>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Paper>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Order Summary
                      </Typography>
                      <List sx={{ width: '100%' }}>
                        {cart.items.map((item) => (
                          <ListItem 
                            key={item.id}
                            sx={{
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              py: { xs: 2, sm: 1 }
                            }}
                          >
                            <ListItemText
                              primary={item.name}
                              secondary={`Quantity: ${item.quantity}`}
                              sx={{ mb: { xs: 1, sm: 0 } }}
                            />
                            <Typography variant="body2">
                              R {(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                  Order Summary
                </Typography>
                <List>
                  <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemText 
                      primary="Shipping Address" 
                      secondary={
                        <Box sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                          {`${shippingData.firstName} ${shippingData.lastName}
                          ${shippingData.address1}
                          ${shippingData.address2 ? shippingData.address2 + '\n' : ''}
                          ${shippingData.city}, ${shippingData.province}
                          ${shippingData.postalCode}`}
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.paper',
                position: { xs: 'static', md: 'sticky' },
                top: { md: 24 }
              }}
            >
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                Order Summary
              </Typography>
              <List sx={{ mb: 2 }}>
                {cart.items.map((item) => (
                  <ListItem 
                    key={item.id}
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      py: { xs: 2, sm: 1 }
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity}`}
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Typography variant="body2">
                      R {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Grid container justifyContent="space-between">
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1">
                    R {calculateTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Box>
            </Paper>

            <Box 
              sx={{ 
                mt: 3,
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between'
              }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ 
                  minHeight: { xs: 48, sm: 'auto' },
                  order: { xs: 2, sm: 1 }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  minHeight: { xs: 48, sm: 'auto' },
                  order: { xs: 1, sm: 2 }
                }}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Checkout; 