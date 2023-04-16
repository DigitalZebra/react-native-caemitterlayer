import React from 'react'

import { EmitterCellType } from './types'

export type EmitterCellProps = React.PropsWithChildren<EmitterCellType>

export function EmitterCell({ children }: EmitterCellProps) {
  return children ? <>{children}</> : null
}

export function isEmitterCell(
  child: React.ReactNode,
): child is React.ReactElement<EmitterCellProps> {
  return React.isValidElement(child) && child.type === EmitterCell
}
