import { bankingNavigation } from "@/data/navigations/personalBanking";
import { checkUserCookie } from "@/library/auth";
import { Account, getUserAccounts, getUser, User } from "@/library/user";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { AccountCreator } from "@/components/AccountCreator";
import { UserModifier } from "@/components/UserModifier";

export default function BankingAccounts({
  accounts,
  user,
}: {
  accounts: Account[];
  user: User;
}) {
  let totalBalance = 0;
  for (let i = 0; i < accounts.length; i++) {
    totalBalance += parseFloat(accounts[i].balance.substring(1));
  }
  let newBalance = totalBalance.toFixed(2);

  return (
    <>
      <div className=" bg-green-600">
        <ol className="flex gap-5 font-semibold  text-white items-center container mx-auto  ">
          <li className="py-4 hover:underline">Accounts</li>
          <li className="py-4 hover:underline">Transfers</li>
          <li className="py-4 hover:underline">Bill Pay</li>
          <li className="py-4 hover:underline">Account Options</li>
        </ol>
      </div>
      <div className="container mx-auto w-full h-full">
        <div className="flex gap-2 mt-10 text-2xl items-stretch">
          <h1 className="text-green-700">Good evening,</h1>
           <h1 className="text-green-900 font-semibold">{user.name}</h1>
        </div>
        <div className="flex gap-2  ">
          <p className="text-green-700">Today is Dec 18, 2023.</p>
          <p className="text-gray-600">
            Last accessed Nov 13, 2023 4:19 PM ET.
          </p>
        </div>
        <div>
          <table className="mt-6 w-[70%]">
            <thead>
              {/* <div className="my-3 p-3 flex gap-4 "> */}
              <tr>
                <th className=" p-3 text-green-700 font-semibold">Deposits</th>
                <th className=" p-3 text-gray-600 font-thin text-xs">
                  <div className="w-9"> Available Balance</div>
                </th>
                <th className="p-3 text-gray-600 font-thin text-xs">
                  <div className="w-9">Todays Begining Balance</div>
                </th>
                <th className="p-3 text-gray-600 font-thin text-xs">
                  <div className="w-9">Pending Transactions</div>
                </th>
                {/* </div> */}
              </tr>
            </thead>
            <tbody className="border-collapse border border-green-700">
              {accounts.map((rows) => {
                let id = rows.id;
                let lastDigit = id.substring(id.length - 4);

                const accountId = rows.id;
                const anyAccount =
                  "/banking/accounts/" + accountId + "/activity";

                return (
                  <tr key={rows.id}>
                    <td className=" inline-block  items-center p-3 text-sm text-gray-700 font-semibold">
                      <Link href={anyAccount}>
                        <div className="flex items-center gap-3">
                          {rows.name}
                          <FaChevronRight />
                        </div>
                      </Link>
                      <div>
                        <p>{lastDigit}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-green-700 font-semibold">
                      {rows.balance}
                    </td>
                    <td className="p-3 text-sm text-green-700 font-semibold">
                      {rows.balance}
                    </td>
                    <td className="p-3 text-sm text-green-700 font-semibold">
                      $0.00
                    </td>
                  </tr>
                );
              })}
              <tr className=" p-3 text-sm bg-gray-200 ">
                <td className="p-3 text-sm text-gray-700 font-semibold">
                  Total
                </td>
                <td className="p-3 text-sm text-green-700 font-semibold">
                  ${newBalance}
                </td>
                <td className="p-3 text-sm text-green-700 font-semibold"></td>
                <td className="p-3 text-sm text-green-700 font-semibold"></td>
              </tr>
            </tbody>
          </table>
          <AccountCreator accounts={accounts} />
          <UserModifier user={user} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const isLoggedIn = await checkUserCookie(req, res);

  let accounts: Account[] | undefined;
  let user: User | undefined;

  console.log("isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    accounts = await getUserAccounts(isLoggedIn.userId);
    user = await getUser(isLoggedIn.userId);
  }

  return {
    redirect: !isLoggedIn && {
      destination: "/login",
      permanent: false,
    },
    props: {
      navigation: bankingNavigation,
      isAuthenticated: isLoggedIn,
      accounts,
      user,
    },
  };
};
