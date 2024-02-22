export const PrimaryButton = ({ children, styles, ...props }) => {
  return (
    <button
      className={`${styles}  rounded-full border-none bg-bluePrimary  text-white text-lg cursor-pointer px-6 py-3  focus:outline-none font-semibold text-[14px] md:text-[16px]  hover:bg-bluePrimary/[.90] `}
      {...props}
    >
      {children}
    </button>
  );
};
