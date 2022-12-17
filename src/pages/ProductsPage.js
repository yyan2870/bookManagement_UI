import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import useAuth from '../utils/useAuth';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock

import PRODUCTS from '../_mock/products';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [bookList, setBookList] = useState([])
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const auth = useAuth();
  const authToken = sessionStorage.getItem('token');

  useEffect(() => {
    fetch("http://localhost:8080/book?page=0&size=12", {
      method : "GET",
      headers: {
       "Contetnt-Type" : "application/json",
       "Authorization": `Bearer ${authToken}`
     },
    })
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => setBookList(data))
  },[])

  return (
    <>
      <Helmet>
        <title> Dashboard: Books </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Books
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={bookList} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
