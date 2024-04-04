import cookies from "cookies";
import { GetServerSideProps } from "next";

export default function LogoutPage() {
  return <div>Logout</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const logoutsession = cookies(req, res);
  logoutsession.set("session", "", {
    httpOnly: false,
    path: "/",
    maxAge: 0,
  });

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
    props: {},
  };
};
