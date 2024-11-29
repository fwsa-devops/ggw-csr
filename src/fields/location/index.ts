import { GroupField, JSONField, NumberField, PointField, RowField, TextField } from 'payload'

type Location = () => GroupField

export const LocationField: Location = () => {
  const locationJson: JSONField = {
    type: 'json',
    name: 'locationJson',
    required: true,
    admin: {
      hidden: true,
    },
  }

  const addressField: TextField = {
    type: 'text',
    name: 'address',
    required: true,
  }

  const latitudeField: NumberField = {
    type: 'number',
    name: 'latitude',
    required: true,
    admin: {
      width: '50%',
    },
  }

  const longitudeField: NumberField = {
    type: 'number',
    name: 'longitude',
    required: true,
    admin: {
      width: '50%',
    },
  }

  const coordinateField: RowField = {
    type: 'row',
    fields: [latitudeField, longitudeField],
    admin: {
      hidden: true,
    },
  }

  const searchField: TextField = {
    type: 'text',
    name: 'search',
    required: false,
    admin: {
      components: {
        Field: {
          path: '@/fields/location/locationComponent#LocationComponent',
          clientProps: {
            addressFieldPath: addressField.name,
            latitudeFieldPath: latitudeField.name,
            longitudeFieldPath: longitudeField.name,
            locationJsonFieldPath: locationJson.name,
          },
        },
      },
    },
  }

  const finalField: GroupField = {
    type: 'group',
    name: 'location',
    fields: [searchField, addressField, coordinateField, locationJson],
    hooks: {
      // TODO: add before Change hook
      beforeChange: [],
    },
  }

  return finalField
}
