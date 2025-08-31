import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { useEffect, useState } from "react";
import {
  Plant01Icon,
  BulbChargingIcon,
  Rocket01Icon,
  CrownIcon,
} from "hugeicons-react";

export default function Step6({ onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [level, setLevel] = useState(app.businessType || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setSubmitter?.(handleSubmit);
    return () => setSubmitter?.(null);
  }, [setSubmitter, level]);

  const handleSubmit = () => {
    if (!level) {
      setError("Level is required");
      return;
    }
    setError(""); // reset error
    dispatch(upsert({ businessType: level }));
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
      {/* BEGINNER */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          level === "beginner"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="beginner"
          checked={level === "beginner"}
          onChange={(e) => setLevel(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <Plant01Icon size={19} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5] lg:text-[1.8vh]">
            Beginner
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            I can interact in a simple way, if the other person talks slowly and
            is able to cooperate.
          </p>
        </div>
      </label>

      {/* INTERMEDIATE */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          level === "intermediate"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="intermediate"
          checked={level === "intermediate"}
          onChange={(e) => setLevel(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <BulbChargingIcon size={19} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5] lg:text-[1.8vh]">
            Intermediate
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            I can explain my decisions and follow most instructions in text or
            speech, though I sometimes need repetition.
          </p>
        </div>
      </label>

      {/* ADVANCED */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          level === "advanced"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="advanced"
          checked={level === "advanced"}
          onChange={(e) => setLevel(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <Rocket01Icon size={19} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5] lg:text-[1.8vh]">
            Advanced
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            I understand and use complex language, speak on technical topics,
            and communicate spontaneously with ease.
          </p>
        </div>
      </label>

      {/* PROFICIENT */}
      <label
        className={`relative w-full rounded-xl p-4 flex items-start gap-3 cursor-pointer border ${
          level === "proficient"
            ? "border-indigo-600 bg-indigo-50 shadow-inner"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="radio"
          name="businessType"
          value="proficient"
          checked={level === "proficient"}
          onChange={(e) => setLevel(e.target.value)}
          className="absolute top-4 right-4 h-5 w-5 
             appearance-none rounded-full border border-gray-400 bg-white
             checked:border-indigo-600 checked:bg-white
             cursor-pointer
             before:content-[''] before:block before:absolute before:inset-1
             before:rounded-full before:bg-white
             checked:before:bg-indigo-600"
        />
        <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-[#F4F4FB] text-black text-2xl">
          <CrownIcon size={19} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#4F46E5] lg:text-[1.8vh]">
            Proficient
          </div>
          <p className="mt-1 text-gray-500 lg:text-[1.6vh] !mb-0">
            I understand almost everything I hear or read and speak confidently
            with nuance in complex situations.
          </p>
        </div>
      </label>

      {/* ERROR MESSAGE */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
