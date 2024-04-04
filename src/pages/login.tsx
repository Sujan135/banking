import InputText from "@/components/InputText";
import { personalBankingNavigation } from "@/data/navigations/personalBanking";
import { validatePassword } from "@/utils/validations/validatePassword";
import { validateUsername } from "@/utils/validations/validateUsername";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { FaLock, FaUserLock } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidInput = validateUsername(username) && validatePassword(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidInput) {
      try {
        const response = await fetch("/api/user/login", {
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
        if (data.statusCode === 201) {
          console.log("login successful");
          router.push("/banking/accounts");
        } else if (data.statusCode === 400) {
          setError("Wrong Username or Password");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="container mx-auto flex-1 bg-no-repeat bg-contain bg-bottom bg-[url(/laptop-lady.png)]">
      <h1 className="text-start text-2xl text-green-700 font-bold mt-4 mx-4">
        Welcome to Online Banking
      </h1>
      <div className="flex justify-between mx-4 py-10">
        <form
          method="POST"
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
            type="password"
          />
          <div>
            <input
              type="checkbox"
              className="border border-gray-400 mr-2 text-lg"
              name="remember"
              required
            />
            Remember me
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button
            type="submit"
            disabled={!isValidInput}
            className={twMerge(
              "border border-solid border-gray-700 p-1 font-semibold mx-10 my-5",
              username.length > 0 &&
                password.length > 0 &&
                "bg-green-600 text-white"
            )}
          >
            Log in
          </button>
          <div className="flex justify-center">
            <span className="hover:underline text-green-600 cursor-pointer font-semibold justify-center">
              <a href="#"></a>Forgot user name and/or password?
            </span>
          </div>
        </form>
        <div className="mt-10 text-align- right mx-4 w-96">
          <h2 className="text-green-600 font-semibold ">
            Sign up for Online Banking
          </h2>
          <h2 className="text-green-600 font-semibold my-2">
            View the Online Banking demo
          </h2>
          <h2 className="text-green-600 font-semibold my-2">
            Learn more about TD mobile banking
          </h2>
          <hr className="my-2 border-gray-700" />
          <div className="flex items-start">
            <FaLock className="text-lg text-green-600 mt-1 mr-2" />
            <div className="flex-1">
              <h2 className="text-green-600 font-semibold">
                Find out more about TD Banks online security
              </h2>
              <p>
                and out commitment to provide you with a safe and secure online
                and mobile banking experince
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      navigation: personalBankingNavigation,
    },
  };
};
