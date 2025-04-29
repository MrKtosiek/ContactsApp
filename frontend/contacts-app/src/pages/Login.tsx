import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import styles from "../styles/Login.module.scss";
import { LoginDto } from "../dtos/LoginDto";
import { MAIN_PAGE_ROUTE } from "../Constants";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Login: React.FC = () => {
  const USERNAME_INPUT = "username";
  const PASSWORD_INPUT = "password";

  const navigate = useNavigate();

  const schema = yup.object().shape({
    [USERNAME_INPUT]: yup.string().required("Username is required"),
    [PASSWORD_INPUT]: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      await UserService.loginUser(data);
      navigate(MAIN_PAGE_ROUTE);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Login</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={USERNAME_INPUT}>Username</label>
          <input id={USERNAME_INPUT} {...register(USERNAME_INPUT)} />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}

          <label htmlFor={PASSWORD_INPUT}>Password</label>
          <input type="password" id={PASSWORD_INPUT} {...register(PASSWORD_INPUT)} />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
