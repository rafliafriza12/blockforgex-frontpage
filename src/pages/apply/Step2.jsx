import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { useEffect, useState } from "react";

export default function Step2({ onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [businessType, setBusinessType] = useState(app.businessType || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!businessType) {
      setError("Business type is required");
      return;
    }
    setError(""); // reset error kalau valid
    dispatch(upsert({ businessType }));
    onNext();
  };

  // simpan submitter
  useEffect(() => {
    setSubmitter?.(handleSubmit);
    return () => setSubmitter?.(null);
  }, [setSubmitter, businessType]);

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* INDIVIDUAL */}
      <label
        className={`relative w-full rounded-xl border p-4 flex items-start gap-3 cursor-pointer ${
          businessType === "individual"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="individual"
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
          <span className="text-xl">👜</span>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5]">
            Independent Freelancer & Contractor
          </div>
          <p className="mt-1 text-gray-500">
            Providing reliable, flexible, and high-quality support for your
            projects.
          </p>
        </div>
      </label>

      {/* COMPANY */}
      <label
        className={`relative w-full rounded-xl border p-4 flex items-start gap-3 cursor-pointer ${
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
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
          <span className="text-xl">🏢</span>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5] pr-3 lg:pr-0">
            Company / Organization Applicant
          </div>
          <p className="mt-1 text-gray-500">
            Representing our team to deliver trusted expertise, scalable
            solutions, and long-term collaboration.
          </p>
        </div>
      </label>

      {/* ERROR MESSAGE */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

{
  /* <Radio.Group className="w-full"> */
}
{
  /* <div className="grid gap-4"> */
}
{
  /* Individual */
}

{
  /* <label
        className="
      relative w-full rounded-xl border border-[#E6E6E6] bg-white p-4
      group-[.ant-radio-wrapper-checked]:border-[#4F46E5]
      group-[.ant-radio-wrapper-checked]:bg-[#F9F9FD]
      group-[.ant-radio-wrapper-checked]:shadow-[inset_0_0_0_2px_rgba(79,70,229,0.20)]
    "
      >
        <div className="flex w-full items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
            <span className="text-xl">👜</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[#4F46E5] ">
                independent Freelancer & Contractor
              </div>
            </div>
            <p className="mt-1 text-gray-500">
              Providing reliable, flexible, and high-quality support for
              your projects.
            </p>
          </div>
        </div>
      </label> */
}
{
  /* <Radio
        value="individual"
        className="rf-choice group w-full"
      ></Radio> */
}

{
  /* Company */
}
{
  /* <Radio value="company" className="rf-choice group w-full"> */
}
{
  /* <div
          className="
      relative w-full rounded-xl border border-[#E6E6E6] bg-white p-4
      group-[.ant-radio-wrapper-checked]:border-[#4F46E5]
      group-[.ant-radio-wrapper-checked]:bg-[#F9F9FD]
      group-[.ant-radio-wrapper-checked]:shadow-[inset_0_0_0_2px_rgba(79,70,229,0.20)]
    "
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
              <span className="text-xl">🏢</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-[#4F46E5] leading-[1.2]">
                  Company / Organization Applicant
                </div>
              </div>
              <p className="mt-1 text-gray-500">
                Representing our team to deliver trusted expertise,
                scalable solutions, and long-term collaboration.
              </p>
            </div>
          </div>
        </div>
      </Radio>
    </div>
  </Radio.Group> */
}
