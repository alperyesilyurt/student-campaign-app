import React from 'react'
import styled from 'styled-components'
import { borderRadiusSizes, spacings } from '../constants'
import * as colors from '../colors'
type Props = any

const StyledInputWrapper = styled.input`
    padding: ${spacings.medium} ${spacings.medium};
    border: 1px solid ${colors.gray1};
    border-radius: ${borderRadiusSizes.medium};
`

export default function Input(props: Props) {
    return (
        <StyledInputWrapper {...props}></StyledInputWrapper>
    )
}