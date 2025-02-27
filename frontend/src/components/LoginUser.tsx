import Button from "./Button";
export default function LoginUser() {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="email"
        className="p-[10px] mx-[16px] mt-[16px] border border-gray-500"
      />
      <input
        type="password"
        placeholder="password"
        className="p-[10px] mx-[16px] mb-[16px] border border-gray-500"
      />
      <Button color="#E30019" className="mx-[60px] h-[50px]">
        Login
      </Button>
    </div>
  );
}
