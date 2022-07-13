import styled from "styled-components";
import ReactCompareImage from "react-compare-image";
import { memo, useEffect, useRef, useState } from "react";

type CardComponentProps = {
  imglink: string;
  title: string;
};

const CardComponent = (props: CardComponentProps) => {
  const { imglink, title } = props;
  const [count, setCount] = useState(0);
  const currentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentRef.current) {
      const imgs = Array.from(currentRef.current.getElementsByTagName("img"));

      imgs[0].onload = () =>
        new Promise((resolve: any, reject: any) => {
          setCount(1);
          resolve();
        });

      imgs[1].onload = () =>
        new Promise((resolve: any, reject: any) => {
          setCount(2);
          resolve();
        });
    }
  }, [currentRef]);
  return (
    <Container className="container" ref={currentRef}>
      <ReactCompareImage
        leftImage={imglink}
        rightImage={"http://i.stack.imgur.com/zWfJ5.jpg"}
      />
      {count === 2 && <h4>{title}</h4>}
    </Container>
  );
};

const Container = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 20px 0;
  padding: 20px 0;
`;

export const Card = memo(CardComponent);
