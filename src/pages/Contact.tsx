import { useState } from "react";
import {
  FormWrapper,
  InputText,
  Loading,
  MultiLineInput,
  SubmitButton,
} from "../components";

// ✅ Regular Expressions
export const regex = {
  name: /^[A-Za-z\s]{3,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  message: /^.{10,500}$/,
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

const Contact = () => {
  interface FormProps {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    subject?: string;
  }

  const [formData, setFormData] = useState<FormProps>({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiMessage("");

    const newErrors = {
      name: validateField("name", formData?.name || ""),
      email: validateField("email", formData?.email || ""),
      phone: validateField("phone", formData?.phone || ""),
      message: validateField("message", formData?.message || ""),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      setLoading(false);
      return;
    }

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
        setIsSuccess(true);
        setApiMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setIsSuccess(false);
        setApiMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSuccess(false);
      setApiMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-4 py-10 md:px-6 lg:px-8">
      {loading && <Loading />}

      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center border-b border-white/10 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent p-8 lg:border-b-0 lg:border-r">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-orange-400">
              Contact
            </p>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Let’s connect with the shinobi world
            </h1>
            <p className="mt-4 max-w-md text-zinc-400 leading-7">
              Have feedback, suggestions, or want to share your favorite Naruto
              character? Send a message and get in touch through this form.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-sm font-semibold text-orange-300">
                  Quick response
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Usually best for feedback, ideas, and anime-related queries.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-sm font-semibold text-orange-300">
                  Fan-made platform
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Built for Naruto fans to explore characters, villages, clans,
                  and more.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Fill in your details and share your message below.
                </p>
              </div>

              {apiMessage && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    isSuccess
                      ? "border-green-500/30 bg-green-500/10 text-green-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {apiMessage}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <FormWrapper
                  child={
                    <InputText
                      error={errors?.name}
                      placeholder="Nithish Kumar"
                      onDispatch={(val) => {
                        setFormData((prev) => ({ ...prev, name: val }));
                      }}
                      value={formData?.name}
                      label="Name"
                      name="name"
                    />
                  }
                />

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
                />
              </div>

              <FormWrapper
                child={
                  <InputText
                    error={errors?.email}
                    placeholder="you@example.com"
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
              />

              <FormWrapper
                child={
                  <MultiLineInput
                    placeholder="Hi, I’d like to share feedback about the Naruto website..."
                    onDispatch={(val) => {
                      setFormData((prev) => ({
                        ...prev,
                        message: val,
                      }));
                    }}
                    value={formData?.message}
                    label="Message"
                    error={errors?.message}
                  />
                }
              />

              <div className="flex justify-end pt-2">
                <SubmitButton
                  classes="w-full md:w-44 rounded-xl"
                  name={loading ? "Sending..." : "Send Message"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;