import Loader from "../Loader/Loader";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <>
    <Loader></Loader>
    <div className="container">
      <main>{children}</main>
    </div>
    </>

  )
}