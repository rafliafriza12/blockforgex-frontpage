import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Typography, Button, Space, Avatar } from "antd";
import { useSelector } from "react-redux";
import { selectApp } from "../../store";
import { getInitials } from "../../utils/name";
import logo from "../../assets/logo-blockforgex.png";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import useIsDesktop from "../../hooks/useIsDesktop";

const { Text } = Typography;

export default function StepPage({ total = 7 }) {
  const isDesktop = useIsDesktop();
  const { leftMeta } = useOutletContext() || {};
  const [formInclomplete, setFormIncomplete] = useState(true);

  const { fullName } = useSelector(selectApp);
  const initials = getInitials(fullName);

  const { step } = useParams();
  const n = Math.max(1, Math.min(Number(step) || 1, total));

  const navigate = useNavigate();
  const go = (k) => navigate(`/apply/step/${k}`);
  const next = () => go(Math.min(n + 1, total));
  const prev = () => go(Math.max(n - 1, 1));

  const progress = (n / total) * 100;

  const submitRef = useRef(null);

  const handleContinue = () => {
    if (submitRef.current) {
      submitRef.current();
    } else {
      if (n < total) next();
    }
  };

  const body = useMemo(() => {
    const setSubmitter = (fn) => (submitRef.current = fn);
    switch (n) {
      case 1:
        return (
          <Step1
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 2:
        return (
          <Step2
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 3:
        return (
          <Step3
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 4:
        return (
          <Step4
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 5:
        return (
          <Step5
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 6:
        return (
          <Step6
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
      case 7:
        return (
          <Step7
            formIncomplete={setFormIncomplete}
            setSubmitter={setSubmitter}
          />
        );
      default:
        return (
          <Step1
            formIncomplete={setFormIncomplete}
            onNext={next}
            setSubmitter={setSubmitter}
          />
        );
    }
  }, [n]);

  return (
    <>
      <section className="lg:h-full flex flex-col justify-start gap-5 lg:gap-0 lg:justify-between  p-5 pt-0 pb-[45%]  lg:p-[4.2vh] ">
        <div className="flex flex-col gap-5 lg:gap-[2.1vh] sticky top-0 pt-5 lg:pt-0 bg-white z-[10]">
          {!isDesktop && (
            <div className="flex items-center justify-between ">
              <img src={logo} alt="Blockforgex" className="h-11" />

              {fullName && n > 1 && (
                <div className="flex items-center gap-2">
                  <Avatar size={28} className="rf-avatar-initials">
                    {initials}
                  </Avatar>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Text className="!text-sm lg:!text-[2.4vh] !font-medium  tracking-[0.4vh] text-center !text-[#4F46E5]">
              STEP {n} OF {total}
            </Text>

            {fullName && n > 1 && isDesktop && (
              <div className="flex items-center gap-2">
                <Avatar
                  size={28}
                  className="rf-avatar-initials lg:!text-[1.6vh]"
                >
                  {initials}
                </Avatar>
                <Text className="text-gray-600 lg:!text-[1.6vh]">
                  {fullName}
                </Text>
              </div>
            )}
          </div>

          <div className=" h-0.5 w-full bg-gray-200 rounded">
            <div
              className="h-0.5 bg-indigo-600 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {leftMeta && !isDesktop && (
          <div className="lg:hidden ">
            <h2 className="text-xl text-[#1F2937] !font-semibold">
              {leftMeta.title}
            </h2>
            {!!leftMeta.desc && (
              <p className="text-[#999999] text-sm mt-2">{leftMeta.desc}</p>
            )}
          </div>
        )}

        <div className="h-auto lg:h-[66vh] lg:!-mt-[1vh]">{body}</div>
        <div className="hidden lg:block ">
          <div
            className={`flex flex-col-reverse gap-3 lg:flex-row lg:items-center ${
              n <= 1 ? "justify-end" : "lg:justify-between"
            } `}
          >
            <Button
              onClick={prev}
              className={`${
                n <= 1 ? "!hidden " : ""
              } w-full lg:w-[20vh] rf-btn-default !text-[1.7vh] !py-[2.1vh]`}
            >
              Back
            </Button>

            <Button
              type="primary"
              disabled={formInclomplete}
              onClick={handleContinue}
              className="w-full lg:w-[20vh] rf-btn-primary !text-[1.7vh] !py-[2.1vh]"
            >
              {n < total ? "Continue" : "Submit"}
            </Button>
          </div>
        </div>
      </section>
      <div className="block lg:hidden fixed w-full left-0 px-5 bottom-0 pb-5 pt-1 bg-white z-10">
        <div
          className={`flex flex-col-reverse gap-3 lg:flex-row lg:items-center ${
            n <= 1 ? "justify-end" : "lg:justify-between"
          } `}
        >
          <Button
            onClick={prev}
            className={`${
              n <= 1 ? "!hidden " : ""
            } w-full lg:w-50 rf-btn-default`}
          >
            Back
          </Button>

          <Button
            type="primary"
            disabled={formInclomplete}
            onClick={handleContinue}
            className="w-full lg:w-50 rf-btn-primary"
          >
            {n < total ? "Continue" : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
}
