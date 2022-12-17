import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // eslint-disable-next-line
  const { id, title, authors, averageRating, isbn, languageCode, numPages, publicationDate, publisher, imageURL } = product;
  const imageURL1 = "http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg";
  // eslint-disable-next-line
  return (<Card>
      <Box sx={{ pt: '120%', position: 'relative' }}>
        {title && (
          <Label
            variant="filled"
            color={'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Label>
        )}
        <StyledProductImg alt={title} src={imageURL} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
            >
             Rating: {averageRating}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
