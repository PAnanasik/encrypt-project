type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="font-medium text-sm">
      {children}
    </label>
  );
};

export default Label;
