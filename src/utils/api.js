import uuid from 'uuid/v4';
import { store } from '../store/index';
import { modalNames, ActionCreators as modalActionCreators } from '../store/modal/reducer';
import { ActionCreators as networkActionCreators } from '../store/network/reducer';

const getToken = () => localStorage.getItem('token');

async function handleResponse(response, bypass = false, ignoreModal = false) {
  if (!bypass && (response.status < 200 || response.status >= 300)) {
    if (!ignoreModal) {
      let errorResponse;
      try {
        const errorJson = await response.json();
        errorResponse = {
          ...errorJson,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        };
      } catch (err) {}
      store.dispatch(networkActionCreators.addError.create(errorResponse || response));
      store.dispatch(modalActionCreators.openModal.create(modalNames.errorModal));
    }
    throw response;
  }
}

async function callApi({
  method = 'GET', hasBody = false, url, body, options = {},
}) {
  const id = uuid();
  store.dispatch(networkActionCreators.addPendingRequest.create({ id, request: url }));
  const token = getToken();
  const response = await fetch(`/api/${url}`, {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(hasBody && { 'Content-Type': 'application/json' }),
    },
    ...(hasBody && { body: JSON.stringify(body) }),
  });
  store.dispatch(networkActionCreators.removePendingRequest.create(id));
  await handleResponse(response, options.bypass, options.ignoreModal);
  try {
    return await response.json();
  } catch (e) {
    return undefined;
  }
}

export const get = (url, options) => callApi({ url, options });
export const post = (url, body, options) =>
  callApi({
    method: 'POST',
    hasBody: true,
    url,
    body,
    options,
  });
export const put = (url, body, options) =>
  callApi({
    method: 'PUT',
    hasBody: true,
    url,
    body,
    options,
  });
export const patch = (url, body, options) =>
  callApi({
    method: 'PATCH',
    hasBody: true,
    url,
    body,
    options,
  });
export const destroy = (url, body, options) =>
  callApi({
    method: 'DELETE',
    url,
    body,
    options,
  });
