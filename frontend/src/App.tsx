import { Container, Typography, Box } from '@mui/material';

function App() {
  // TODO: Implement your order management dashboard here
  // 1. Fetch orders from the API using the service in ./services/api.ts
  // 2. Display orders using Material-UI components
  // 3. Add functionality to filter orders by status
  // 4. Add functionality to update order status
  // 5. Handle loading and error states

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Restaunax Order Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          TODO: Build your order management interface here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hints:
        </Typography>
        <ul>
          <li>Use the API service in ./services/api.ts to fetch orders</li>
          <li>Display orders in a Card or Table layout</li>
          <li>Show customer info (name, email, phone, reward points) for each order</li>
          <li>Add status filter buttons or dropdown</li>
          <li>Make order status updatable with a Select or Buttons</li>
          <li>Show loading spinner while fetching data</li>
          <li>Handle errors gracefully with error messages</li>
        </ul>
      </Box>
    </Container>
  );
}

export default App;
