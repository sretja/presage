import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

interface WaitlistProps {}

const notify = () => toast.success("Success! Thanks for joining the Waitlist.");

export const Waitlist: React.FC<WaitlistProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form
        className="relative flex items-center space-x-2 mt-5 sm:mt-8 max-w-md lg:max-w-[30rem]"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await fetch("/api/waitlist", {
            method: "POST",
            body: JSON.stringify({ email }),
          });
          umami.trackEvent(`${email} joined waitlist`, "waitlist");
          setLoading(false);
          notify();
          setEmail("");
        }}
      >
        <Input
          placeholder="Email Address"
          type="email"
          className="!py-3.5 pl-5 pr-44"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Button
          type="submit"
          className="absolute right-1.5 flex-shrink-0"
          loading={loading}
        >
          Join Waitlist
        </Button>
      </form>
    </>
  );
};
