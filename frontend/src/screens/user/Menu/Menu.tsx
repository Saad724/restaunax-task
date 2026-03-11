import { Box, Stack, Typography, IconButton, Badge } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { itemsMockData } from "../../../utils/mockData";
import AppCard from "../../../components/AppCard/AppCard";
import { OrderItem } from "../../../../../shared/types";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { addToCart } from "../../../store/slice/CartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";

const MIN_QUANTITY = 1;
const DEFAULT_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXz9Pa5vsq2u8j29/jN0dno6u7V2N++ws3w8fTf4efi5OnFydPY2+HJztbR1txPmUB/AAAC0klEQVR4nO3b55aqMBiFYUoioXn/l3ukKSVBJGH4ctb7/JxRVrYbCDVJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArPLQ7g60YnSjwmoqc3eouarOwmsrOT026TXKu4NNyosCioloissSFndn6+VlNgwn6EY4LrKUsCnm7TCaNuiudFqoiIT9Spo9Ak+Hj77GWsKUMSasAi+2lJMwIeE5JPxLtoRGa8+xiU5YqX5urBuf4UlO+Eyn+br2OHaWm9DU2eeoK2tOL1Vuwucs4Is+u1SxCctlwLQ4O0SpCfN6fXpw9thZakK9qjDN1MmlSk24Xkm/jdG9sxWaMG82CXc3ROXe2UpN+PgpYbffbRwtCk3421qqug+7WpSa0Pywp5lmTnuLUhNaZgvHt4yafgx7i1ITbq4sOoeoZm3bWhSbcDHyF8d0YNRiVba0KDdhMj/yTl2Twep3sLQoOOGrnmn4hePEf9mg/acQnDDJK1V013Trh3HMdesGbS1KTpj0FzG0cQ3O0qClReEJd9ka3LYYb0LzdARcRYw3oavB9YoabUJ3g6sWY0241+CyxUgSmtWFqP0GFy3GkVCnhZ7vPdqvAT8txpAw10WazYf4vcFZizEk1P3fPy0eabD7xnC+JT9h12D/j3o8djvWYH83ufu4/IT6PeKhxYMNdqdSUSScGny3eLTBaBLqxaAL/W0ejC3hvMEh4uF8kSTU+xmiT7hp8L9L6NVgBAk9G4wgoWeD4hN6Nyg+oXeD0hPmxw9dYk24vX9IQhLem21AQhKS8H6hE8q+TtPdVvM1hJKaMBwS/iUSnpILSji+FaTCvgk83oer707XmR70uuTdNSXh3bX384hXvH8Yeus+x2ye1gtGxjukSVJdllBGhUn3QKL/wdpWJmQd7em2CLoV9ltiq0XsZia6fITVCCoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMU/B0kslFd7c1EAAAAASUVORK5CYII=";

interface MenuCardProps {
  item: OrderItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  const lineTotal = (item?.price ?? 0) * quantity;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(MIN_QUANTITY, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        quantity,
        price: item.price,
        image: item.image,
      }),
    );
    toast.success("Added to cart");
  };

  return (
    <AppCard
      sx={{
        flex: 1,
        minWidth: 300,
        maxWidth: 320,
        overflow: "hidden",
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
      }}
    >
      <Stack gap={2}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "action.hover",
          }}
        >
          <Box
            component="img"
            src={item?.image || DEFAULT_IMAGE}
            alt={item?.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <Stack gap={0.5}>
          <Typography variant="h6" sx={{ lineHeight: 1.25 }}>
            {item?.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            gap={2}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ${lineTotal.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {quantity > 1 ? `(${item?.price} × ${quantity})` : `Unit: $${item?.price}`}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            px: 1,
            py: 0.5,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Quantity
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton
              size="small"
              onClick={handleDecrease}
              disabled={quantity <= MIN_QUANTITY}
              aria-label="Decrease quantity"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
              component="span"
              sx={{ minWidth: 28, textAlign: "center", fontWeight: 600 }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <PrimaryButton
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: 2,
            py: 1.1,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={handleAddToCart}
        >
          Add to cart
        </PrimaryButton>
      </Stack>
    </AppCard>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  return (
    <Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h5" component="h1">
            Order
          </Typography>
          <Typography color={"text.disabled"} variant="subtitle2">
            Order your favorite food now
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => navigate("/cart")}
          aria-label="View cart items"
          color="primary"
          sx={{ position: "primary" }}
        >
          <Badge
            badgeContent={items?.length}
            color="primary"
            overlap="circular"
            sx={{ position: "absolute", top: -5, right: 0 }}
          />
          <FontAwesomeIcon icon={faCartFlatbed} />
        </IconButton>
      </Stack>
      <Stack
        direction={"row"}
        gap={2}
        sx={{ marginBlock: "20px" }}
        flexWrap="wrap"
      >
        {itemsMockData?.map((item: OrderItem) => (
          <MenuCard key={item?.id} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Menu;
