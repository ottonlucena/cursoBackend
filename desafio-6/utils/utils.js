const moment = require("moment");

const formatMessage = (id, email, text) => {
  return {
    id,
    email,
    text,
    time: moment().format("DD/MM/YYYY - HH:mm"),
  };
};

module.exports = {
  formatMessage,
};
