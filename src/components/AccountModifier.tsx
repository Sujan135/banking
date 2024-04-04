import { Account } from "@/library/user";
import { moneyToNumeric } from "@/utils/moneyToNumeric";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const AccountModifier = (props: { selectedAccount: Account }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description) return;

    console.log(formData);

    const now = new Date();
    const date = new Date(formData.date);
    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    if (formData) {
      try {
        const Amount = parseFloat(formData.amount);
        const response = await fetch("/api/user/transaction", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account_id: props.selectedAccount.id,
            amount: Amount,
            description: formData.description,
            date: date.toISOString(),
          }),
        });

        const data = await response.json();
        if (data.statusCode === 201) {
          router.replace(router.asPath);
          setOpen(!open);
          console.log("Transaction successful");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 z-10 bg-green-600 rounded-md shadow-md">
      {!open && (
        <FaEdit role="button" className="text-white" onClick={handleClick} />
      )}
      {open && (
        <div className="text-white flex flex-col gap-2">
          <button onClick={handleClick} className="absolute top-4 right-4">
            <FaX />
          </button>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Enter Amount</label>
            <input
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  amount: e.currentTarget.value,
                  description: formData.description,
                  date: formData.date,
                })
              }
              className="rounded-md px-2 py-1 text-black"
              type="number"
              placeholder="0.00"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Enter Description</label>
            <input
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  amount: formData.amount,
                  description: e.currentTarget.value,
                  date: formData.date,
                })
              }
              className="rounded-md px-2 py-1 text-black"
              type="text"
              placeholder="Apple, Nike, Starbacks"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Select Date</label>
            <input
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  amount: formData.amount,
                  description: formData.description,
                  date: e.currentTarget.value,
                })
              }
              className="rounded-md px-2 py-1 text-black"
              type="date"
              placeholder="Today"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-white text-green-600 rounded-md mt-2 py-1 font-semibold"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
