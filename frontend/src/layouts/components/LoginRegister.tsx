import { useState } from "react";
import {
  faArrowRightToBracket,
  faCircleQuestion,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Box } from "@mui/material";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import CollHeader from "../../components/CollHeader";
import Button from "../../components/Button";
import LoginUser from "../../components/LoginUser";
import RegisterUser from "../../components/RegisterUser";

export default function LoginRegister() {
  const [open, setOpen] = useState(false);
  const [typeLogin, setTypeLogin] = useState(true);

  const handleTypeLogin = () => {
    setTypeLogin(!typeLogin);
  };
  // Mở Modal
  const handleOpen = () => setOpen(true);
  // Đóng Modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tippy
        placement="bottom"
        theme="light"
        interactive={true}
        content={
          <div className="w-[320px] max-w-[400px] ">
            <div className="p-5">
              <span className="text-lg font-medium text-black">
                Xin chào, vui lòng đăng nhập.
              </span>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    handleOpen();
                    handleTypeLogin();
                  }}
                  className="flex items-center justify-center min-w-[120px] min-h-[30px] px-4 py-2 text-white bg-black border border-black rounded-md font-medium cursor-pointer transition-all hover:bg-gray-800"
                >
                  Đăng nhập
                </button>

                <button
                  onClick={() => {
                    handleOpen();
                    handleTypeLogin();
                  }}
                  className="flex items-center justify-center min-w-[120px] min-h-[30px] px-4 py-2 text-black bg-white border border-black rounded-md font-medium cursor-pointer transition-all hover:bg-gray-100"
                >
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border-t border-gray-200">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-gray-500"
              />
              <span className="text-gray-600 text-sm cursor-pointer hover:text-black">
                Trợ giúp
              </span>
            </div>
          </div>
        }
      >
        <div>
          <CollHeader
            titleArray={["Đăng nhập"]}
            icon={faArrowRightToBracket}
            color="#BE1529"
            sizeIcon="18"
          />
        </div>
      </Tippy>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            minWidth: 500,
            minHeight: 400,
          }}
        >
          <div className="pb-[16px]">
            <div className="p-[24px] flex justify-between items-center border-b border-[#E0E0E0]">
              <h4 className="text-[16px] font-[600]">
                ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN
              </h4>
              <div onClick={handleClose}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size="2x"
                  className="opacity-[.6] cursor-pointer hover:opacity-100"
                />
              </div>
            </div>
            <div>
              <div>{typeLogin ? <LoginUser /> : <RegisterUser />}</div>
              <div>
                <div className="flex justify-center items-center mt-4 my-[24px]">
                  <span>hoặc đăng nhập bằng</span>
                </div>
                <div className="flex gap-2 mt-4 justify-between px-[12px] mb-[24px]">
                  <Button color="#DF4A32" className="w-[50%]">
                    <FontAwesomeIcon icon={faGoogle} />
                    <span className="ml-2">Google</span>
                  </Button>
                  <Button color="#3B5998" className="w-[50%]">
                    <FontAwesomeIcon icon={faFacebookF} />
                    <span className="ml-2">Facebook</span>
                  </Button>
                </div>
                <div className="text-center flex justify-center cursor-pointer">
                  Bạn chưa có tài khoản?
                  <div className="text-blue-500" onClick={handleTypeLogin}>
                    Đăng ký ngay!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
