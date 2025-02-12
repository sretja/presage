import { format } from "date-fns";
import { GetServerSideProps } from "next";
import React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { BASE_URL } from "../lib/constants";
import { ssrFetcher } from "../lib/fetcher";
import { ClaimedReward } from "../lib/types";
import { DashboardLayout } from "../modules/draft/DashboardLayout";
import { OpenButton } from "../modules/draft/OpenButton";

const ClaimedRewards: React.FC = () => {
  const { data: rewards } = useQuery<ClaimedReward[]>("/rewards/claimed");

  return (
    <DashboardLayout>
      <header className="sticky z-50 top-0 bg-white flex items-center justify-between py-4 lg:py-6 px-8">
        <OpenButton />
      </header>
      <main className="py-4 md:py-8 lg:py-12 px-8 max-w-3xl mx-auto">
        <h3 className="h4 md:h3">Claimed Rewards</h3>
        <p className="text-gray-600 mt-1">
          Claim rewards by viewing the writers&apos;s profile page
        </p>
        {rewards && rewards.length > 0 ? (
          <div className="grid border-t-2 border-b-2 border-gray-100 divide-y-2 divide-gray-100 grid-cols-1 mt-10 lg:mt-12">
            {rewards?.map((claimed) => (
              // @ts-ignore
              <a
                key={claimed.id}
                className="group block hover:bg-gray-50 p-8 transition"
                {...(claimed.reward.type === "link" ||
                claimed.reward.type === "shoutout"
                  ? {
                      href:
                        claimed.reward.link ||
                        `${BASE_URL}/article/${claimed.shoutoutArticle}`,
                      target: "_blank",
                    }
                  : {})}
              >
                <div className="flex items-center space-x-3 focus:outline-none mb-4">
                  <img
                    src={claimed.user.profilePicture}
                    alt={claimed.user.displayName}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <h6 className="font-semibold text-gray-800 leading-none">
                    {claimed.user.displayName}
                  </h6>
                </div>
                <h6 className="text-lg md:text-xl lg:text-2xl font-bold">
                  {claimed.reward.name}
                </h6>
                <p className="text-gray-600 mt-2">
                  {claimed.reward.description}
                </p>
                <div className="flex items-center space-x-1.5 mt-1">
                  <div
                    className={`text-sm font-semibold ${
                      claimed.status === "declined"
                        ? "text-red"
                        : "text-gray-900"
                    }`}
                  >
                    {claimed.status}
                  </div>
                  <span className="text-gray-500">·</span>
                  <p className="text-gray-500 text-sm">
                    Claimed at{" "}
                    {format(new Date(claimed.createdAt), "MMMM dd, yyyy")}
                  </p>
                </div>
                {claimed.reward.type === "link" ||
                claimed.reward.type === "shoutout" ? (
                  <a className="inline-flex space-x-2 items-center mt-5 group-hover:underline text-gray-700">
                    <HiOutlineExternalLink className="w-4 h-4" />
                    <span className="font-bold text-sm">
                      {claimed.reward.link ||
                        `${BASE_URL}/article/${claimed.shoutoutArticle}`}
                    </span>
                  </a>
                ) : null}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-6 lg:mt-8 pt-6 border-t">
            <p className="text-gray-500 text-sm">No rewards found.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/journals/me",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  await queryClient.prefetchQuery(
    "/rewards",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery(
    "/rewards/claimed",
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ClaimedRewards;
