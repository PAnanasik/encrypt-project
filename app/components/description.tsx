type DescriptionProps = {
  children: React.ReactNode;
};

const Description = ({ children }: DescriptionProps) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export default Description;
