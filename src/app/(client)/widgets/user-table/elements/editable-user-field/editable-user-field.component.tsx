'use client'

import { FC } from 'react'

import { Editable, EditableInput, EditablePreview, EditableSubmit } from '@/app/(client)/shared/ui'
import { authClient } from '@/pkg/integrations/better-auth/auth-client'
import { useRouter } from '@/pkg/libraries/locale'

interface IProps {
  defaultValue: string
  field: 'name'
  userId: string
}

const EditableUserFieldComponent: FC<Readonly<IProps>> = (props) => {
  const { defaultValue, field, userId } = props

  const router = useRouter()

  const handleSubmit = async (value: string) => {
    if (value === defaultValue) return

    switch (field) {
      case 'name':
        await authClient.admin.updateUser({
          userId,
          data: {
            name: value,
          },
        })
        break

      default:
        break
    }

    router.refresh()
  }

  return (
    <Editable onSubmit={handleSubmit} defaultValue={defaultValue} placeholder='Enter your text here'>
      <EditablePreview />

      <EditableInput />

      <EditableSubmit />
    </Editable>
  )
}

export default EditableUserFieldComponent
