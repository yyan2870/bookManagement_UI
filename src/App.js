// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AuthProvider } from './AuthProvider';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      {/* <ScrollToTop />
      <StyledChart /> */}
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
