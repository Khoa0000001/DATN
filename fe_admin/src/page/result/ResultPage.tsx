import React from "react";
import { Button, Result } from "antd";
import { ResultForm } from "./constant";

const ResultPage: React.FC<{ result: ResultForm }> = ({ result }) => (
  <Result
    status={
      result.status as
        | "success"
        | "error"
        | "info"
        | "warning"
        | "404"
        | "403"
        | "500"
    }
    title={result.title}
    subTitle={result.subTitle}
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default ResultPage;
