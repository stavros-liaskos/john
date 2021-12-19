import { MainProps } from "./Main.types";
import List from "../List/List";

const Main = ({ i18n, className }: MainProps) => {
  if (!i18n || !i18n.todo) {
    return null;
  }

  const list2 = [
    {
      name: "Led Zeppeling",
      href: "www.google.com",
    },
    {
      name: "YOYOO",
      href: "www.google.com",
    },
  ];

  return (
    <main className={className}>
      <h1 className="text-3xl font-bold underline">
        {i18n.todo} to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <List list={list2} />
    </main>
  );
};

export default Main;
