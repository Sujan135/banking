/* eslint-disable react/jsx-key */
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FaChevronDown } from "react-icons/fa";
import { checkUserCookie } from "@/library/auth";
import {
  Account,
  Transaction,
  User,
  getUser,
  getUserAccounts,
  getUserTransactions,
} from "@/library/user";
import { bankingNavigation } from "@/data/navigations/personalBanking";
import { time, timeStamp } from "console";
import { moneyToNumeric } from "@/utils/moneyToNumeric";
import { AccountModifier } from "@/components/AccountModifier";

export default function AccountActivityPage({
  accounts,
  user,
  transactions,
}: {
  accounts: Account[];
  user: User;
  transactions: Transaction[];
}) {
  const { query, push } = useRouter();
  const selectedAccount = accounts.find(
    (account) => account.id === query.account_id
  )!;

  let currentBalance = moneyToNumeric(selectedAccount.balance);

  return (
    <div className="container mx-auto">
      <div key={selectedAccount.id}>
        <p className="text-xs mt-4">Available Balance</p>
        <h1 className="text-green-700 text-2xl">{selectedAccount.balance}</h1>
        <label htmlFor="balance-select"></label>
        <select
          value={selectedAccount.id}
          className="border py-2 w-96 px-8 border-solid shadow-md border-gray-400"
          name=""
          id="balance-select"
          onChange={(e) => {
            const { value } = e.target;
            push(`/banking/accounts/${value}/activity`);
          }}
        >
          {accounts.map((account) => {
            let id = account.id;
            let lastDigit = id.substring(id.length - 4);
            return (
              <option key={id} value={account.id}>
                {account.name}({lastDigit})
              </option>
            );
          })}
        </select>
        <div className="flex ">
          <p>Today Begining Balance</p>
          <h1 className="font-semibold text-green-700 pl-[10rem]">
            {selectedAccount.balance}
          </h1>
        </div>
        <div className="flex">
          <p>Pending</p>
          <h1 className="font-semibold text-green-700 pl-[18rem]">$0.00</h1>
        </div>
      </div>
      <table className="my-4 mt-10 w-full border-collapse border border-slate-400 text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-green-700" scope="col">
              Activity
            </th>
            <th className="px-6 py-3 text-green-700" scope="col">
              Details
            </th>
            <th className="px-6 py-3 text-green-700" scope="col">
              Statements & Notices
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                Date
                <FaChevronDown />
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                Type
                <FaChevronDown />
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                Description
                <FaChevronDown />
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                Credit
                <FaChevronDown />
              </div>
            </td>
            <td className="px-6 py-4">Balance</td>
          </tr>
          <tr className=" py-6 font-semibold text-black border-b dark:border-gray-700">
            <td className="px-6 py-4"> ACCOUNT HISTORY</td>
          </tr>
          {transactions.map((transaction, i) => {
            const timestamps = new Date(transaction.timestamp);
            const date = `${
              timestamps.getMonth() + 1
            }/${timestamps.getDate()}/${timestamps.getFullYear()}`;

            let pastAmount = currentBalance;
            const amountAsNumber = moneyToNumeric(transaction.amount);
            currentBalance = currentBalance - amountAsNumber;

            return (
              <tr key={transaction.id} className="gap-8  border-b ">
                <td className="px-6 py-4">{date}</td>
                <td className="px-6 py-4">DEBIT </td>
                <td className="px-6 py-4">{transaction.description}</td>
                <td className="px-6 py-4">{amountAsNumber.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {pastAmount.toFixed(2)}
                    <FaChevronDown />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AccountModifier selectedAccount={selectedAccount} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const isLoggedIn = await checkUserCookie(req, res);
  const account_id = (query.account_id || "").toString();

  console.log("Account ID", account_id);

  let accounts: Account[] | undefined;
  let user: User | undefined;
  let transactions: Transaction[] | undefined;

  if (isLoggedIn) {
    accounts = await getUserAccounts(isLoggedIn.userId);

    const accountWithId = accounts.find((account) => {
      return account.id === account_id;
    });

    if (!accountWithId) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    user = await getUser(isLoggedIn.userId);
    transactions = await getUserTransactions(account_id);
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
      transactions,
    },
  };
};
