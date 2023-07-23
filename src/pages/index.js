import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/api";
import dynamic from "next/dynamic";

const HomePage = ({ allNews }) => {
  const { data, isLoading, isError, error } = useGetNewsesQuery();
  console.log(data);

  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h1>Loading.....</h1>,
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicBanner />
      <AllNews allNews={allNews} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();

  return {
    props: {
      allNews: data.data,
    },
    // revalidate: 10,
  };
};
