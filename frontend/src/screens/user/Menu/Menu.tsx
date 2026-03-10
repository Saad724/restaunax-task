import { Box, Stack, Typography } from "@mui/material";
import { itemsMockData } from "../../../utils/mockData";
import AppCard from "../../../components/AppCard/AppCard";
import { OrderItem } from "../../../../../shared/types";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { ordersApi } from "../../../services/api";
import { useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";

const Menu = () => {
  const [isOrdering, setIsOrdering] = useState(false);
  const orderHandler = async (id: string) => {
    try {
      setIsOrdering(true);
      const items = itemsMockData?.filter((item: OrderItem) => item?.id === id);
      const orderType = "delivery";
      await ordersApi.createOrder(orderType, items);
      toast.success("Order created successfully!")
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setIsOrdering(false);
    }
  };
  return (
    <Stack>
      <Typography variant="h5" component="h1">
        Order
      </Typography>
      <Typography color={"text.disabled"} variant="subtitle2">
        Order your favorite food now
      </Typography>
      <Stack direction={"row"} gap={2} sx={{ marginBlock: "20px" }}>
        {itemsMockData?.map((item: OrderItem) => (
          <AppCard sx={{ flex: 1 }}>
            <Stack gap={2}>
              <img
                src={
                  item?.image ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXz9Pa5vsq2u8j29/jN0dno6u7V2N++ws3w8fTf4efi5OnFydPY2+HJztbR1txPmUB/AAAC0klEQVR4nO3b55aqMBiFYUoioXn/l3ukKSVBJGH4ctb7/JxRVrYbCDVJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArPLQ7g60YnSjwmoqc3eouarOwmsrOT026TXKu4NNyosCioloissSFndn6+VlNgwn6EY4LrKUsCnm7TCaNuiudFqoiIT9Spo9Ak+Hj77GWsKUMSasAi+2lJMwIeE5JPxLtoRGa8+xiU5YqX5urBuf4UlO+Eyn+br2OHaWm9DU2eeoK2tOL1Vuwucs4Is+u1SxCctlwLQ4O0SpCfN6fXpw9thZakK9qjDN1MmlSk24Xkm/jdG9sxWaMG82CXc3ROXe2UpN+PgpYbffbRwtCk3421qqug+7WpSa0Pywp5lmTnuLUhNaZgvHt4yafgx7i1ITbq4sOoeoZm3bWhSbcDHyF8d0YNRiVba0KDdhMj/yTl2Twep3sLQoOOGrnmn4hePEf9mg/acQnDDJK1V013Trh3HMdesGbS1KTpj0FzG0cQ3O0qClReEJd9ka3LYYb0LzdARcRYw3oavB9YoabUJ3g6sWY0241+CyxUgSmtWFqP0GFy3GkVCnhZ7vPdqvAT8txpAw10WazYf4vcFZizEk1P3fPy0eabD7xnC+JT9h12D/j3o8djvWYH83ufu4/IT6PeKhxYMNdqdSUSScGny3eLTBaBLqxaAL/W0ejC3hvMEh4uF8kSTU+xmiT7hp8L9L6NVgBAk9G4wgoWeD4hN6Nyg+oXeD0hPmxw9dYk24vX9IQhLem21AQhKS8H6hE8q+TtPdVvM1hJKaMBwS/iUSnpILSji+FaTCvgk83oer707XmR70uuTdNSXh3bX384hXvH8Yeus+x2ye1gtGxjukSVJdllBGhUn3QKL/wdpWJmQd7em2CLoV9ltiq0XsZia6fITVCCoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMU/B0kslFd7c1EAAAAASUVORK5CYII="
                }
                height={200}
                style={{ borderRadius: "10px", objectFit: "cover" }}
              />
              <Box>
                <Typography variant="h6">{item?.name}</Typography>
                <Typography variant="subtitle2">
                  Price: ${item?.price}
                </Typography>
              </Box>
              <PrimaryButton
                variant="outlined"
                sx={{ width: "100%" }}
                onClick={() => orderHandler(item?.id)}
                disabled={isOrdering}
              >
                {isOrdering ? <Loader /> : "Order"}
              </PrimaryButton>
            </Stack>
          </AppCard>
        ))}
      </Stack>
    </Stack>
  );
};

export default Menu;
