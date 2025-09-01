import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { upsert } from "../../store/appSlice";
import { selectApp } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validation } from "../../utils/validationForm";

export default function Step7({ formIncomplete, setSubmitter }) {
  const dispatch = useDispatch();
  const app = useSelector(selectApp);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    validation(7, form.getFieldValue(), formIncomplete);
    setSubmitter?.(form.submit);
    return () => setSubmitter?.(null);
  }, [form, setSubmitter]);

  const onFinish = (values) => {
    dispatch(
      upsert({
        linkedin: values.linkedin,
        github: values?.github ?? "",
        customLink: values?.customLink ?? "",
      })
    );
    navigate("/apply/video");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      onValuesChange={(_, allValues) =>
        validation(7, allValues, formIncomplete)
      }
      initialValues={{
        linkedin: app.linkedin || "",
        github: app.github || "",
        customLink: app.customLink || "",
      }}
      className="[&_.ant-form-item-label>label]:font-medium [&_.ant-form-item]:mb-4 [&_.ant-form-item]:last:mb-0 lg:[&_.ant-input]:!text-[1.65vh] lg:[&_.ant-form-item-label>label]:!text-[1.68vh]"
    >
      <Form.Item
        label={
          <span>
            LinkedIn Profile <span style={{ color: "red" }}>*</span>
          </span>
        }
        name="linkedin"
        rules={[
          { required: true, message: "LinkedIn Profile is required" },
          { type: "url", message: "Invalid URL" },
        ]}
      >
        <Input
          className="rf-input"
          placeholder="https://linkedin.com/in/username"
        />
      </Form.Item>

      <Form.Item
        label="Github / Gitlab / Bitbucket URL"
        name="github"
        rules={[
          {
            required: false,
            message: "Github / Gitlab / Bitbucket URL is required",
          },
          { type: "url", message: "Invalid URL" },
        ]}
      >
        <Input
          className="rf-input"
          placeholder="https://github.com/your-profile"
        />
      </Form.Item>

      <Form.Item
        label="Custom Link"
        name="customLink"
        rules={[
          { required: false, message: "Custom Link is required" },
          { type: "url", message: "Invalid URL" },
        ]}
      >
        <Input className="rf-input" placeholder="https://your-website.com" />
      </Form.Item>
    </Form>
  );
}
