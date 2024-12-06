import { FieldHook } from 'payload'

export const populateAddress: FieldHook = async ({ req: { payload }, originalDoc: doc }) => {
  const { locationJson } = doc.location

  if (locationJson) {
    const addressComponent = (locationJson as unknown[])[
      'address_components'
    ] as google.maps.GeocoderAddressComponent[]

    const address = extractAddress(addressComponent)
    doc.location.address = address
  }

  return doc
}

export function extractAddress(addressComponents: google.maps.GeocoderAddressComponent[]) {
  const address = {
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  }

  addressComponents.forEach((component) => {
    if (component.types.includes('premise')) {
      address.name += ` ${component.long_name}`
    }

    if (component.types.includes('street_number')) {
      address.street += ` ${component.long_name}`
    }

    if (component.types.includes('sublocality')) {
      address.street += `, ${component.long_name}`
    }

    if (component.types.includes('route')) {
      address.street += ` ${component.long_name}`
    }

    if (component.types.includes('locality')) {
      address.city = component.long_name
    }

    if (component.types.includes('administrative_area_level_1')) {
      address.state = component.long_name
    }

    if (component.types.includes('country')) {
      address.country = component.long_name
    }

    if (component.types.includes('postal_code')) {
      address.zip = component.long_name
    }
  })

  return address
}
