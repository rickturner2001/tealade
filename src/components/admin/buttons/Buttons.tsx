import Link from "next/link";

type ComponentSize = "sm" | "md" | "lg" | "xs";

export interface ButtonProps {
  label: string;
  handler?: () => void;
  size?: ComponentSize;
  children?: JSX.Element;
  isLight?: boolean;
  isRounded?: boolean;
  additionalStyles?: string;
  href?: string;
  textSize?: ComponentSize;
  isLabel?: boolean;
}

const getButtonClasses = (
  background: string,
  size?: ComponentSize,
  isRounded?: boolean,
  children?: JSX.Element,
  additionalStyles?: string,
  textSize?: ComponentSize
) => {
  return `${background} focus:ring-2  font-medium ${
    isRounded ? "rounded-md" : ""
  } ${
    size === "lg"
      ? "px-5 py-2.5"
      : size === "md"
      ? "px-3 py-1.5"
      : size === "sm"
      ? "px-2 py-1"
      : "px-1 py-0.5"
  } ${children ? "inline-flex justify-center items-center" : ""} ${
    additionalStyles ?? ""
  } ${
    textSize === "lg"
      ? "text-lg"
      : textSize === "sm"
      ? "text-sm"
      : textSize === "xs"
      ? "text-xs"
      : "text-base"
  }`;
};

const Button = ({
  label,
  size = "lg",
  textSize = "sm",
  background,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps & { background: string }) => {
  const className = getButtonClasses(
    background,
    size,
    isRounded,
    children,
    additionalStyles,
    textSize
  );

  if (isLabel) {
    return (
      <span onClick={handler} className={className + " block "}>
        {children}
        {label}
      </span>
    );
  }
  if (href) {
    return (
      <Link href={href} onClick={handler} className={className + " block "}>
        {children}
        {label}
      </Link>
    );
  }
  return (
    <button onClick={handler} className={className}>
      {children}
      {label}
    </button>
  );
};

export const ButtonPrimary = ({
  label,
  size = "lg",
  textSize = "sm",
  isLight,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps) => {
  const background = isLight
    ? "bg-primary-100 hover:bg-primary-200 text-primary-900 focus:ring-primary-300"
    : "bg-primary-400 hover:bg-primary-500 text-gray-900 focus:ring-primary-300";
  return (
    <Button
      background={background}
      label={label}
      size={size}
      textSize={textSize}
      handler={handler}
      isRounded={isRounded}
      additionalStyles={additionalStyles}
      isLabel={isLabel}
      href={href}
    >
      {children}
    </Button>
  );
};

export const ButtonSecondary = ({
  label,
  size = "lg",
  textSize = "sm",
  isLight,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps) => {
  const background = isLight
    ? "bg-secondary-100 hover:bg-secondary-200 text-secondary-900 focus:ring-secondary-300"
    : "bg-secondary-400 hover:bg-secondary-500 text-gray-900 focus:ring-secondary-300";
  return (
    <Button
      background={background}
      label={label}
      size={size}
      textSize={textSize}
      handler={handler}
      isRounded={isRounded}
      additionalStyles={additionalStyles}
      isLabel={isLabel}
      href={href}
    >
      {children}
    </Button>
  );
};

export const ButtonSupportPrimary = ({
  label,
  size = "lg",
  textSize = "sm",
  isLight,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps) => {
  const background = isLight
    ? `bg-support-primary-100 ${
        !isLabel && !href
          ? "hover:bg-support-primary-200 focus:ring-support-primary-300"
          : ""
      } text-support-primary-900`
    : `bg-support-primary-400 ${
        !isLabel && !href
          ? "hover:bg-support-primary-500 focus:ring-support-primary-300"
          : ""
      } text-white`;
  return (
    <Button
      background={background}
      label={label}
      size={size}
      textSize={textSize}
      handler={handler}
      isRounded={isRounded}
      additionalStyles={additionalStyles}
      isLabel={isLabel}
      href={href}
    >
      {children}
    </Button>
  );
};

export const ButtonSupportSecondary = ({
  label,
  size = "lg",
  textSize = "sm",
  isLight,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps) => {
  const background = isLight
    ? "bg-support-secondary-100 hover:bg-support-secondary-200 text-support-secondary-900 focus:ring-support-secondary-300"
    : "bg-support-secondary-400 hover:bg-support-secondary-500 text-white focus:ring-support-secondary-300";
  return (
    <Button
      background={background}
      label={label}
      size={size}
      textSize={textSize}
      handler={handler}
      isRounded={isRounded}
      additionalStyles={additionalStyles}
      isLabel={isLabel}
      href={href}
    >
      {children}
    </Button>
  );
};

export const ButtonNoBg = ({
  label,
  size = "lg",
  textSize = "sm",
  isLight,
  handler,
  isRounded,
  children,
  href,
  isLabel,
  additionalStyles,
}: ButtonProps) => {
  const background = "";

  return (
    <Button
      background={background}
      label={label}
      size={size}
      textSize={textSize}
      handler={handler}
      isRounded={isRounded}
      additionalStyles={additionalStyles}
      isLabel={isLabel}
      href={href}
    >
      {children}
    </Button>
  );
};
