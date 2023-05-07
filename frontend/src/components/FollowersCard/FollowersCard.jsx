import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  useEffect(()=>{
    console.log(modalOpened)
  },[modalOpened])

  const renderedComponents =persons.slice(0, 3).map((person, id) => {
    if (person._id !== user._id) return <User person={person} key={id} />;
  })
  const renderedComponentsAll = persons.map((person, id) => {
    if (person._id !== user._id) return <User person={person} key={id} />;
  })
  return (
    <div className="FollowersCard">
      <p>People you may know</p>
      {
        renderedComponents
      }
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data = {renderedComponentsAll}
      />
    </div>
  );
};

export default FollowersCard;
