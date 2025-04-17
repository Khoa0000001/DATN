import React from "react";
import { Button, Result } from "antd";
import { ResultForm } from "./constant";
import { useNavigate } from "react-router-dom";

const ResultPage: React.FC<{ result: ResultForm }> = ({ result }) => {
  const navigate = useNavigate();

  return (
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
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>
      }
    />
  );
};

export default ResultPage;
