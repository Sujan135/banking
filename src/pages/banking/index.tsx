import { GetServerSideProps } from "next";

export default function Banking() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: "/banking/accounts",
      permanent: true,
    },
  };
};
