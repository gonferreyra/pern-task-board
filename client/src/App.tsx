import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRouter from './router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './config/queryClient';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} position="right" />
    </QueryClientProvider>
  );
}

export default App;
