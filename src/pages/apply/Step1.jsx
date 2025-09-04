import { useState, useEffect } from "react";
import { Form, Input, Radio, Checkbox, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { JobSearchIcon, DashboardBrowsingIcon } from "hugeicons-react";
import { validation } from "../../utils/validationForm";

const { Text } = Typography;

export default function Step1({ formIncomplete, onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [form] = Form.useForm();

  // state: kontrol apakah flex-col (mobile / desktop kecil) atau row
  const [isCol, setIsCol] = useState(false);
  // state: kontrol apakah iPad Pro → row dengan width half
  const [isIPadPro, setIsIPadPro] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // ✅ cek viewport iPad Pro (portrait / landscape / devtools scaling)
      const ipadPro =
        (width >= 1020 && width <= 1100 && height >= 1360 && height <= 1380) ||
        (width === 1093 && height === 819) ||
        (width >= 1360 && width <= 1380 && height >= 1020 && height <= 1100);

      setIsIPadPro(ipadPro);

      if (ipadPro) {
        setIsCol(false); // iPad Pro → row
      } else if (width < 1024) {
        setIsCol(true); // mobile → col
      } else if (width >= 1024 && width <= 1279) {
        setIsCol(true); // desktop kecil non iPad → col
      } else {
        setIsCol(false); // default row
      }
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    validation(1, app, formIncomplete);
    setSubmitter?.(form.submit);
    return () => setSubmitter?.(null);
  }, [form, setSubmitter]);

  const onFinish = (values) => {
    dispatch(upsert(values));
    onNext();
  };

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields?.length) {
      form.scrollToField?.(errorFields[0].name);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
      onValuesChange={(_, allValues) =>
        validation(1, allValues, formIncomplete)
      }
      initialValues={{
        fullName: app.fullName,
        email: app.email,
        jobStatus: app.jobStatus ?? "active",
        consents: app.consents ?? [],
      }}
      className="[&_.ant-form-item-label>label]:font-medium lg:[&_.ant-form-item-label>label]:!text-[1.2vw] xl:[&_.ant-form-item-label>label]:!text-[1.68vh] !h-full flex flex-col lg:!gap-0 lg:justify-between lg:[&_.ant-input]:!text-[1.2vw] xl:[&_.ant-input]:!text-[1.65vh] lg:[&_.ant-input]:!h-[1.65vh] lg:[&_.ant-radio-button-wrapper]:!text-[1.65vh]"
    >
      {/* Full Name */}
      <Form.Item
        label="Full Name"
        name="fullName"
        className="lg:!mb-[1.1vh] xl:!mb-[2.1vh] lg:[&_.ant-form-item-explain-error]:!text-sm "
        rules={[{ required: true, message: "Full name is required" }]}
      >
        <Input className="rf-input relative z-[0]" placeholder="Zen Nakano" />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Email"
        name="email"
        className="lg:!mb-[1.1vh] xl:!mb-[2.1vh] lg:[&_.ant-form-item-explain-error]:!text-sm "
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email" },
        ]}
      >
        <Input
          className="rf-input relative z-[0]"
          placeholder="Enter your email..."
        />
      </Form.Item>

      {/* Job Status */}
      <Form.Item
        label="Job Search Status"
        name="jobStatus"
        className="lg:!mb-[1.1vh] xl:!mb-[2.1vh] lg:[&_.ant-form-item-explain-error]:!text-sm"
        rules={[{ required: true, message: "Please choose one" }]}
      >
        <Radio.Group className="rf-radio w-full relative z-[0] [&_.ant-radio-button-wrapper-checked]:!font-medium">
          <div
            className={`flex flex-wrap w-full gap-4 ${
              isCol ? "flex-col" : "flex-row"
            }`}
          >
            <Radio.Button
              value="active"
              className={`rf-pill !inline-flex !items-center !justify-center !gap-2 !h-auto !py-3 lg:!px-2 xl:!px-4 lg:!py-[12px] xl:!py-[2vh] !rounded-xl !whitespace-wrap !text-center ${
                isCol
                  ? "w-full"
                  : isIPadPro
                  ? "w-[calc(50%-8px)]"
                  : "w-[calc(50%-8px)]"
              }`}
            >
              <JobSearchIcon
                color="currentColor"
                className="align-middle w-5 h-5 xl:w-[2vh] xl:h-[2.4vh]"
              />
              <span className="text-base lg:text-[1.2vw] xl:text-[1.68vh]">
                Actively looking for a job.
              </span>
            </Radio.Button>

            <Radio.Button
              value="casual"
              className={`rf-pill !inline-flex !items-center !justify-center !gap-2 !h-auto !py-3 !px-4 lg:!py-[12px] xl:!py-[2vh] !rounded-xl !whitespace-wrap !text-center ${
                isCol
                  ? "w-full"
                  : isIPadPro
                  ? "w-[calc(50%-8px)]"
                  : "w-[calc(50%-8px)]"
              }`}
            >
              <DashboardBrowsingIcon
                size={20}
                color="currentColor"
                className="align-middle w-5 h-5 xl:w-[2vh] xl:h-[2.4vh]"
              />
              <span className="text-base lg:text-[1.2vw] xl:text-[1.68vh]">
                Casually browsing.
              </span>
            </Radio.Button>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* Consent */}
      <Card
        variant="borderless"
        className="rounded-xl bg-gray-50/70 lg:border lg:border-gray-200 [&_.ant-card-body]:!p-0 lg:[&_.ant-card-body]:!p-[2.1vh]"
      >
        <Text className="text-[#4B5563] font-medium lg:!text-[1.4vw] xl:!text-[1.8vh] ">
          For evaluation and communication purposes in line with privacy policy
          and cookie policy, I consent to:
        </Text>
        <Form.Item
          name="consents"
          className="lg:[&_.ant-form-item-explain-error]:!text-sm !mt-4 lg:!mt-[1vh]"
          rules={[
            {
              type: "array",
              required: true,
              min: 1,
              message: "Please choose at least one",
            },
          ]}
        >
          <Checkbox.Group className="grid gap-3 lg:gap-[0.8vh] [&_.ant-checkbox-inner]:!w-[2vh] [&_.ant-checkbox-inner]:!h-[2vh] [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-[#4F46E5] [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-[#4F46E5] [&_.ant-checkbox-checked_.ant-checkbox-inner::after]:!border-[#ffffff]">
            <Checkbox value="data">
              <span className="text-sm xl:text-[1.5vh]">
                The processing and storing of my submitted personal data.
              </span>
            </Checkbox>
            <Checkbox value="tools">
              <span className="text-sm xl:text-[1.5vh]">
                The use of call recording, note-taking tools, and external
                assessment tools.
              </span>
            </Checkbox>
            <Checkbox value="cookies">
              <span className="text-sm xl:text-[1.5vh]">
                The use of cookies to improve functionality, enchange
                experience, and analyze site usage
              </span>
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Card>
    </Form>
  );
}
