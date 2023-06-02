import Image from "next/image";

export interface PromptHistoryItem {
  url: string;
  prompt: string;
}

interface Props {
  items: PromptHistoryItem[];
  onSelect: (item: PromptHistoryItem) => void;
}

export const PromptHistory = ({ items, onSelect }: Props) => {
  return (
    <>
      {items.length !== 0 && (
        <p className="text-large dark:text-white">Your latest creations</p>
      )}
      <ul className="mt-5 w-[512px]">
        {items.map((item) => (
          <li
            onClick={() => {
              onSelect(item);
            }}
            className="hover:cursor-pointer rounded-lg flex gap-4 items-center p-2 dark:hover:bg-slate-700 hover:bg-slate-200 transition-all"
            key={item.url}
          >
            <Image
              src={item.url}
              width={32}
              height={32}
              alt={item.prompt ?? "generated poster image"}
            />
            <p className="dark:text-white text-sm italic">{item.prompt}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
