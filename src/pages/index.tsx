import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { personalBankingNavigation } from "@/data/navigations/personalBanking";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div>Plcaeholder For Content</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      navigation: personalBankingNavigation,
    },
  };
};
