export function Logout() {
  return {
    type: "APP_LOGOUT",
    payload: {}
  };
}

export function SetPrinterConnect(status = true) {
  return {
    type: "PRINTER_CONNECT",
    payload: status
  };
}
