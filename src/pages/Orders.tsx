import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock orders data (replace with actual data from your backend)
const ordersData = [
  {
    id: "ORD-2024-001",
    date: "2024-03-20",
    status: "processing",
    total: 749.97,
    items: 3
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-19",
    status: "delivered",
    total: 299.99,
    items: 1
  },
  {
    id: "ORD-2024-003",
    date: "2024-03-18",
    status: "shipped",
    total: 1249.98,
    items: 4
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom 
        sx={{ mb: 4 }}
      >
        My Orders
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <List>
          {ordersData.map((order, index) => (
            <React.Fragment key={order.id}>
              <ListItem
                sx={{
                  py: 3,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 2, sm: 0 }
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" component="div">
                    Order #{order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {order.date}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={order.status.toUpperCase()}
                      color={getStatusColor(order.status) as any}
                      size="small"
                    />
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'row', sm: 'column' }, 
                  alignItems: { xs: 'center', sm: 'flex-end' },
                  gap: 2,
                  width: { xs: '100%', sm: 'auto' }
                }}>
                  <Typography variant="subtitle1">
                    R {order.total.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items} items
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/order/${order.id}`)}
                    sx={{ minWidth: 120 }}
                  >
                    View Details
                  </Button>
                </Box>
              </ListItem>
              {index < ordersData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Orders; 