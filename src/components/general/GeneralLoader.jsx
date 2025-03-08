import logo from "@/assets/images/logo.png";

const GeneralLoader = () => {
  return (
    <section>
      <div className="h-full items-center flex z-50 justify-center text-primary inset-0 absolute bg-black/20">
        <img src={logo} alt="logo" />
        <p>....</p>
      </div>
    </section>
  );
};

export default GeneralLoader;
