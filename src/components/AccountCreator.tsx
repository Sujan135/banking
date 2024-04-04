import { Account } from "@/library/user";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaEdit, FaPiggyBank } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const AccountCreator = (props: { accounts: Account[] }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    console.log(formData);

    if (formData) {
      try {
        const response = await fetch("/api/user/account", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
          }),
        });

        const data = await response.json();
        if (data.statusCode === 201) {
          router.replace(router.asPath);
          setOpen(!open);
          console.log("Added Successful");
        }
      } catch (e) {
        console.error(e);
      }
    }
    setFormData({ name: "" });
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 z-20 bg-green-600 rounded-md shadow-md">
      {!open && (
        <FaPiggyBank
          role="button"
          className="text-white"
          onClick={handleClick}
        />
      )}
      {open && (
        <div className="text-white flex flex-col gap-2">
          <button onClick={handleClick} className="absolute top-4 right-4">
            <FaX />
          </button>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Enter Account Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  name: e.currentTarget.value,
                })
              }
              className="rounded-md px-2 py-1 text-black"
              type="text"
              placeholder="Enter Account Name"
              required
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
