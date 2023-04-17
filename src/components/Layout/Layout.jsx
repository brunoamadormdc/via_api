import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
    </div>
  )
}