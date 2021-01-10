import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';

import styled from 'styled-components/native';
import { useHover } from 'react-native-web-hooks';

const Container = styled.View``;

const InitialElementContainer = styled.View``;

const DialogElementContainer = styled.View`
  position: absolute;
  left: 15px;
  top: 15px;
`;

interface Props {
  renderInitialElement: () => ReactElement;
  renderDialogElement: () => ReactElement;
}

const Tooltip: FC<Props> = ({
  renderInitialElement,
  renderDialogElement,
}) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  const [visable, setVisable] = useState<boolean>(false);

  useEffect(() => {
    setVisable(isHovered);
  }, [isHovered]);

  return <Container ref={ref}>
    <InitialElementContainer>
      {renderInitialElement()}
    </InitialElementContainer>
    {visable ? (
      <DialogElementContainer>{renderDialogElement()}</DialogElementContainer>
    ) : null}
  </Container>;
};

export { Tooltip };
