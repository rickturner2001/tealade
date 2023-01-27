import React from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillLazy = dynamic(() => import("react-quill"), {
  ssr: false,
});

const QuillEditor = (props: Props) => {
  return <QuillLazy className="relative w-full" theme="snow" {...props} />;
};
type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default QuillEditor;
