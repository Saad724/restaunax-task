import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { authApi } from "../../services/api";
import { login } from "../../store/slice/AuthSlice";
import AppCard from "../../components/AppCard/AppCard";

const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone is required"),
});

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = async (
    values: RegisterFormValues,
    { setStatus }: { setStatus: (status: string) => void },
  ) => {
    try {
      const data = await authApi.register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: `+${values.phone}`,
      });
      dispatch(
        login({
          data: {
            email: data.user.email,
            name: data.user.name ?? "",
            phone: data.user.phone,
            role: data.user.role as "admin" | "user",
          },
          token: data.token,
        }),
      );
      navigate("/");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ py: 4 }}>
        <AppCard>
          <Stack sx={{ marginBlock: "20px" }} gap={2}>
            <Typography variant="h5">
              {import.meta.env.VITE_APP_NAME}
            </Typography>
            <Box>
              <Typography variant="h6" component="h1" color={"primary"}>
                Create an Account
              </Typography>
              <Typography color={"text.disabled"} variant="subtitle2">
                Sign up to get started.
              </Typography>
            </Box>
          </Stack>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <Stack spacing={1}>
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.name && !!formik.touched.name}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.email && !!formik.touched.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      !!formik.errors.password && !!formik.touched.password
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Input
                    type="phone"
                    name="phone"
                    setPhone={(phone: any) =>
                      formik.setFieldValue("phone", phone)
                    }
                    label={"Phone"}
                  />
                </Stack>
                <PrimaryButton
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{ marginBlock: "20px", width: "100%" }}
                >
                  {formik.isSubmitting ? "Creating account..." : "Register"}
                </PrimaryButton>
                <Typography variant="body2" align="center">
                  Already have an account?{" "}
                  <Link to="/" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                    Login
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </AppCard>
      </Box>
    </Container>
  );
};

export default Register;
