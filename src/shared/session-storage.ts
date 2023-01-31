export function getSmartclientToken (): string {
  const erpToken = sessionStorage.getItem('ERPTOKEN')
  const token = erpToken ? JSON.parse(erpToken).access_token : ''
  return token
}
