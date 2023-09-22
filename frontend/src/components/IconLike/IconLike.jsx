import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function IconLike({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((item) => myid === item._id));
  }, [likes, myid]);

  function toggleLike() {
    if (isLike) {
      api
        .remuvelikeCard(cardid)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при удалении лайка ${err}`));
    } else {
      api
        .likeCard(cardid)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при добавлении лайка ${err}`));
    }
  }

  return (
    <>
      <button
        className={`element__like ${isLike ? "element__like_active" : ""}`}
        type="button"
        onClick={toggleLike}
      />
      <span className="element__number-likes">{count} </span>
    </>
  );
}