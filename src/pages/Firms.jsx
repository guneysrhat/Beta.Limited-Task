// Library
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

// Components
import FirmCard from "../components/FirmCard";

// Hooks
import useProductCalls from "../hooks/useProductCalls";

// Styles
import { flexCenter } from "../styles/globalStyle";

const Firms = () => {
  const { getProducts, getCart } = useProductCalls();
  const { products, search, isSearch } = useSelector((state) => state.product);

  useEffect(() => {
    getProducts();
    getCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {isSearch
        ? search?.length > 0 && (
            <Grid container sx={flexCenter} mt={3}>
              {search?.map((product) => (
                <Grid item key={product.id}>
                  <FirmCard product={product} />
                </Grid>
              ))}
            </Grid>
          )
        : products?.length > 0 && (
            <Grid container sx={flexCenter} mt={3}>
              {products?.map((product) => (
                <Grid item key={product.id}>
                  <FirmCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
    </Box>
  );
};

export default Firms;
