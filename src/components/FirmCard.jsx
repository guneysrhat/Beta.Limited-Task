// Library
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useProductCalls from "../hooks/useProductCalls";
import { Box, Rating, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

// Static
import Image from "../assets/image.json";
// Assets
// Component

export default function FirmCard({ product }) {
  const { postProduct } = useProductCalls();
  const [quantity, setQuantity] = useState(3);
  const [isIconsVisible, setIconsVisible] = useState(false);

  const handleSubmit = () => {
    if (product.id) {
      postProduct(product.id);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "430px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        position: "relative",
      }}
      onMouseOver={() => setIconsVisible(true)}
      onMouseOut={() => setIconsVisible(false)}
    >
      <Box>
        <CardMedia
          image={Image[product.id - 1].image}
          sx={{ p: 1, objectFit: "contain", height: "250px" }}
          component="img"
          alt="firm-img"
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 170,
            left: 75,
            width: 150,
            height: 25,
            backgroundColor: "grey",
            opacity: 0.7,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: "10px",
            visibility: isIconsVisible ? "visible" : "hidden",
          }}
        >
          <VisibilityIcon sx={{ color: "white", fontSize: 20 }} />
          <FavoriteIcon sx={{ color: "white", fontSize: 20 }} />

          <ShoppingCartIcon
            sx={{ color: "white", fontSize: 20 }}
            onClick={handleSubmit}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 15,
          width: 50,
          height: 20,
          backgroundColor: "#ec0020",
          opacity: 0.7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="caption" sx={{ fontSize: 10 }} color="white">
          {product.discount}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ml: 2,
          mt: 2,
          alignItems: "center",
        }}
      >
        <Box>
          <CardContent>
            <Typography variant="body3" color="text.secondary">
              {product.name}
            </Typography>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              ml: 2,
              mb: 2,
              alignItems: "center",
            }}
          >
            <Rating name="read-only" value={product.rating} readOnly />
            <Typography variant="body3" color="text.secondary" sx={{ ml: 2 }}>
              ({product.rating})
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              ml: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ color: "#ec0020", fontSize: 18 }}>
              ${product.price}
              <Typography
                variant="body3"
                color="text.secondary"
                sx={{
                  ml: 1,
                  fontSize: 14,
                  textDecoration: "line-through",
                }}
              >
                ${product.originalPrice}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            mr: 2,
          }}
        >

          {quantity > 0 ? (
            <>
              <IconButton
                onClick={handleDecrease}
                sx={{
                  color: quantity === 1 ? "grey" : "red",
                  border: "1px solid red",
                  padding: "4px",
                  borderRadius: "5px",
                  marginBottom: "8px",
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body3"
                color="text.secondary"
                sx={{ fontSize: 18 }}
              >
                {quantity}
              </Typography>
            </>
          ) : (
            <div style={{ width: 32, height: 61, marginBottom: 8 }} /> 
          )}
          <IconButton
            onClick={handleIncrease}
            sx={{
              color: "red",
              border: "1px solid red",
              padding: "4px",
              borderRadius: "5px",
              marginTop: "8px",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
