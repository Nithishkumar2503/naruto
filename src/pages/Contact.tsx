import { useState } from "react";
import { FormWrapper, InputText, SubmitButton } from "../components";
import handleContactForm from "../api/page-api/contact";

interface FormProps {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const contact = () => {
  const [form, setForm] = useState<FormProps>({});
  return (
    <div className="lg:w-1/2 w-screen h-full mx-auto ">
      <form action="" className="lg:w-full  mx-auto">
        <h1 className="text-2xl text-center text-gray-500 font-semibold p-2">
          Contact us
        </h1>
        <FormWrapper
          child={
            <InputText
              onDispatch={(val) => {
                setForm((prev) => ({ ...prev, name: val }));
              }}
              value={form?.name}
              label="Name"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <InputText
              onDispatch={(val) => {
                setForm((prev) => ({
                  ...prev,
                  phone: val,
                }));
              }}
              value={form?.phone}
              label="Phone"
              textType="number"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <InputText
              onDispatch={(val) => {
                setForm((prev) => ({
                  ...prev,
                  email: val,
                }));
              }}
              value={form?.email}
              label="Email"
            />
          }
        ></FormWrapper>
        <FormWrapper
          child={
            <InputText
              onDispatch={(val) => {
                setForm((prev) => ({
                  ...prev,
                  message: val,
                }));
              }}
              value={form?.message}
              label="Message"
            />
          }
        ></FormWrapper>
        <div className="px-2 flex justify-end">
        <SubmitButton onClick={()=>handleContactForm(form)} classes="w-40" name="Done"/>
        </div>
      </form>
    </div>
  );
};

export default contact;
