import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slice/authSlice";
import Dropdown from "@/components/Dropdown"; // import dropdown

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserDropdown({ user }: { user: any }) {
  const dispatch = useAppDispatch();

  const content = (
    <div className="py-1 bg-white shadow-lg rounded-md w-48">
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-700">{user.nameUser}</p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
      </div>
      <div className="py-1">
        <a
          href="/user/settings"
          className="block px-4 py-2 text-sm text-gray-700"
        >
          Cài đặt tài khoản
        </a>
        <button
          onClick={() => dispatch(logout())}
          className="w-full text-left px-4 py-2 text-sm text-red-500"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );

  const trigger = (
    <div className="flex items-center gap-2">
      <img
        src={user.profilePicture || "/default-avatar.png"}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover border"
      />
    </div>
  );

  return <Dropdown trigger={trigger} content={content} />;
}
