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
          <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] p-2 lg:p-[1.3vh] items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
            <svg
              className="w-full h-auto"
              viewBox="0 0 39 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.4309 8.92315C26.4309 5.44271 26.4309 3.70433 25.3895 2.62292C24.3482 1.5415 22.6742 1.5415 19.3226 1.5415C15.9711 1.5415 14.2971 1.5415 13.2557 2.62292C12.2144 3.70433 12.2144 5.44271 12.2144 8.92315M1.552 21.841C1.552 16.6573 1.552 14.0663 2.74974 12.2043C3.26849 11.398 3.93514 10.7057 4.71162 10.167C6.50468 8.92315 8.9979 8.92315 13.9914 8.92315H24.6538C29.6456 8.92315 32.1406 8.92315 33.9337 10.167C34.7101 10.7057 35.3768 11.398 35.8955 12.2043C37.0933 14.0663 37.0933 16.6554 37.0933 21.841C37.0933 27.0267 37.0933 29.6158 35.8955 31.4778C35.3768 32.2841 34.7101 32.9764 33.9337 33.5151C32.1406 34.7589 29.6474 34.7589 24.6538 34.7589H13.9914C8.99968 34.7589 6.50468 34.7589 4.71162 33.5151C3.93514 32.9764 3.26849 32.2841 2.74974 31.4778C1.552 29.6158 1.552 27.0267 1.552 21.841Z"
                stroke="black"
                stroke-width="2.46055"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.66028 16.3052L9.81892 16.6779C16.0134 18.6437 22.632 18.6437 28.8264 16.6779L29.985 16.3052M19.3227 18.1506V21.8414"
                stroke="black"
                stroke-width="2.46055"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-[#4F46E5] lg:text-[1.8vh]">
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
          <div className="flex h-12 w-12 lg:h-[5vh] lg:w-[5vh] p-2 lg:p-[1.3vh] items-center justify-center rounded-xl border border-[#E6E6E6] bg-[#F4F4FB]">
            <svg
              width="44"
              height="37"
              viewBox="0 0 44 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.6667 4.55255V32.7508C43.6667 33.7313 43.3236 34.5704 42.6375 35.2683C41.9514 35.9661 41.1281 36.3157 40.1675 36.3172H31.75C31.4424 36.3172 31.1853 36.2112 30.9787 35.9992C30.7721 35.7872 30.6681 35.5244 30.6667 35.2108C30.6653 34.8973 30.7693 34.6352 30.9787 34.4247C31.1881 34.2141 31.4453 34.1089 31.75 34.1089H40.1675C40.5561 34.1089 40.8753 33.9815 41.1252 33.7268C41.3751 33.4721 41.5 33.1468 41.5 32.7508V4.55034C41.5 4.15432 41.3751 3.82896 41.1252 3.57426C40.8753 3.31957 40.5561 3.19222 40.1675 3.19222H22C21.61 3.19222 21.2908 3.31957 21.0424 3.57426C20.7925 3.82896 20.6675 4.15505 20.6675 4.55255V7.14293C20.6675 7.45504 20.5635 7.71709 20.3555 7.92909C20.1475 8.14109 19.8897 8.24709 19.582 8.24709C19.2744 8.24709 19.0173 8.14109 18.8107 7.92909C18.6042 7.71709 18.5002 7.45504 18.4987 7.14293V4.52605C18.4987 3.55733 18.841 2.72479 19.5257 2.02843C20.2075 1.33207 21.0236 0.983887 21.974 0.983887H40.1675C41.1295 0.983887 41.9529 1.33354 42.6375 2.03284C43.3222 2.73215 43.6653 3.57132 43.6667 4.55034M0.333374 19.3881C0.333374 18.8213 0.461207 18.2751 0.716874 17.7496C0.972541 17.2225 1.33365 16.7992 1.80021 16.4798L11.301 9.60301C11.6246 9.36893 11.9554 9.2011 12.2934 9.09951C12.6314 8.99646 12.9766 8.94493 13.329 8.94493C13.6815 8.94493 14.0282 8.99646 14.369 9.09951C14.7099 9.20257 15.0422 9.3704 15.3657 9.60301L24.8665 16.4798C25.3331 16.7992 25.6942 17.2225 25.9499 17.7496C26.2055 18.2751 26.3334 18.8213 26.3334 19.3881V32.753C26.3334 33.7335 25.9903 34.5726 25.3042 35.2705C24.6181 35.9683 23.7948 36.318 22.8342 36.3194H19.5842C18.6208 36.3194 17.7967 35.9698 17.112 35.2705C16.4274 34.5712 16.0843 33.732 16.0829 32.753V26.3797H10.5839V32.7508C10.5839 33.7313 10.2408 34.5704 9.55471 35.2683C8.8686 35.9661 8.04526 36.3157 7.08471 36.3172H3.83471C2.87126 36.3172 2.04721 35.9676 1.36254 35.2683C0.677874 34.569 0.334818 33.7305 0.333374 32.753V19.3881ZM2.50004 19.3749V32.753C2.50004 33.149 2.62499 33.4744 2.87487 33.729C3.12476 33.9837 3.44471 34.1111 3.83471 34.1111H7.08471C7.47326 34.1111 7.79248 33.9837 8.04237 33.729C8.29226 33.4744 8.41721 33.149 8.41721 32.753V26.4658C8.41721 25.8181 8.63315 25.2741 9.06504 24.8339C9.49693 24.3937 10.0314 24.1736 10.6684 24.1736H15.9984C16.6354 24.1736 17.1698 24.3937 17.6017 24.8339C18.0336 25.2741 18.2503 25.8188 18.2517 26.4681V32.7508C18.2517 33.1483 18.3759 33.4744 18.6244 33.729C18.8743 33.9837 19.1935 34.1111 19.582 34.1111H22.832C23.222 34.1111 23.542 33.9837 23.7919 33.729C24.0418 33.4744 24.1667 33.1483 24.1667 32.7508V19.3749C24.1667 19.1482 24.1183 18.9354 24.0215 18.7367C23.9248 18.5379 23.7789 18.3686 23.5839 18.2288L14.083 11.4492C13.8606 11.2799 13.6107 11.1952 13.3334 11.1952C13.056 11.1952 12.8062 11.2806 12.5837 11.4514L3.08287 18.2288C2.88932 18.3701 2.74343 18.5394 2.64521 18.7367C2.54843 18.9354 2.50004 19.1482 2.50004 19.3749ZM34.2092 11.5176H35.7909C36.0249 11.5176 36.2293 11.4278 36.404 11.2482C36.5788 11.0701 36.6662 10.8618 36.6662 10.6233V9.01118C36.6662 8.77268 36.5788 8.56436 36.404 8.38622C36.2293 8.20808 36.0249 8.11901 35.7909 8.11901H34.2092C33.9752 8.11901 33.7708 8.20808 33.596 8.38622C33.4213 8.56436 33.3339 8.77194 33.3339 9.00897V10.6233C33.3339 10.8618 33.4213 11.0701 33.596 11.2482C33.7708 11.4264 33.9752 11.5154 34.2092 11.5154M34.2092 20.3488H35.7909C36.0249 20.3488 36.2293 20.2597 36.404 20.0816C36.5788 19.9034 36.6662 19.6951 36.6662 19.4566V17.8445C36.6662 17.606 36.5788 17.3977 36.404 17.2196C36.2293 17.0414 36.0249 16.9523 35.7909 16.9523H34.2092C33.9752 16.9523 33.7708 17.0414 33.596 17.2196C33.4213 17.3977 33.3339 17.6053 33.3339 17.8423V19.4566C33.3339 19.6951 33.4213 19.9034 33.596 20.0816C33.7708 20.2597 33.9752 20.3488 34.2092 20.3488ZM34.2092 29.1821H35.7909C36.0249 29.1821 36.2293 29.093 36.404 28.9149C36.5788 28.7367 36.6662 28.5284 36.6662 28.2899V26.6778C36.6662 26.4393 36.5788 26.231 36.404 26.0529C36.2293 25.8747 36.0249 25.7857 35.7909 25.7857H34.2092C33.9752 25.7857 33.7708 25.8747 33.596 26.0529C33.4213 26.231 33.3339 26.4393 33.3339 26.6778V28.2899C33.3339 28.5284 33.4213 28.7367 33.596 28.9149C33.7708 29.093 33.9752 29.1821 34.2092 29.1821Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-[#4F46E5] pr-3 lg:pr-0 lg:text-[1.8vh]">
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
