export function updateProfileLocal(profile) {
  return {
    type: "UPDATE_PROFILE_LOCAL",
    payload: profile
  };
}

export function printerId(id) {
  return {
    type: "PRINTER_ID",
    payload: id
  };
}
