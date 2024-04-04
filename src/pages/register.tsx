import InputText from "@/components/InputText";
import { personalBankingNavigation } from "@/data/navigations/personalBanking";
import { validatePassword } from "@/utils/validations/validatePassword";
import { validateUsername } from "@/utils/validations/validateUsername";
import { error } from "jquery";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const router = useRouter();

  const isValidInput = validateUsername(username) && validatePassword(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidInput) {
      try {
        const response = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (data.statusCode == 201) {
            router.push("/login");
          // TODO: redirect to login page
          console.log(data.message);
        } else {
          console.error(`Error:" ${data.message}`);
          setError(data.message);
        }
      } catch (e) {
        console.error(e);
        setError("Unknown error");
      }
    }
  };

  // Send a fetch POST request to /api/user/register with the body { username: ..., password: ... }
  // secure user password using bcrypt
  // insert username and password in database
  //  In frontend show that username is already taken

  return (
    <div className="container mx-auto flex-1 bg-no-repeat bg-contain bg-bottom bg-[url(/laptop-lady.png)]">
      <h1 className="text-start text-2xl text-green-700 font-bold mt-4 mx-4">
        Welcome to Online Banking
      </h1>
      <div className="flex justify-between mx-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-400 mt-8 w-96 h-96 bg-white bg-opacity-75 flex flex-col px-8 gap-2 py-5"
        >
          <div className="text-gray-600 text-lg">User name</div>
          <InputText
            input={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <div className="text-gray-600 text-lg mt-5">Password</div>
          <InputText
            input={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button
            type="submit"
            disabled={!isValidInput}
            className={twMerge(
              "border border-solid border-gray-700 p-1 font-semibold mx-10 my-5",
              isValidInput && "bg-green-600 text-white"
            )}
          >
            Register
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="flex justify-center">
            <Link href="/login">
              <span className="hover:underline text-green-600 cursor-pointer font-semibold justify-center">
                Already have an account? Login
              </span>
            </Link>
          </div>
        </form>
        <div className="mt-10 text-align- right mx-4 w-96">
          <h2 className="text-green-600 font-semibold ">
            Create your MOCK TD Bank account
          </h2>
          <p className="mt-2">
            This is not a real TD Bank account and doesn&apos;t handle real
            money transactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      navigation: personalBankingNavigation,
    },
  };
};
