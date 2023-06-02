import { motion } from "framer-motion";

interface Props {
  value: string;
  isRecording: boolean;
  isLoading: boolean;
  onChange: (val: string) => void;
  handleSubmit: (event: any) => void;
  onStartRecording: () => void;
}

export const Prompt = ({
  value,
  onChange,
  handleSubmit,
  isRecording,
  isLoading,
  onStartRecording,
}: Props) => {
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="w-[512px]">
        <div className="relative w-full">
          <input
            disabled={isRecording || isLoading}
            type="text"
            id="prompt"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-14 pr-24 bg-white border-2 border-gray-900 text-gray-900 text-md rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
            placeholder="Colorful cartoon portrait of Stevie Wonder"
            required
            data-1p-ignore
          />
          <input className="opacity-0" type="submit"></input>

          <div className="absolute top-0 right-0">
            {!isRecording && (
              <button
                disabled={isRecording || isLoading}
                onClick={onStartRecording}
                className="hover:cursor-pointer p-4 pr-5 flex justify-center items-center text-pink-500 hover:text-pink-700 active:text-pink-400"
              >
                <svg
                  className="h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path>
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path>
                </svg>
              </button>
            )}
          </div>
          {isRecording && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="pointer-events-none absolute text-pink-500 top-4 right-5 w-6 h-6 rounded-full"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </form>
  );
};
