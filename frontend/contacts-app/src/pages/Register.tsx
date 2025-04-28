import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import styles from "../styles/Register.module.scss";
import { LOGIN_ROUTE } from "../Constants";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { RegisterDto } from "../dtos/RegisterDto";

export const Register: React.FC = () => {
  const USERNAME_INPUT = "username";
  const PASSWORD_INPUT = "password";

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterDto>();

  const onSubmit = async (data: RegisterDto) => {
    try {
      await UserService.registerUser(data);
      navigate(LOGIN_ROUTE);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Register</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={USERNAME_INPUT}>Username</label>
          <input id={USERNAME_INPUT} {...register(USERNAME_INPUT, { required: true })} />

          <label htmlFor={PASSWORD_INPUT}>Password</label>
          <input type="password" id={PASSWORD_INPUT} {...register(PASSWORD_INPUT, { required: true })} />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};
