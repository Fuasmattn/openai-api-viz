import { motion } from "framer-motion";
import Skeleton from "./Skeleton";

interface Props {
  isActive: boolean;
  context: any;
  title?: string;
  className?: string;
}

const StateItem = ({ isActive, context, title, className }: Props) => {
  return (
    <motion.div className={`${className}`}>
      <div className="flex gap-8">
        <div className="relative mb-2 w-1/2">
          <Skeleton className="absolute top-0 left-0 w-full" />
          {isActive && (
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.08, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ delay: 1 }}
              className="shadow-2xl w-full absolute left-0 top-0 p-5 text-2xl font-bold bg-slate-50 rounded"
            >
              <p className="text-xl mb-4">{title}</p>
              <p className="text-xs mb-2">
                Prompt: &quot;{context.prompt}&quot;
              </p>
              <p className="text-xs animate-pulse">
                <span className="font-bold mr-2">POST</span>
                https://api.openai.com/v1/images/generations
              </p>

              <motion.div className="absolute top-5 right-8">
                <div className="w-10 h-10 bg-yellow-400 rounded-full border-4 text-center border-yellow-500 text-yellow-500">
                  4
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {isActive && (
          <div className="w-1/2 relative p-4 text-slate-500">
            <p className="font-bold text-xl mb-2">
              Some information about this..
            </p>
            <p>Input costs, output costs</p>
            <p>what data is sent to whom?</p>
            <p>
              This message is stored in the state machine: {context.message}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StateItem;
