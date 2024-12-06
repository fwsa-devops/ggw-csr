'use client'

import { FieldLabel, useAllFormFields, useField } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'
import React, { useCallback, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'
import { extractAddress } from './hooks/populateAddress'

type LocationComponentProps = {
  addressFieldPath: string
  latitudeFieldPath: string
  longitudeFieldPath: string
  locationJsonFieldPath: string
} & TextFieldClientProps

export const LocationComponent: React.FC<LocationComponentProps> = (props) => {
  const {
    field,
    path,
    addressFieldPath: addressFieldPathFromProps,
    latitudeFieldPath: latitudeFieldPathFromProps,
    longitudeFieldPath: longitudeFieldPathFromProps,
    locationJsonFieldPath: locationJsonFieldPathFromProps,
  } = props

  const { label } = field

  const addressFieldPath = `${'location'}.${addressFieldPathFromProps}`
  const latitudeFieldPath = `${'location'}.${latitudeFieldPathFromProps}`
  const longitudeFieldPath = `${'location'}.${longitudeFieldPathFromProps}`
  const locationJsonFieldPath = `${'location'}.${locationJsonFieldPathFromProps}`

  const [fields, dispatchFields] = useAllFormFields()

  const addressField = useField<JSON>({ path: addressFieldPath })
  const latitudeField = useField<number>({ path: latitudeFieldPath })
  const longitudeField = useField<number>({ path: longitudeFieldPath })
  const locationJsonField = useField<JSON>({ path: locationJsonFieldPath })

  const {
    ready,
    setValue: setLocationValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const promiseOptions = async (input: string) => {
    setLocationValue(input)
    if (data) return data.map((_l) => ({ label: _l.description, value: _l.place_id }))
    return []
  }

  const onChangeHandler = useCallback(
    async (e) => {
      const value = e?.value
      const details = (await getDetails({ placeId: value })) as google.maps.places.PlaceResult

      const locationJson = {
        placeId: value,
        name: details.name,
        address_components: details.address_components,
        formatted_address: details.formatted_address,
        coordinates: {
          lat: details.geometry?.location?.lat(),
          lng: details.geometry?.location?.lat(),
        },
      }

      const extracted_address = extractAddress(details.address_components!)

      for (const key in extracted_address) {
        if (Object.prototype.hasOwnProperty.call(extracted_address, key)) {
          fields[`location.address.${key}`].value = extracted_address[key]
        }
      }

      addressField.setValue(extracted_address)
      latitudeField.setValue(locationJson.coordinates.lat)
      longitudeField.setValue(locationJson.coordinates.lng)
      locationJsonField.setValue(locationJson)
    },
    [addressField, latitudeField, longitudeField, locationJsonField, fields],
  )

  return (
    <>
      <div className="field-type slug-field-component">
        <div className="label-wrapper">
          <FieldLabel htmlFor={`field-${path}`} label={label} />
        </div>

        <div suppressHydrationWarning>
          <AsyncSelect
            isDisabled={!ready}
            cacheOptions
            defaultValue={addressField.value}
            loadOptions={promiseOptions}
            className="field-type"
            classNamePrefix="rs"
            onChange={onChangeHandler}
            onMenuClose={() => clearSuggestions()}
            styles={{
              container: (provider, state) => ({
                ...provider,
                backgroundColor: 'var(--theme-input-bg)',
                color: 'var(--theme-text)',
              }),
              group: (provided, state) => ({
                backgroundColor: 'var(--theme-input-bg)',
              }),
              control: (provider, state) => ({
                ...provider,
                backgroundColor: 'var(--theme-input-bg)',
                color: 'var(--theme-elevation-800)',
                border: '1px solid var(--theme-elevation-150)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: 'var(--theme-input-bg)',
                color: 'var(--theme-text)',
              }),
              input: (provided, state) => ({
                ...provided,
                color: 'var(--theme-text)',
              }),
              singleValue: (provided, state) => ({
                ...provided,
                color: 'var(--theme-text)',
              }),
            }}
          />
        </div>
      </div>
    </>
  )
}
