const Appbar = () => {
  return (
    <div className="flex justify-between dark:bg-slate-950 bg-slate-300 p-4 drop-shadow-sm h-[60px]">
      <nav className="flex items-center gap-6 ">
        <a className="text-lg text-purple-800 dark:text-purple-200" href="/">
          <b>AI Shop</b>
        </a>
        <a href="/poster" className="dark:text-purple-300">
          Posters
        </a>
      </nav>
    </div>
  );
};

export default Appbar;
