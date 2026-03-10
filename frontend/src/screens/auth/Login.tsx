import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { authApi } from "../../services/api";
import { login } from "../../store/slice/AuthSlice";
import AppCard from "../../components/AppCard/AppCard";
import Loader from "../../components/Loader/Loader";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: LoginFormValues,
    { setStatus }: { setStatus: (status: string) => void },
  ) => {
    try {
      const data = await authApi.login(values.email, values.password);
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
      setStatus(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ py: 4 }}>
        <AppCard>
          <Stack sx={{ marginBlock: '20px'}}>
            <Typography variant="h6" component="h1">
              Welcome Back
            </Typography>
            <Typography color={'text.disabled'} variant="subtitle2">Sign in to continue to your account.</Typography>
          </Stack>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={1}>
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
                </Stack>
                <PrimaryButton
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{ marginBlock: "20px", width: "100%" }}
                >
                  {formik.isSubmitting ? <Loader /> : "Login"}
                </PrimaryButton>
                <Typography variant="body2" align="center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Register</Link>
                </Typography>
              </form>
            )}
          </Formik>
        </AppCard>
      </Box>
    </Container>
  );
};

export default Login;
