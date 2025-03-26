import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email',
      content: 'support@ecomstore.com',
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Address',
      content: '123 Commerce Street, Business City, ST 12345',
    },
  ];

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary">
          We'd Love to Hear From You
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Have questions about our products or services? We're here to help!
            </Typography>

            {contactInfo.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                  }}
                >
                  {info.icon}
                </Box>
                <Box>
                  <Typography variant="h6">{info.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message. We'll get back to you soon!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact; 