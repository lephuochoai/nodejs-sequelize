const errors = {
  notFound: (id) => `Get with id: ${id} does not exist`,
  getDBerror:
    (id, stack) => `Error getting with id: ${id}, stack: ${stack}`,
  createDBerror: (data) => `Error when creating: ${data}`,
};

const actions = {
  get: (id) => `Getting with ${id}`,
  found: (data) => `Founded - ${JSON.stringify(data)}`,
};

export {
  errors, actions,
};
