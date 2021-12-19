import type { NextPage } from "next";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Head from "../components/HeadMeta/HeadMeta";

const Home: NextPage = () => {
  return (
    <div className="container max-auto">
      <div className="flex flex-col h-screen justify-between">
        <Head />

        <Main className={"mb-auto h-10 bg-green-500"} i18n={{ todo: "toso" }} />

        <Footer className="h-10 bg-blue-500" i18n={{ powered: "poweerf" }} />
      </div>
    </div>
  );
};

export default Home;
