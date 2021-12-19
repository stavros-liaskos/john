import Image from 'next/image';
import { ListProps, ListEl } from './List.types';
import React from 'react';

const List: React.FunctionComponent<ListProps> = ({ list }) => {
  if (!list) {
    return null;
  }

  return (
    <div className="border border-indigo-100">
      {list.map((el: ListEl, index: number) => (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={index}>
          <div className="md:flex">
            <div className="md:shrink-0">
              <Image
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="https://www.placecage.com/120/120"
                alt={`Logo of ${el.name}`}
                width={120}
                height={170}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
              <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                {el.name}
              </a>
              <p className="mt-2 text-gray-500">
                Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find
                your first customers.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
