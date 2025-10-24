import React, { FC } from 'react'

import { Button } from '@/app/(client)/shared/ui'

interface IProps {}

const FooterComponent: FC<Readonly<IProps>> = async () => {
  return (
    <footer className='bg-background/95 supports-backdrop-filter:bg-background/60 border-t backdrop-blur'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Your Brand</h3>
            <p className='text-muted-foreground text-sm'>Building amazing experiences with modern web technologies.</p>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Quick Links</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Home
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Services
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Resources</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='text-muted-foreground hover:text-foreground transition-colors'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h4 className='text-sm font-semibold'>Stay Updated</h4>
            <p className='text-muted-foreground text-sm'>Subscribe to our newsletter for the latest updates.</p>
            <div className='flex space-x-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='border-input bg-background focus:ring-ring flex-1 rounded-md border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none'
              />
              <Button size='sm' className='shrink-0'>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className='border-border mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <p className='text-muted-foreground text-sm'>© 2024 Your Brand. All rights reserved.</p>
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
