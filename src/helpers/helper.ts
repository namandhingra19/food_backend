export function generateAddress(address: any) {
  return `${address.houseNo},${address.street},${address.locality},${address.nearestLocation}, ${address.district}, ${address.state}, ${address.pincode}`;
}
