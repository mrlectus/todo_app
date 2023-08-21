const Loading = () => {
  return (
    <div
      className="border-b-transparent animate-spin border-2 w-5 h-5 border-white rounded-full"
      role="status"
    ></div>
  );
};

export const Button = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: number;
  }) => {
  return <button {...props}>{props?.loading ? <Loading /> : children}</button>;
};
