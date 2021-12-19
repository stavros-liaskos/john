import { ListProps, ListEl } from "./List.types";

const List = ({ list }: ListProps) => {
  if (!list) {
    return null;
  }

  return (
    <div>
      {list.map((el: ListEl, index: number) => (
        <div key={index} data-testid="list-el">
          <p>{el.name}</p>
          <a href={el.href}>{el.name}</a>
        </div>
      ))}
    </div>
  );
};

export default List;
