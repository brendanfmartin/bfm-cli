/**
 *
 * @param e
 */
exports.parseErrors = (e) => {
  if (e.response) {
    const { data, status } = e.response;
    console.error({ data, status });
  } else if (e.code === 'ENOTFOUND') {
    console.error(`${e.code}. Are you on VPN?`);
  } else {
    console.error(e.code);
  }
};
