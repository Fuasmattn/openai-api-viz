import { motion } from "framer-motion";

export interface CardContent {
  title: string;
  description: string;
  url: string;
  cost: number;
  played: boolean;
}

interface Props {
  cost: number;
  title: string;
  description: string;
  url: string;
  style?: any;
  className?: string;
  hidden?: boolean;
}

const Card = ({
  className,
  style,
  cost,
  title,
  description,
  url,
  hidden,
}: Props) => {
  return (
    <motion.div
      style={{ ...style, transformStyle: "preserve-3d" }}
      animate={{
        rotateY: hidden ? 180 : 0,
      }}
      whileHover={{ translateY: -5, rotateZ: -2 }}
      whileTap={{ translateY: -200, rotateY: 0, rotateZ: 3 }}
      transition={{ delay: 0, duration: 0.2 }}
      className={`${className} shadow-xl bg-white shadow-black rounded-lg p-2`}
    >
      <div style={{ backfaceVisibility: "hidden" }} className="w-full h-full">
        <div className="relative h-full w-full">
          <div className="border-2 border-slate-800 h-full w-full rounded-lg flex flex-col">
            <div
              style={{ backgroundImage: `url(${url})` }}
              className={`h-1/2 w-full bg-cover`}
            ></div>
            <div className="h-1/2 w-full p-2 bg-white">
              <h2 className="text-base lg:text-lg my-2 break-words">{title}</h2>
              <p className="text-xs lg:text-sm break-words">{description}</p>
            </div>
          </div>
          <div className="absolute top-2 left-2 flex">
            <div className="w-10 h-10 text-xl bg-yellow-400 bg-opacity-10 rounded-full border-4 items-center flex justify-center border-yellow-500 text-yellow-500">
              {cost}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute top-0 left-0 bg-cover w-full h-full rounded-lg"
        style={{
          backfaceVisibility: "hidden",
          backgroundImage: `url(${url})`,
          transform: "rotateY(-180deg)",
        }}
      ></motion.div>
    </motion.div>
  );
};

export default Card;
