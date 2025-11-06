import { FC } from 'react'

interface IProps {
  title: string
  description: string
  icon: React.ReactNode
}
const EmailFeaturePointComponent: FC<Readonly<IProps>> = (props) => {
  const { title, description, icon } = props

  return (
    <div className='flex items-start gap-3'>
      <div className='bg-primary/10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg'>{icon}</div>
      <div>
        <h4 className='mb-1 text-sm font-medium'>{title}</h4>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </div>
    </div>
  )
}

export default EmailFeaturePointComponent
