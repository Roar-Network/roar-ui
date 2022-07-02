import { pki, util, mgf, md } from "node-forge";
import * as fs from "fs";

const pk = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyiZht8PYKDNR0VNQKzmBD1s44\nBSsEKTjQyyoFZFZqU0oGmpP3ht6wqVMV1VCyCNf9E3s3tzNgD5IkDg6wDC4rculc\nx2yQ7GsfSnU49/+yu2WoBF5JHzDcsWEJe9KmeNTp988JxeBjxtmORGLCfFLYDxiO\nU7VVPCo98nm16PkSmQIDAQAB\n-----END PUBLIC KEY-----';
export default function encrypt(message: string) {
  const publicKey = pki.publicKeyFromPem(pk);
  const encrypted = publicKey.encrypt(message, 'RSA-OAEP', {
    md: md.sha256.create(),
    mgf1: mgf.mgf1.create(md.sha256.create()),
    label: '',
  });
  return util.encode64(encrypted);
}
