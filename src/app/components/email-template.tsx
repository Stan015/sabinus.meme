import type { FC } from "react";

type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>{name}</h1>
    <h2>{email}</h2>
    <p>{message}</p>
  </div>
);
