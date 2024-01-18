// Get mailbox selected option : inbox, unread, sent, draft, trash

const getPath = (url) => {
  // console.log(url);
  return url.split('/')[2];
};

export default getPath;
