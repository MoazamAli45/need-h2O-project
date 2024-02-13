export const PrimaryButton = ({ children, styles }) => {
  return (
    <button
      className={`${styles}  rounded-full border-none bg-primaryColor  text-white text-lg cursor-pointer px-6 py-3  focus:outline-none font-semibold text-[14px] md:text-[16px]   `}
    >
      {children}
    </button>
  );
};
