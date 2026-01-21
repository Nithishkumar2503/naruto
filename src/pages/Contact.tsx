import { useState } from "react";
import {
  FormError,
  FormWrapper,
  InputText,
  Loading,
  MultiLineInput,
  SubmitButton,
} from "../components";

// ✅ Regular Expressions
export const regex = {
  name: /^[A-Za-z\s]{3,30}$/, // only letters and spaces, 3-30 chars
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email pattern
  phone: /^[6-9]\d{9}$/, // 10-digit Indian mobile numbers (starting 6–9)
  message: /^.{10,500}$/, // at least 10 chars
};

export const validateField = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (!regex.name.test(value)) return "Enter a valid name (3–30 letters)";
      break;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!regex.email.test(value)) return "Enter a valid email address";
      break;
    case "phone":
      if (!value.trim()) return "Phone number is required";
      if (!regex.phone.test(value))
        return "Enter a valid 10-digit phone number";
      break;
    case "message":
      if (!value.trim()) return "Message is required";
      if (!regex.message.test(value))
        return "Message must be at least 10 characters";
      break;
    default:
      break;
  }
  return "";
};

const contact = () => {
  interface FormProps {
    name?: string;
    email?: string;
    phone?: string;
    fromLocation?: string;
    destiny?: string;
    message?: string;
    subject?: string;
  }

  const [formData, setFormData] = useState<FormProps>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setApiErrorMessage("");
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField("name", formData?.name || ""),
      email: validateField("email", formData?.email || ""),
      phone: validateField("phone", formData?.phone || ""),
      message: validateField("message", formData?.message || ""),
    };

    setErrors(newErrors);
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      setLoading(false);
      return; // Stop if validation fails
    }

    // ✅ If validation passes, send API request
    try {
      const response = await fetch(`/api/send-mail.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setApiErrorMessage("Email sent successfully!");
        setTimeout(() => {
          setApiErrorMessage("");
        }, 2000);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setApiErrorMessage("Email failed to send.");
        console.log("errors");
      }
    } catch (error) {
      console.error("Error:", error);
      setApiErrorMessage("An error occurred. Try again.");
    } finally {
      setLoading(false);
      setApiErrorMessage("");
    }
  };
  return (
    <div className="lg:w-1/2 w-screen h-full mx-auto">
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className="lg:w-full  mx-auto">
        <h1 className="text-2xl text-center text-white font-semibold p-2">
          Contact us
        </h1>
        <FormError error={apiErrorMessage}></FormError>
        <FormWrapper
          child={
            <InputText
              error={errors?.name}
              placeholder="Nithish kumar"
              onDispatch={(val) => {
                setFormData((prev) => ({ ...prev, name: val }));
              }}
              value={formData?.name}
              label="Name"
              name="name"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <InputText
              error={errors?.phone}
              placeholder="9876543210"
              onDispatch={(val) => {
                setFormData((prev) => ({
                  ...prev,
                  phone: val,
                }));
              }}
              value={formData?.phone}
              label="Phone"
              name="phone"
              textType="number"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <InputText
              error={errors?.email}
              placeholder="nithishkumar.shanmugam25@gmail.com"
              onDispatch={(val) => {
                setFormData((prev) => ({
                  ...prev,
                  email: val,
                }));
              }}
              name="email"
              value={formData?.email}
              label="Email"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <MultiLineInput
              placeholder="HI! 
Message...
              "
              onDispatch={(val) => {
                setFormData((prev) => ({
                  ...prev,
                  message: val,
                }));
              }}
              value={formData?.message}
              label="Message"
            />
          }
        ></FormWrapper>
        <div className="px-2 flex justify-end">
          <button>
            <SubmitButton classes="w-40" name="Done" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default contact;
