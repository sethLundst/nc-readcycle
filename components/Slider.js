import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import styled from "styled-components/native";
import { Platform } from "react-native";

const SliderWrapper = styled.View`
  margin: 15px;
  width: 180px;
  height: 30px;
  justify-content: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
  margin: 10px;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  margin: 0px;
`;

const LabelText = styled.Text`
  font-size: 15px;
`;

const Slider = ({ allBooks }) => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);

  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  // const multiSliderValuesChange = () => {
  //   allBooks.map((book) => {
  //     console.log(book.distance, "<< book distance");
  //     setMultiSliderValue(book.distance);
  //   });
  // };

  return (
    <ViewContainer>
      <SliderWrapper>
        <LabelWrapper>
          <LabelText>{multiSliderValue[0]} mi</LabelText>
          <LabelText>{multiSliderValue[1]} mi</LabelText>
        </LabelWrapper>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 10,
                width: 10,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: "#1792E8",
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: "#148ADC",
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: "#1792E8",
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 20,
            width: 20,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={180}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={100}
          allowOverlap={false}
          minMarkerOverlapDistance={0}
        />
      </SliderWrapper>
    </ViewContainer>
  );
};

export default Slider;
