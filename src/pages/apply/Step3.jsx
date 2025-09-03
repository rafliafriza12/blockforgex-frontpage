import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { validation } from "../../utils/validationForm";

const COUNTRIES = [
  {
    value: "ID",
    label: (
      <div className="flex items-center gap-2 lg:text-[1.68vh]">
        <span>🇮🇩</span>
        <span>Indonesia</span>
      </div>
    ),
  },
];

const STATES_BY_COUNTRY = {
  ID: [
    {
      value: "Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Jakarta</span>
        </div>
      ),
    },
    {
      value: "West Java",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>West Java</span>
        </div>
      ),
    },
    {
      value: "Bali",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Bali</span>
        </div>
      ),
    },
  ],
};

const CITIES_BY_STATE = {
  Jakarta: [
    {
      value: "South Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>South Jakarta</span>
        </div>
      ),
    },
    {
      value: "Central Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Central Jakarta</span>
        </div>
      ),
    },
    {
      value: "East Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>East Jakarta</span>
        </div>
      ),
    },
    {
      value: "West Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>West Jakarta</span>
        </div>
      ),
    },
    {
      value: "North Jakarta",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>North Jakarta</span>
        </div>
      ),
    },
  ],
  "West Java": [
    {
      value: "Bandung",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Bandung</span>
        </div>
      ),
    },
    {
      value: "Bekasi",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Bekasi</span>
        </div>
      ),
    },
    {
      value: "Bogor",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Bogor</span>
        </div>
      ),
    },
    {
      value: "Depok",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Depok</span>
        </div>
      ),
    },
  ],
  Bali: [
    {
      value: "Denpasar",
      label: (
        <div className="lg:text-[1.68vh]">
          <span>Denpasar</span>
        </div>
      ),
    },
  ],
};

const SELECT_CX = [
  "rf-select",
  "[&_.ant-select-selector]:!py-8",
  "[&_.ant-select-selector]:!px-4",
  "[&_.ant-select-selector]:!h-auto",
  "[&_.ant-select-selector]:flex",
  "[&_.ant-select-selector]:items-center",
  "[&_.ant-select-selection-item]:leading-none",
  "[&_.ant-select-selection-placeholder]:leading-none",
  "[&_.ant-select-arrow]:!top-[calc(100%+7px)]",
  "[&_.ant-select-arrow]:!transform",
  "[&_.ant-select-arrow]:!-translate-y-1/2",
].join(" ");

export default function Step3({ formIncomplete, onNext, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [form] = Form.useForm();

  // cek validasi pertama kali saat mount
  useEffect(() => {
    validation(3, form.getFieldsValue(), formIncomplete);
    setSubmitter?.(form.submit);

    return () => setSubmitter?.(null);
  }, [form, setSubmitter]);

  // handle submit form
  const onFinish = (values) => {
    dispatch(upsert(values));
    onNext?.();
  };

  // handle perubahan field form
  const onValuesChange = (changedValues) => {
    if ("country" in changedValues) {
      form.setFieldsValue({ state: undefined, city: undefined });
    } else if ("state" in changedValues) {
      form.setFieldsValue({ city: undefined });
    }

    validation(3, form.getFieldValue(), formIncomplete);
  };

  // ambil daftar state & city sesuai pilihan
  const states =
    STATES_BY_COUNTRY[form.getFieldValue("country") || app.country || "ID"] ??
    [];

  const cities =
    CITIES_BY_STATE[form.getFieldValue("state") || app.state || "Jakarta"] ??
    [];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      requiredMark={false}
      className="[&_.ant-form-item-label>label]:font-medium [&_.ant-form-item] lg:[&_.ant-form-item-label>label]:!text-[1.68vh]"
      initialValues={{
        country: app.country ?? "ID",
        state: app.state ?? "Jakarta",
        city: app.city ?? "South Jakarta",
      }}
    >
      <div className="space-y-4">
        <Form.Item
          label="Country"
          name="country"
          className="mb-5 lg:!mb-[4vh] lg:[&_.ant-form-item-explain-error]:!text-sm lg:[&_.ant-select-selector]:!text-[1.6vh] lg:[&_.ant-select-selection-item]:!text-[1.6vh] lg:[&_.ant-select-dropdown .ant-select-item]:!text-[1.6vh] lg:[&_.ant-select-dropdown .ant-select-item-option-content]:!text-[1.6vh]"
          rules={[{ required: true, message: "Please select your country" }]}
        >
          <Select
            className={SELECT_CX}
            options={COUNTRIES}
            classNames=""
            suffixIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 lg:w-[2vh] lg:h-[2vh] text-[#1F2937]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
            dropdownMatchSelectWidth
          />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          className="mb-5 lg:!mb-[4vh] lg:[&_.ant-form-item-explain-error]:!text-sm lg:[&_.ant-select-selector]:!text-[1.6vh] lg:[&_.ant-select-selection-item]:!text-[1.6vh] lg:[&_.ant-select-selection-placeholder]:!text-[1.6vh]"
          rules={[{ required: true, message: "Please select your state" }]}
        >
          <Select
            className={SELECT_CX}
            options={states}
            suffixIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 lg:w-[2vh] lg:h-[2vh] text-[#1F2937]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
            dropdownMatchSelectWidth
          />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          className="mb-5 lg:[&_.ant-form-item-explain-error]:!text-sm lg:[&_.ant-select-selector]:!text-[1.6vh] lg:[&_.ant-select-selection-item]:!text-[1.6vh] lg:[&_.ant-select-selection-placeholder]:!text-[1.6vh]"
          rules={[{ required: true, message: "Please select your city" }]}
        >
          <Select
            className={SELECT_CX}
            options={cities}
            suffixIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 lg:w-[2vh] lg:h-[2vh] text-[#1F2937]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
            dropdownMatchSelectWidth
          />
        </Form.Item>
      </div>
    </Form>
  );
}
