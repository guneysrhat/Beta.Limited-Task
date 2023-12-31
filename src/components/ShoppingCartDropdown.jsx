// Library
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState, useRef } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";

// Static
import Image from "../assets/image.json";

const ShoppingCartDropdown = () => {
  const { "view-cart": viewCart } = useSelector((state) => state.product);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const cartIconRef = useRef(null);
  const isCartEmpty = viewCart === "Cart is empty.";
  const handleCartIconClick = (event) => {
    setDropdownOpen(!isDropdownOpen);
  };

  const calculateTotalPrice = () => {
    return viewCart?.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0
    ).toFixed(2);
  };

  const totalItemsInCart = isCartEmpty
    ? 0
    : viewCart?.reduce((total, item) => total + item?.quantity, 0);

  return (
    <Box>
      <Badge
        badgeContent={totalItemsInCart}
        color="error"
        sx={{
          bottom: 8,
          right: 8,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
          bottom: 6,
          right: 12,
        }}
      >
        <IconButton
          sx={{ color: "black", fontSize: 20, top: 8, left: 6 }}
          onClick={handleCartIconClick}
          ref={cartIconRef}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Badge>

      <Popover
        open={isDropdownOpen}
        anchorEl={cartIconRef.current}
        onClose={() => setDropdownOpen(false)}
        sx={{
          mt: 6,
        }}
      >
        {isCartEmpty ? (
          <Typography sx={{ p: 2 }}>
            There are no products in your cart.
          </Typography>
        ) : (
          <List>
            {viewCart?.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={Image[item.productId - 1].image}
                    alt={item.name}
                    sx={{ marginRight: 1 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{item?.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${item?.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item?.quantity}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}

            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #ccc",
                marginTop: 2,
                paddingTop: 1,
              }}
            >
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">
                {calculateTotalPrice()} $
              </Typography>
            </ListItem>
          </List>
        )}
      </Popover>
    </Box>
  );
};

export default ShoppingCartDropdown;
