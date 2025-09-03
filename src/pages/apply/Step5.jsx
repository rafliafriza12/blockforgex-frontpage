import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { useEffect, useState } from "react";
import { ClockCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import { CheckListIcon } from "hugeicons-react";
import { validation } from "../../utils/validationForm";

export default function Step5({ formIncomplete, onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [workType, setWorkType] = useState(app.workType || "");
  const [error, setError] = useState("");

  useEffect(() => {
    validation(5, { workType }, formIncomplete);
    setError("");
    setSubmitter?.(handleSubmit);
    return () => setSubmitter?.(null);
  }, [setSubmitter, workType]);

  const handleSubmit = () => {
    if (
      !workType ||
      (workType !== "fulltime" &&
        workType !== "parttime" &&
        workType !== "asneeded")
    ) {
      setError("Work type is required");
      return;
    }
    setError(""); // reset error kalau valid
    dispatch(upsert({ workType }));
    onNext();
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* FULLTIME */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          workType === "fulltime"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="workType"
          value="fulltime"
          checked={workType === "fulltime"}
          onChange={(e) => setWorkType(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <ClockCircleOutlined className="lg:!text-[2.2vh]" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-[#4F46E5] lg:text-[1.8vh]">
            Fulltime
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            40 hours per week.
          </p>
        </div>
      </label>

      {/* PARTTIME */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          workType === "parttime"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="workType"
          value="parttime"
          checked={workType === "parttime"}
          onChange={(e) => setWorkType(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <HourglassOutlined className="lg:!text-[2.2vh]" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-[#4F46E5] lg:text-[1.8vh]">
            Part-time
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            20-30 hours per week.
          </p>
        </div>
      </label>

      {/* AS NEEDED */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          workType === "asneeded"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="workType"
          value="asneeded"
          checked={workType === "asneeded"}
          onChange={(e) => setWorkType(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <CheckListIcon size={19} />
        </div>
        <div className="flex-1">
          <div className="font-medium text-[#4F46E5] lg:text-[1.8vh]">
            As Needed
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            Flexible hours, on my own time.
          </p>
        </div>
      </label>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="w-full text-right text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}
