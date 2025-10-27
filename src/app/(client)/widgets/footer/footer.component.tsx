import { type FC } from 'react'

import { Button, Input } from '@/app/(client)/shared/ui'
import { Link } from '@/pkg/libraries/locale'

interface IProps {}

const FooterComponent: FC<Readonly<IProps>> = async () => {
  return (
    <footer className='bg-background/95 supports-backdrop-filter:bg-background/60 border-t backdrop-blur'>
      <div className='container mx-auto px-4 py-8 lg:px-6'>
        <div className='flex flex-col justify-between gap-8 md:flex-row'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Logo</h3>

            <p className='text-muted-foreground text-sm'>Building amazing experiences with shadcn/ui</p>
          </div>

          <div className='flex flex-col justify-between gap-8 md:flex-row'>
            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>Quick Links</h4>

              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Home
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    About
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Services
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>Resources</h4>

              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Documentation
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link href='/' className='text-muted-foreground hover:text-foreground transition-colors'>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-sm font-semibold'>Stay Updated</h4>

              <p className='text-muted-foreground text-sm'>Subscribe to our newsletter for the latest updates.</p>

              <div className='flex flex-col justify-center gap-4 md:flex-row md:items-center'>
                <Input
                  type='email'
                  placeholder='Enter your email'
                  className='border-input bg-background focus:ring-ring flex-1 rounded-md border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none'
                />

                <Button size='sm' className='w-full shrink-0 md:w-auto'>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='border-border mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <p className='text-muted-foreground text-sm'>© 2025 Your Brand. All rights reserved.</p>

            <div className='flex space-x-4'>
              <Button variant='ghost' size='sm'>
                Twitter
              </Button>

              <Button variant='ghost' size='sm'>
                GitHub
              </Button>

              <Button variant='ghost' size='sm'>
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
