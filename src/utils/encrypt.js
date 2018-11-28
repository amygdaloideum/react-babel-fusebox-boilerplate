import JSEncrypt from 'jsencrypt';
import { getPublicKey } from '../services/paymentiq-service';

const encryptedPropertiesMap = {
  creditcardNumber: 'encCreditcardNumber',
  //cvv: 'encCvv',
};

let pkey = null;

export async function encrypt(value) {
  if(!pkey) {
    pkey = await getPublicKey();
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pkey);
  const encryptedVal = encrypt.encrypt(value)
  return encryptedVal;
}

export async function encryptFormData(values) {
  for (let value in values) {
    if(encryptedPropertiesMap[value]) {
      values[encryptedPropertiesMap[value]] = await encrypt(values[value]);
      delete values[value];
    }
  }
  return values;
}

