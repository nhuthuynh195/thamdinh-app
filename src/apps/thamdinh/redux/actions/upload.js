import apiConfigs from "@core/configs/api";

export function uploadPhoto(
  files,
  type,
  personId,
  contractId = null,
  longitude,
  latitude,
  isGetDocument = true,
  clientId = "",
  clientype = ""
) {
  return {
    type: "UPLOAD_PHOTO",
    method: "POST",
    api: `${apiConfigs.BASE_API}documents/upload_document`,
    token: true,
    media: files,
    body: {
      document_kind: type,
      person_id: personId,
      contract_id: contractId,
      current_longitude: longitude,
      current_latitude: latitude,
    },
    isGetDocument,
    clientId,
    clientype,
  };
}

export function uploadAudio(body, path, showAlert = false) {
  return {
    type: "UPLOAD_AUDIO",
    method: "POST",
    api: `${apiConfigs.BASE_API}documents/upload_document`,
    token: true,
    media: path,
    body,
    showAlert,
  };
}
