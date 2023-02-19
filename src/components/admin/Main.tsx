export default function Main({
  children,
  title,
}: {
  children?: JSX.Element;
  title: string;
}) {
  return (
    <main className="flex min-h-[91.6vh] w-full flex-col bg-blue-50 ">
      <div className="flex h-full w-full flex-col">
        <div className=" bg-gradient-to-r from-blue-700 to-blue-500 py-12 px-6 md:px-24">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        {children}
      </div>
    </main>
  );
}
