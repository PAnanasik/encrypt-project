"use client";

import { useState, createContext, useContext } from "react";

type FormDataType = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export const FormDataContext = createContext<FormDataType | null>(null);

export default function FormDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<any>(null);

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
