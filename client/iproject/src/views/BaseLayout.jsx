import { Outlet } from "react-router";
import Nav from "../components/Nav";

export default function BaseLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
