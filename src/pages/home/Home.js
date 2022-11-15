import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/LeftHome";
import RightHome from "../../components/home/right";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
    </div>
  );
}
