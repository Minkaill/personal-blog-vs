import { Button, Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth";
import styles from "./PersonalCabinet.module.scss";
import axios from "../../axios";
import { MdOutlineEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";

const PersonalCabinet = () => {
  const { id } = useParams();
  console.log(`userId + ${id}`);
  const dispatch = useDispatch();
  const fileRef = React.useRef(null);
  const [editProfile, setEditProfile] = React.useState(true);
  const isLoading = useSelector((state) => state.auth.status);
  const userInfo = useSelector((state) => state.auth.data);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  console.log(`Статус рендера: ${isLoading}`);

  if (isLoading === "loading") {
    return <div>Loading...</div>;
  }

  const handleEdit = async () => {
    try {
      const details = {
        fullName,
        email,
        password,
      };

      await axios.patch(`/auth/edit/${id}`, details);
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Личный кабинет</h1>
      <div className={styles.personal__cabinet}>
        <div className={styles.photo_block}>
          <img src={userInfo.avatarUrl} alt="" />
          <Button
            onClick={() => fileRef.current.click()}
            variant="outlined"
            size="large"
          >
            Изменить фотографию
          </Button>
          <input type="file" hidden ref={fileRef} />
          <h3>Name: {userInfo.fullName}</h3>
          <h1>Дата создания аккаунта: {userInfo.createdAt}</h1>
        </div>

        <div className={styles.edit__block}>
          <MdOutlineEditNote
            onClick={() => setEditProfile(!editProfile)}
            style={{
              fontSize: "40px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          />
          {editProfile === false && (
            <button onClick={handleEdit}>Сохранить</button>
          )}
          <div
            className={
              editProfile ? styles.name__block_disabled : styles.name__block
            }
          >
            <input
              type="text"
              disabled={editProfile}
              placeholder="Введите Полное имя..."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div
            className={
              editProfile ? styles.name__block_disabled : styles.name__block
            }
          >
            <input
              disabled={editProfile}
              type="text"
              placeholder="Введите почту..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Введите пароль..."
              disabled={editProfile}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
