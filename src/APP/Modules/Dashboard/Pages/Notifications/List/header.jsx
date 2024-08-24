const Header = ({ markAllRead, unreadCount }) => {
    return (
      <header className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            Notifications
          </h1>
          <span className="flex h-6 w-8 justify-center rounded-md bg-blue-900 font-bold text-white">
            {unreadCount}
          </span>
        </div>
  
        <button
          className="hover:text-bold focus:text-bold text-sm font-medium text-gray-600
          hover:text-blue-700
          focus:text-blue-500
        "
          aria-label="Mark all notifications as read"
          type="button"
          onClick={markAllRead}
        >
          Mark all as read
        </button>
      </header>
    );
  };
  
  export default Header;