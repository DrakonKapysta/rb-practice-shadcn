'use client'
import { motion, MotionProps } from 'framer-motion'
import type { FC, ReactNode } from 'react'

interface IProps extends MotionProps {
  children: ReactNode
}

const MotionDiv: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.div {...rest}>{children}</motion.div>
}

const MotionSpan: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.span {...rest}>{children}</motion.span>
}

const MotionP: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.p {...rest}>{children}</motion.p>
}

const MotionH1: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h1 {...rest}>{children}</motion.h1>
}

const MotionH2: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h2 {...rest}>{children}</motion.h2>
}

const MotionH3: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h3 {...rest}>{children}</motion.h3>
}

const MotionH4: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h4 {...rest}>{children}</motion.h4>
}

const MotionH5: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h5 {...rest}>{children}</motion.h5>
}

const MotionH6: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.h6 {...rest}>{children}</motion.h6>
}

const MotionImg: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.img {...rest}>{children}</motion.img>
}

const MotionButton: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.button {...rest}>{children}</motion.button>
}

const MotionInput: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.input {...rest}>{children}</motion.input>
}

const MotionSelect: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.select {...rest}>{children}</motion.select>
}

const MotionLabel: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.label {...rest}>{children}</motion.label>
}

const MotionLink: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.link {...rest}>{children}</motion.link>
}

const MotionUl: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.ul {...rest}>{children}</motion.ul>
}

const MotionOl: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  return <motion.ol {...rest}>{children}</motion.ol>
}

export {
  MotionButton,
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionH4,
  MotionH5,
  MotionH6,
  MotionImg,
  MotionInput,
  MotionLabel,
  MotionLink,
  MotionOl,
  MotionP,
  MotionSelect,
  MotionSpan,
  MotionUl,
}
