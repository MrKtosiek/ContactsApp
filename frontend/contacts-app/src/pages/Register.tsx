import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import styles from "../styles/Register.module.scss";
import { LOGIN_ROUTE } from "../Constants";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { RegisterDto } from "../dtos/RegisterDto";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Register: React.FC = () => {
  const USERNAME_INPUT = "username";
  const PASSWORD_INPUT = "password";

  const navigate = useNavigate();

  const schema = yup.object().shape({
    [USERNAME_INPUT]: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    [PASSWORD_INPUT]: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterDto) => {
    try {
      await UserService.registerUser(data);
      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Register</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={USERNAME_INPUT}>Username</label>
          <input id={USERNAME_INPUT} {...register(USERNAME_INPUT)} />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}

          <label htmlFor={PASSWORD_INPUT}>Password</label>
          <input type="password" id={PASSWORD_INPUT} {...register(PASSWORD_INPUT)} />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
