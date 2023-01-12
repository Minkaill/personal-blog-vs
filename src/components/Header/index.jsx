import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthMe, logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(state => state.auth.data)
  const isLoading = useSelector(state => state.auth.status)
  // console.log(`User ${userId._id}`)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  const onClickLogout = () => {
    if (window.confirm("Вы точно хотите выйти из аккаунта?")) {
      dispatch(logout());
    }
  };

  if(isLoading  === 'loading') {
    return <div>Loading...</div>
  }

  console.log(userId._id)

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>PERSONAL BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>

                <Link to={`/personalcabinet/${userId._id}`}>
                  <Button variant="contained">Личный кабинет</Button>
                </Link>

                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
