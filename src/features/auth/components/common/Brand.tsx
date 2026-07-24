import bunnyLogo from "../../../../assets/images/motaweer-login.png";

const Brand = () => {
  return (
    <div className=" flex flex-col items-center text-center w-full">
      <img
        src={bunnyLogo}
        alt="Libya Developers"
        className="w-48 sm:w-56 md:w-72 h-auto object-contain mb-4"
      />
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
        المبرمجين الليبيين
      </h2>

      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          استكشف مجتمعك التقني
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#33373e]">
          طور , ناقش , كون فرق
        </p>
      </div>
    </div>
  );
};

export default Brand;
