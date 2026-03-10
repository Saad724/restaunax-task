import { Box, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
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
    <AppCard sx={{ flex: 1, minWidth: 300, maxWidth: 300 }}>
      <Stack gap={2}>
        <img
          src={item?.image || DEFAULT_IMAGE}
          height={200}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          alt={item?.name}
        />
        <Box>
          <Typography variant="h6">{item?.name}</Typography>
          <Typography variant="subtitle2">
            Price: ${lineTotal.toFixed(2)}{" "}
            {quantity > 1 && `(${item?.price} × ${quantity})`}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">Quantity</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              size="small"
              onClick={handleDecrease}
              disabled={quantity <= MIN_QUANTITY}
              aria-label="Decrease quantity"
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              component="span"
              sx={{ minWidth: 24, textAlign: "center" }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
        <PrimaryButton
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={handleAddToCart}
        >
          Add to cart
        </PrimaryButton>
      </Stack>
    </AppCard>
  );
};

const Menu = () => {
  const navigate = useNavigate()
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
          onClick={() => navigate('/cart')}
          aria-label="View cart items"
          color="primary"
        >
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
