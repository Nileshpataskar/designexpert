import axios from "axios";
import services from "./services";

export async function getRequest(url) {
  const auth_key = await services.getData("token");
  console.log("Tokenn", auth_key);

  try {
    const response = await axios.get(`${process.env.API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth_key}`,
      },
    });
    return response;
  } catch (error) {
    throw error?.response;
  }
}

export async function getRequest_image(url) {
  const auth_key = await services.getData("token");

  try {
    const response = await axios.get(`${process.env.API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth_key}`,
        Accept: "*/*",
      },
      responseType: "blob", // Ensure the response is treated as a blob
    });

    console.log("GET REQUEST IMAGE RESPONSE DATA", response.data);
    const blob = response.data;
    const blobUrl = URL.createObjectURL(blob);

    console.log("GET REQUEST IMAGE RESPONSE BLOB IMAGE1 ", blob);
    console.log("GET REQUEST IMAGE RESPONSE BLOB IMAGE 2 ", blobUrl);

    // Infer the file extension from the MIME type
    const mimeType = blob.type;
    let extension;
    switch (mimeType) {
      case "image/jpeg":
        extension = "jpg";
        break;
      case "image/jpeg":
        extension = "jpeg";
        break;
      case "image/png":
        extension = "png";
        break;
      case "application/pdf":
        extension = "pdf";
        break;
      // Add more cases as needed
      default:
        extension = "";
    }

    return { blobUrl, extension };
  } catch (error) {
    console.error("Error in GET REQUEST IMAGES:");
    throw error;
  }
}

export async function patchRequest(url, data) {
  const auth_key = await services.getData("token");

  try {
    const response = await axios.patch(`${process.env.API_URL}${url}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth_key}`,
      },
    });
    return response;
  } catch (error) {
    // console.log(error)
    // handleRedirect(error?.response?.status)
    throw error?.response;
  }
}

export async function postRequest(url, data) {
  const auth_key = await services.getData("token");

  try {
    const response = await axios.post(process.env.API_URL + url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth_key}`,
      },
    });
    return response;
  } catch (error) {
    // console.log(error)
    // handleRedirect(error?.response?.status)
    throw error?.response;
  }
}
export async function postRequestMultipart(url, data) {
  const auth_key = await services.getData("token");

  try {
    const response = await axios.post(process.env.API_URL + url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${auth_key}`,
      },
    });
    return response;
  } catch (error) {
    // console.log(error)
    // handleRedirect(error?.response?.status)
    throw error?.response;
  }
}
