import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { useEffect, useState } from "react";
import { validation } from "../../utils/validationForm";

export default function Step2({ formIncomplete, onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [businessType, setBusinessType] = useState(app.businessType || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (businessType !== "individual" && businessType !== "company") {
      setError("Business type is required");
      return;
    }
    setError(""); // reset error kalau valid
    dispatch(upsert({ businessType: businessType }));
    onNext();
  };

  // simpan submitter
  useEffect(() => {
    setError("");
    validation(2, { businessType: businessType }, formIncomplete);
    setSubmitter?.(handleSubmit);
    return () => setSubmitter?.(null);
  }, [setSubmitter, businessType]);

  return (
    <form
      className="w-full flex flex-col gap-4 lg:mt-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* INDIVIDUAL */}
      <label
        className={`relative w-full rounded-xl border p-4 flex items-center gap-3 cursor-pointer ${
          businessType === "individual"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="individual"
          required
          checked={businessType === "individual"}
          onChange={(e) => setBusinessType(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex gap-3">
          <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
            <span className="text-xl lg:text-[1.4vh]">👜</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[#4F46E5] lg:text-[1.8vh]">
              Independent Freelancer & Contractor
            </div>
            <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
              Providing reliable, flexible, and high-quality support for your
              projects.
            </p>
          </div>
        </div>
      </label>

      {/* COMPANY */}
      <label
        className={`relative w-full rounded-xl border p-4 flex items-center gap-3 cursor-pointer ${
          businessType === "company"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="company"
          checked={businessType === "company"}
          onChange={(e) => setBusinessType(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex gap-3">
          <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
            <span className="text-xl lg:text-[1.4vh]">🏢</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[#4F46E5] pr-3 lg:pr-0 lg:text-[1.8vh]">
              Company / Organization Applicant
            </div>
            <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
              Representing our team to deliver trusted expertise, scalable
              solutions, and long-term collaboration.
            </p>
          </div>
        </div>
      </label>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="w-full text-right text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}
