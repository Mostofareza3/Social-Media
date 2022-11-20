import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost/CreatePost";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/LeftHome";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import "./style.css";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
