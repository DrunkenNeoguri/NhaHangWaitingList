import { Props } from "../utils/typealies";

function UserPage(props: Props) {
  return (
    <section style={{ background: "#F2F2F2", height: "100vh" }}>
      {props.children}
    </section>
  );
}

export default UserPage;
