const SignBtns = () => {
  const isLogin = false;
  return (
    <div className="sm:flex hidden lg:text-base lg:max-w-[206px] max-w-[168px] text-xs gap-4 w-full">
      {!isLogin && (
        <button
          className={`lg:basis-[100px] lg:h-[36px] basis-[80px] h-[28px] flex items-center justify-center bg-white text-blue border-blue border-1 rounded-lg`}
        >
          <h5 className="font-bold">SignUp</h5>
        </button>
      )}
      <button
        className={`lg:basis-[90px] lg:h-[36px] basis-[72px] h-[28px] flex items-center justify-center bg-blue text-white rounded-lg`}
      >
        <h5 className="font-bold">{`${isLogin ? "logout" : "login"}`}</h5>
      </button>
    </div>
  );
};

export default SignBtns;
