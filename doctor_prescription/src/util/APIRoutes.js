const currentURL = window.location.origin; // Get the current URL
const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

export const host = `${serverAddress}`;
export const registerRoute = `${host}/users/register`;
export const loginRoute = `${host}/users/login`;
export const setAvatarRoute = `${host}/users/setAvatar`;
export const allUsersRoute = `${host}/users/allUsers`;
export const logoutRoute = `${host}/users/logout`;
export const sendMessageRoute = `${host}/messages/addmsg`;
export const getAllMessagesRoute = `${host}/messages/getmsg`;